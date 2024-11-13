import React from 'react'
import signup from '../assets/svg/signup.svg'
import Header from '../components/Header'
import { Link } from 'react-router-dom';


const SignUp2 = () => {
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
                        <h2 className="text-2xl font-medium text-[#274B6D] mb-6 font-josefinSans self-center">Sign up</h2>

                        <label className="text-base font-josefinSans text-[#162850] font-medium mb-1">Your email</label>
                        <input 
                            type="email" 
                            placeholder="example@email.com" 
                            className="w-full p-2 mb-4 text-sm border border-[#162850] rounded-lg focus:outline-none bg-[#F6F7FF]"
                        />

                        <label className="text-base font-josefinSans text-[#162850] font-medium mb-1">Name</label>
                        <input 
                            type="text" 
                            placeholder="Omar Abdulrahman"
                            className="w-full p-2 mb-4 text-sm border border-[#162850] rounded-lg focus:outline-none bg-[#F6F7FF]"
                        />

                        <label className="text-base font-josefinSans text-[#162850] font-medium mb-1">Create a password</label>
                        <p className='text-[#000000] opacity-50 text-xs font-josefinSans'>Passwords should be at least 8 characters long and should contain a mixture of letters, numbers, and other characters.</p>
                        <input 
                            type="password" 
                            placeholder="********"
                            className="w-full p-2 mb-4 text-sm border border-[#162850] rounded-lg focus:outline-none bg-[#F6F7FF]"
                        />

                        <div className="flex justify-between w-full mt-6">
                            <button className="text-[#162850] font-josefinSans text-lg font-medium">Back</button>
                            <button className="bg-[#162850] font-josefinSans text-base text-white px-6 py-2 rounded-lg font-medium">Log in</button>
                        </div>
                    </div>
                </div>
        </div>
    </div>
);
}

export default SignUp2;