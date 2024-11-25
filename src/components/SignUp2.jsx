import React, { useEffect, useState, useRef } from "react";
import axios from "../axios";
import signup from "../assets/svg/signup.svg";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SignUp2 = ({ onSuccess }) => {
  const [birthMonth, setBirthMonth] = useState("March");
  const [birthDay, setBirthDay] = useState(22);
  const [birthYear, setBirthYear] = useState(2002);

  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    if (success) onSuccess();
  }, [success]);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const navigate = useNavigate(); // React Router hook for navigation

  // Function to handle user registration
  const handleRegister = () => {
    // Convert birthMonth to a zero-padded month number
    const monthNumber = new Date(`${birthMonth} 1`).getMonth() + 1; // Convert month name to number
    const formattedMonth = monthNumber.toString().padStart(2, "0"); // Ensure zero-padded month

    // Construct the date in 'YYYY-MM-DD' format
    const formattedDate = `${birthYear}-${formattedMonth}-${birthDay
      .toString()
      .padStart(2, "0")}`;
    console.log(formattedDate);

    const userData = {
      email,
      username: user,
      password: pwd,
      birthDate: formattedDate, // Send as a single field
    };

    axios
      .post("/auth/register", userData)
      .then((response) => {
        console.log("User registered successfully:", response.data);
        console.log(user, pwd);
        onSuccess(true);
      })
      .catch((error) => {
        console.error("Registration failed:", error.response || error.message);
        setErrMsg(error.response?.data || "Failed to register. Try again.");
      });
  };

  const handleAlready = () => {
    navigate("/signin"); // Navigate to the Sign In page
  };

  const handleGoToLastPage = () => {
    // Replace '/last-page' with the actual route of your last page
    navigate("/signin");
  };

  return (
    <div className="flex flex-1 w-full justify-center mt-16 items-center p-4 mb-32">
      <div className="flex flex-col items-start  p-6 rounded-lg text-[#1b0d13] w-full max-w-md">
        <h2 className="text-2xl font-medium text-[#274B6D] mb-6 font-josefinSans self-center">
          Sign up
        </h2>

        {errMsg && <p className="text-red-500 text-sm mb-4">{errMsg}</p>}

        <label className="text-base font-josefinSans text-[#162850] font-medium mb-1">
          Your email
        </label>
        <input
          type="email"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-6 text-sm border border-[#162850] rounded-lg focus:outline-none bg-[#F6F7FF]"
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
        />
        <p
          className={` ${
            emailFocus && email && !validEmail
              ? "font-josefinSans text-sm text-[#ae2b2b]"
              : "hidden"
          }`}
        >
          8 to 24 characters. Must include uppercase and lowercase letters, a
          number and a special character. Allowed special characters:{" "}
          <span aria-label="exclamation mark">!</span>{" "}
          <span aria-label="at symbol">@</span>{" "}
          <span aria-label="hashtag">#</span>{" "}
          <span aria-label="dollar sign">$</span>{" "}
          <span aria-label="percent">%</span>
        </p>

        <label className="text-base font-josefinSans text-[#162850] font-medium mb-1">
          Your birthdate
        </label>
        <div className="flex justify-between w-full mb-6 text-[#162850] font-light">
          <select
            value={birthMonth}
            onChange={(e) => setBirthMonth(e.target.value)}
            className="w-6/12 p-2 text-lg rounded-lg border font-josefinSans border-[#162850] focus:outline-none bg-[#F6F7FF]"
          >
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
          <select
            value={birthDay}
            onChange={(e) => setBirthDay(e.target.value)}
            className="w-2/12 p-2 text-lg rounded-lg border font-kantumruyPro border-[#162850] focus:outline-none bg-[#F6F7FF]"
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
            className="w-3/12 p-2 text-lg rounded-lg border font-kantumruyPro border-[#162850] focus:outline-none bg-[#F6F7FF]"
          >
            {[...Array(100).keys()].map((year) => (
              <option key={year + 1925} value={year + 1925}>
                {year + 1925}
              </option>
            ))}
          </select>
        </div>

        <label className="text-base font-josefinSans text-[#162850] font-medium mb-1">
          Name
        </label>
        <input
          ref={userRef}
          type="text"
          placeholder="Omar Abdulrahman"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="w-full p-2 mb-4 text-sm border border-[#162850] rounded-lg focus:outline-none bg-[#F6F7FF]"
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
        />
        <p
          id="uidnote"
          className={` ${
            userFocus && user && !validName
              ? "font-josefinSans text-sm text-[#ae2b2b]"
              : "hidden"
          }`}
        >
          4 to 24 characters. Must begin with a letter. Letters, numbers,
          underscores, hyphens allowed.
        </p>

        <label className="text-base font-josefinSans text-[#162850] font-medium mb-1">
          Create a password
        </label>
        <p className="text-[#000000] opacity-50 text-xs font-josefinSans">
          Passwords should be at least 8 characters long and should contain a
          mixture of letters, numbers, and other characters.
        </p>
        <input
          type="password"
          placeholder="********"
          onChange={(e) => setPwd(e.target.value)}
          className="w-full p-2 mb-4 text-sm border border-[#162850] rounded-lg focus:outline-none bg-[#F6F7FF]"
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
          value={pwd}
        />
        <p
          id="pwdnote"
          className={` ${
            pwdFocus && pwd && !validPwd
              ? "font-josefinSans text-sm text-[#ae2b2b]"
              : "hidden"
          }`}
        >
          8 to 24 characters. Must include uppercase and lowercase letters, a
          number and a special character. Allowed special characters:{" "}
          <span aria-label="exclamation mark">!</span>{" "}
          <span aria-label="at symbol">@</span>{" "}
          <span aria-label="hashtag">#</span>{" "}
          <span aria-label="dollar sign">$</span>{" "}
          <span aria-label="percent">%</span>
        </p>

        <div className="flex justify-between w-full mt-6">
          <button
            onClick={handleGoToLastPage}
            className="text-[#162850] font-josefinSans text-lg font-medium"
          >
            Back
          </button>

          <button
            onClick={handleRegister}
            className={`bg-[#162850] font-josefinSans text-base text-white px-12 py-1 rounded-lg font-medium ${
              validName && validPwd && validEmail
                ? ""
                : "opacity-80 cursor-not-allowed"
            } `}
            disabled={!validName || !validPwd || !validEmail ? true : false}
          >
            Register
          </button>
        </div>
        <div className="flex justify-center w-full mt-8">
          <button
            onClick={handleAlready}
            className="text-base font-josefinSans text-[#162850] font-medium mb-1 hover:underline decoration-[#162850]"
          >
            Already have an account?
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp2;
