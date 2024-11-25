import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import SignUp2 from "../components/SignUp2";
import signupImage from "../assets/svg/signup.svg"; // Adjust the path if needed
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [success, setSuccess] = useState(false);
  const handleSuccessFromChild = () => {
    setSuccess(true);
  };

  useEffect(() => {
    if (success) {
      navigate("/profile");
    }
  }, [success]);

  return (
    <div className="flex flex-col h-screen">
      <Header /> {/* Retain the Header */}
      <div className="flex w-full h-full">
        {/* Left-side image, hidden on smaller screens */}
        <div className="hidden xl:flex h-full items-center bg-[#F6F7FF]">
          <img
            src={signupImage}
            alt="Signup Illustration"
            className="max-w-full max-h-full"
          />
        </div>

        {/* Right-side content */}
        <div className="flex flex-1 w-full justify-center items-center p-4">
          <SignUp2 onSuccess={handleSuccessFromChild} />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
