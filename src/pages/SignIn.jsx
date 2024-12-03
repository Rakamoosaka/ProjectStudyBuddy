import React, { useState } from "react";
import signup from "../assets/svg/signup.svg";
import Header from "../components/Header";
import axios from "../axios";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Footer from "../components/Footer";

const SignIn = () => {
  const { setAuth } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent default form submission

    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }

    // Clear previous error
    setError("");

    try {
      const response = await axios.post(
        "/auth/login",
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // Включаем передачу cookie для сессионной аутентификации
        }
      );

      const { username, token } = response?.data;

      localStorage.setItem("token", token);
      localStorage.setItem("username", username);

      if (username) {
        // Обновляем контекст авторизации с данными пользователя
        setAuth({ email, username });

        // Clear the email and password fields
        setEmail("");
        setPassword("");

        // Navigate to the user's profile using the username
        console.log("Navigating to profile:", `/profile/${username}`);
        navigate(`/profile/${username}`);
      } else {
        setError("Failed to retrieve user information. Please try again.");
      }
    } catch (err) {
      if (!err?.response) {
        setError("No Server Response");
      } else if (err.response?.status === 400) {
        setError("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setError("Unauthorized - Invalid Email or Password");
      } else {
        console.error("Error during login:", err.response || err.message);
        setError(
          err.response?.data?.message || "Failed to log in. Please try again."
        );
      }
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex w-full h-full">
        <div className="hidden xl:flex h-full items-center bg-[#F6F7FF]">
          <img
            src={signup}
            alt="Signup Illustration"
            className="max-w-full max-h-full"
          />
        </div>
        <div className="flex flex-1 w-full justify-center items-center p-4 mb-32 ">
          <form
            onSubmit={handleLogin}
            className="flex flex-col items-start p-6 rounded-lg text-[#1b0d13] w-full max-w-md"
          >
            <h2 className="text-2xl font-medium text-[#274B6D] mb-6 font-josefinSans self-center">
              Log in
            </h2>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <label className="text-base font-josefinSans text-[#162850] font-medium mb-1">
              E-mail
            </label>
            <input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-4 text-sm border border-[#162850] rounded-lg focus:outline-none bg-[#F6F7FF]"
            />
            <label className="text-base font-josefinSans text-[#162850] font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-4 text-sm border border-[#162850] rounded-lg focus:outline-none bg-[#F6F7FF]"
            />
            <div className="flex flex-col w-full mt-4 items-center">
              <button
                type="submit"
                className={`bg-[#162850] font-josefinSans w-full text-base text-white px-6 py-2 rounded-lg font-normal ${
                  email && password ? "" : "opacity-80 cursor-not-allowed"
                }`}
              >
                Log in
              </button>
              <Link
                to="/signup"
                className="text-[#162850] mt-12 font-josefinSans text-lg font-normal hover:underline decoration-[#162850]"
              >
                Create an account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
