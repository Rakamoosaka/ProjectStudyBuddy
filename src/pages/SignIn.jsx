import React, { useState } from "react";
import signup from "../assets/svg/signup.svg";
import Header from "../components/Header";
import google from "../assets/svg/google.svg";
import axios from "../axios";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/UserContext";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { setUsername } = useUser();
  const navigate = useNavigate();

  const { isLoggedIn, setIsLoggedIn } = useUser();

  const handleLogin = () => {
    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }

    // Clear previous error
    setError("");

    // Send login data to the backend
    axios
      .post("/auth/login", { email, password })
      .then((response) => {
        const { username } = response.data; // Get username from backend response
        setUsername(username); // Store username in global context
        setIsLoggedIn(true); // Set login state to true
        navigate(`/profile/${username}`); // Redirect to profile page
      })
      .catch((err) => {
        console.error("Error during login:", err.response || err.message);
        setError(
          err.response?.data?.message || "Failed to log in. Please try again."
        );
      });
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex w-full h-full">
        {/* Left-side image, hidden on smaller screens */}
        <div className="hidden xl:flex h-full items-center bg-[#F6F7FF]">
          <img
            src={signup}
            alt="Signup Illustration"
            className="max-w-full max-h-full"
          />
        </div>

        {/* Centered login form, full-width on small screens */}
        <div className="flex flex-1 w-full justify-center items-center p-4 mb-32 ">
          <div className="flex flex-col items-start p-6 rounded-lg text-[#1b0d13] w-full max-w-md">
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
                onClick={handleLogin}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
