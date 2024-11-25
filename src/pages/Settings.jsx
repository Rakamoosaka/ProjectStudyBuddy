import React, { useState } from 'react';
import Header from '../components/Header';
import google from '../assets/svg/google.svg'


const Settings = () => {
  const [nickname, setNickname] = useState('Omar');
  const [language, setLanguage] = useState('English');
  const [birthMonth, setBirthMonth] = useState('March');
  const [birthDay, setBirthDay] = useState(22);
  const [birthYear, setBirthYear] = useState(2002);
  const [country, setCountry] = useState('Kazakhstan');
  const [email, setEmail] = useState('sup4anski@gmail.com');

  const handleLinkAccount = () => {
    console.log('Link account clicked');
  };

  const handlePasswordChange = () => {
    console.log('Change password clicked');
  };

  const handleEmailChange = () => {
    console.log('Email change clicked');
  };

  const handleDeleteAccount = () => {
    console.log('Delete account clicked');
  };

  return (
    <div>
        <Header />
    <div className="flex justify-center items-center min-h-screen bg-[#F6F7FF] p-4 font-josefinSans">
      <div className="w-full max-w-2xl bg-none p-6 rounded-lg ">
        <h1 className="text-3xl font-semibold mb-6 text-main">Settings</h1>
        <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-primary relative inline-block text-[#0D7B92]">
            Account
            <span
                className="absolute bottom-0 left-0 w-[130%] border-b-2 border-primary border-[#0D7B92]"
            ></span>
        </h2>
        <h2 className='text-main text-xl font-semibold'>Main</h2>

          <div className="mb-4">
            <label className="block font-light mb-2">Nickname</label>
            <p className='block font-extralight mb-2'>That’s how your friends and any other users will see you.</p>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full font-light p-2 border bg-[#F6F7FF] border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block font-light mb-2  ">System language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-2 border font-light bg-[#F6F7FF] border-gray-300 rounded-md"
            >
              <option value="English">English</option>
              <option value="Russian">Russian</option>
              <option value="Kazakh">Kazakh</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-light mb-2">Date of birth</label>
            <div className="flex space-x-2">
              <select
                value={birthMonth}
                onChange={(e) => setBirthMonth(e.target.value)}
                className="p-2 border bg-[#F6F7FF] font-light border-gray-300 rounded-md w-1/3"
              >
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
              </select>
              <select
                value={birthDay}
                onChange={(e) => setBirthDay(e.target.value)}
                className="p-2 border bg-[#F6F7FF] font-light border-gray-300 rounded-md w-1/3"
              >
                {[...Array(31).keys()].map((day) => (
                  <option key={day + 1} value={day + 1}>{day + 1}</option>
                ))}
              </select>
              <select
                value={birthYear}
                onChange={(e) => setBirthYear(e.target.value)}
                className="p-2 border bg-[#F6F7FF] font-light border-gray-300 rounded-md w-1/3"
              >
                {[...Array(100).keys()].map((year) => (
                  <option key={year + 1925} value={year + 1925}>{year + 1925}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-4" >
            <label className="block font-light mb-2">My country</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full font-light bg-[#F6F7FF] p-2 border border-gray-300 rounded-md"
            >
              <option value="Kazakhstan">Kazakhstan</option>
              <option value="Russia">Russia</option>
              <option value="USA">USA</option>
              {/* Add other countries as needed */}
            </select>
          </div>
        </section>
        <section className="mb-32">
          <h2 className="text-main text-xl font-semibold mb-4">Linked accounts</h2>
        <div className='flex gap-4'>
        <button className="flex items-center font-normal text-[#0B7C92] justify-center w-1/2 p-2 mb-3 border  rounded-lg sm:w-1/3  hover:bg-neutral-100">
                            <img src={google} alt="Google" className="mr-2 w-5 h-5" />
                            Google
                        </button>
          <button
            onClick={handleLinkAccount}
            className="flex items-center font-normal bg-[#0B7C92] text-[#FFFFFF] justify-center w-1/2 p-2 mb-3 border  rounded-lg sm:w-1/3  hover:bg-[#368595]">
            Link account
          </button>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-main text-lg font-semibold mb-4">Change password</h2>
          <button
            onClick={handlePasswordChange}
            className="px-4 py-2 bg-[#0B7C92] text-white rounded-md w-full sm:w-5/12"
          >
            We will send to your e-mail changing request
          </button>
        </section>
        <section className="mb-8">
          <h2 className="text-main text-lg font-semibold mb-4">Email</h2>
          <div className='flex gap-10 flex-wrap items-center'>
            <p className="text-gray-700">{email}</p>
            <button
                onClick={handleEmailChange}
                className="px-12 py-2 bg-[#0B7C92] text-white rounded-md w-full sm:w-auto"
            >
                Tap to change
            </button>
            </div>
        </section>
        <section className="mb-8">
  <hr className="border-t border-[#162850] mb-4" />
  <h2 className="text-main text-lg font-semibold mb-4">Deleting account</h2>
  <button
    onClick={handleDeleteAccount}
    className="px-12 py-2 bg-[#E73E3E] text-white rounded-md w-full sm:w-auto"
  >
    Delete account
  </button>
</section>
      </div>
    </div>
    </div>
  );
};

export default Settings;
