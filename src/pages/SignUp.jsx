import React, { useEffect, useState, useRef } from "react";
import Header from "../components/Header";
import signupImage from "../assets/svg/signup.svg";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import useAuth from "../hooks/useAuth";
import Snackbar from "../components/Snackbar";

const USER_REGEX = /^[A-Za-z ]{4,24}$/;
const PWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!_])(?=.{8,24}$).*$/;
const EMAIL_REGEX = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

const SignUp = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const [email, setEmail] = useState("");
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthMonth, setBirthMonth] = useState("March");
  const [birthDay, setBirthDay] = useState(22);
  const [birthYear, setBirthYear] = useState(2002);
  const [gender, setGender] = useState("male");
  const [errorMsg, setErrorMsg] = useState("");

  const userRef = useRef();
  const snackbarRef = useRef(null);
  const [snackbarConfig, setSnackbarConfig] = useState({
    message: "",
    type: "",
  });

  // Validation States
  const [validEmail, setValidEmail] = useState(false);
  const [validUsername, setValidUsername] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validMatch, setValidMatch] = useState(false);

  // Focus on username input on load
  useEffect(() => {
    userRef.current?.focus();
  }, []);

  // Validate inputs on state change
  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
    setValidUsername(USER_REGEX.test(username));
    setValidPassword(PWD_REGEX.test(password));
    setValidMatch(password === confirmPassword);
  }, [email, username, password, confirmPassword]);

  const handleRegister = async () => {
    if (!validEmail || !validUsername || !validPassword || !validMatch) {
      setErrorMsg("Please ensure all fields are filled out correctly.");
      return;
    }

    try {
      const monthNumber = new Date(`${birthMonth} 1`).getMonth() + 1;
      const formattedDate = `${birthYear}-${monthNumber
        .toString()
        .padStart(2, "0")}-${birthDay.toString().padStart(2, "0")}`;

      const userData = {
        email,
        username,
        password,
        dateOfBirth: formattedDate,
        gender,
      };

      const response = await axios.post("/auth/register", userData);
      console.log("User registered successfully:", response.data);

      setAuth({
        username,
        token: response.data.token,
      });
      setErrorMsg("");
      setSnackbarConfig({
        message: "Welcome to StudyBuddy!",
        type: "success",
      });
      snackbarRef.current.show();
      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    } catch (error) {
      console.error("Registration failed:", error.response || error.message);
      setErrorMsg(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
      setSnackbarConfig({
        message:
          error.response?.data?.message ||
          "Registration failed. Please try again.",
        type: "fail",
      });
      snackbarRef.current.show();
    }
  };

  const handleGoBack = () => {
    navigate("/signin");
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex w-full h-full">
        <div className="hidden xl:flex h-full items-center bg-[#F6F7FF]">
          <img
            src={signupImage}
            alt="Signup Illustration"
            className="max-w-full max-h-full"
          />
        </div>

        <div className="flex flex-1 w-full justify-center items-center p-4">
          <div className="flex flex-col items-start p-6 rounded-lg text-[#1b0d13] w-full max-w-md">
            <h2 className="text-2xl font-medium text-[#274B6D] mb-6 font-josefinSans self-center">
              Sign up
            </h2>

            {errorMsg && (
              <p className="text-[#b00000] text-sm mb-4" aria-live="assertive">
                {errorMsg}
              </p>
            )}

            {/* Email */}
            <label className="text-base font-josefinSans text-[#162850] font-medium mb-1">
              Your email
            </label>
            <input
              ref={userRef}
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-4 text-sm border border-[#162850] rounded-lg focus:outline-none bg-[#F6F7FF]"
            />

            {/* Name */}
            <label className="text-base font-josefinSans text-[#162850] font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Omar Abdulrahman"
              value={username}
              onChange={(e) => setUser(e.target.value)}
              className="w-full p-2 mb-4 text-sm border border-[#162850] rounded-lg focus:outline-none bg-[#F6F7FF]"
            />

            {/* Gender */}
            <label className="text-base font-josefinSans text-[#162850] font-medium mb-1">
              Gender
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full p-2 mb-4 text-sm border border-[#162850] rounded-lg focus:outline-none bg-[#F6F7FF]"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            {/* Birthdate */}
            <label className="text-base font-josefinSans text-[#162850] font-medium mb-1">
              Your birthdate
            </label>
            <div className="flex justify-between w-full mb-6 text-[#162850] font-light">
              <select
                value={birthMonth}
                onChange={(e) => setBirthMonth(e.target.value)}
                className="w-6/12 p-2 text-lg rounded-lg border font-josefinSans border-[#162850] focus:outline-none bg-[#F6F7FF]"
              >
                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ].map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              <select
                value={birthDay}
                onChange={(e) => setBirthDay(e.target.value)}
                className="w-2/12 p-2 text-lg rounded-lg border font-josefinSans border-[#162850] focus:outline-none bg-[#F6F7FF]"
              >
                {[...Array(31).keys()].map((day) => (
                  <option key={day + 1} value={day + 1}>
                    {day + 1}
                  </option>
                ))}
              </select>
              <select
                value={birthYear}
                onChange={(e) => setBirthYear(e.target.value)}
                className="w-3/12 p-2 text-lg rounded-lg border font-josefinSans border-[#162850] focus:outline-none bg-[#F6F7FF]"
              >
                {[...Array(100).keys()].map((year) => (
                  <option key={year + 1925} value={year + 1925}>
                    {year + 1925}
                  </option>
                ))}
              </select>
            </div>

            {/* Password */}
            <label className="text-base font-josefinSans text-[#162850] font-medium mb-1">
              Create a password
            </label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-4 text-sm border border-[#162850] rounded-lg focus:outline-none bg-[#F6F7FF]"
            />

            {/* Confirm Password */}
            <label className="text-base font-josefinSans text-[#162850] font-medium mb-1">
              Confirm password
            </label>
            <input
              type="password"
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 mb-4 text-sm border border-[#162850] rounded-lg focus:outline-none bg-[#F6F7FF]"
            />

            {/* Buttons */}
            <div className="flex justify-between w-full mt-6">
              <button
                onClick={handleGoBack}
                className="text-[#162850] font-josefinSans text-lg font-medium"
              >
                Back
              </button>
              <button
                onClick={handleRegister}
                className={`bg-[#162850] font-josefinSans text-base text-white px-12 py-1 rounded-lg font-medium ${
                  validEmail && validUsername && validPassword && validMatch
                    ? ""
                    : "opacity-80 cursor-not-allowed"
                }`}
                disabled={
                  !validEmail || !validUsername || !validPassword || !validMatch
                }
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
      <Snackbar
        ref={snackbarRef}
        message={snackbarConfig.message}
        type={snackbarConfig.type}
      />
    </div>
  );
};

export default SignUp;
