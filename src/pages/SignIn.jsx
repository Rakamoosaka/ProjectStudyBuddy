import React from 'react'
import signup from '../assets/svg/signup.svg'
import Header from '../components/Header'
import google from '../assets/svg/google.svg'
import { Link } from 'react-router-dom';
const SignIn = () => {
    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className="flex w-full h-full">
                {/* Left-side image, hidden on smaller screens */}
                <div className="hidden xl:flex h-full items-center bg-[#F6F7FF]">
                    <img src={signup} alt="Signup Illustration" className="max-w-full max-h-full" />
                </div>
    
                {/* Centered signup form, full-width on small screens */}
                <div className="flex flex-1 w-full justify-center items-center p-4">
                        <div className="flex flex-col items-start p-6 rounded-lg text-[#1b0d13] w-full max-w-md">
                            <h2 className="text-2xl font-medium text-[#274B6D] mb-6 font-josefinSans self-center">Log in</h2>
    
                            <label className="text-base font-josefinSans text-[#162850] font-medium mb-1">E-mail</label>
                            <input 
                                type="email" 
                                placeholder="example@email.com" 
                                className="w-full p-2 mb-4 text-sm border border-[#162850] rounded-lg focus:outline-none bg-[#F6F7FF]"
                            />
    
                            <label className="text-base font-josefinSans text-[#162850] font-medium mb-1">Password</label>
                            <input 
                                type="password" 
                                placeholder="********"
                                className="w-full p-2 mb-4 text-sm border border-[#162850] rounded-lg focus:outline-none bg-[#F6F7FF]"
                            />
                            
                            <label className="text-2xl text-[#162850] font-josefinSans self-center font-normal">or</label>
                            <div className="flex flex-col w-full mt-4">
                            <button className="flex items-center font-normal text-[#526F8A] justify-center w-full p-2 mb-3 border border-[#162850] rounded-lg  hover:bg-neutral-100">
                            <img src={google} alt="Google" className="mr-2 w-5 h-5" />
                            Log in with Google
                        </button>
                                <button className="bg-[#162850] font-josefinSans text-base text-white px-6 py-2 rounded-lg font-normal">Log in</button>
                                <button className="text-[#162850] mt-12 font-josefinSans text-lg font-normal">Create an account</button>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    );
}

export default SignIn