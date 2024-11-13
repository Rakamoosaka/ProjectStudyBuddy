import React from 'react'
import signup from '../assets/svg/signup.svg'
import google from '../assets/svg/google.svg'
import letter from '../assets/svg/letter.svg'
import Header from '../components/Header'
import { Link } from 'react-router-dom';

const SignUp = () => {
    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className="flex w-full h-full">
                {/* Left-side image, hidden on smaller screens */}
                <div className="hidden xl:flex h-full items-center bg-[#F6F7FF]">
                    <img src={signup} alt="Signup Illustration" className="max-w-full max-h-full" />
                </div>

                {/* Centered signup form, full-width on small screens */}
                <div className="flex flex-1 w-full justify-center items-center p-4 mb-32 ">
                    <div className="flex flex-col items-center p-6 rounded-lg text-[#1b0d13] w-full max-w-md">
                        <h2 className="text-2xl font-medium text-[#274B6D] mb-6 font-josefinSans">Sign up</h2>
                        <label className="text-lg self-start mb-4 font-josefinSans text-[#162850] font-light">When is your birthday?</label>
                        <div className="flex justify-between w-full mb-10 text-[#162850] font-light">
                            <select className="w-6/12 p-2 text-lg rounded-lg border font-josefinSans border-[#162850] focus:outline-none bg-[#F6F7FF]">
                                <option>march</option>
                            </select>
                            <select className="w-2/12 p-2 text-lg rounded-lg border font-kantumruyPro border-[#162850] focus:outline-none bg-[#F6F7FF]">
                                <option>22</option>
                            </select>
                            <select className="w-3/12 p-2 text-lg rounded-lg border font-kantumruyPro border-[#162850] focus:outline-none bg-[#F6F7FF]">
                                <option>2002</option>
                            </select>
                        </div>
                        <button className="flex items-center font-medium text-[#526F8A] justify-center w-full p-3 mb-3 border border-[#162850] rounded-lg  hover:bg-neutral-100">
                            <img src={google} alt="Google" className="mr-2 w-5 h-5" />
                            Sign up with Google
                        </button>
                        <button className="flex text-[#526F8A] font-medium items-center justify-center w-full p-3 border border-[#162850] rounded-lg  hover:bg-neutral-100">
                            <img src={letter} alt="Email" className="mr-2 w-5 h-5" />
                            Sign up with e-mail
                        </button>
                        <button className="mt-5 text-sm flex items-center font-medium justify-center w-full text-[#162850] p-3 border-none">
                            Already have an account?
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
