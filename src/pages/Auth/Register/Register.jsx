import React from 'react';
import AuthIllustration from "../../../assets/Authentication-rafiki.svg";
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className='bg-[#F7F7F7] dark:bg-[#2A2A2A] max-w-[1440px] min-h-screen flex justify-center items-center'>
      <div className="w-[80%] h-[550px] bg-white dark:bg-[#1E1E1E] shadow-lg rounded-lg flex flex-row-reverse">
        {/* Left Side: Illustration */}
        <div className="w-1/2 flex justify-center items-center">
          <img className="w-full h-full object-contain" src={AuthIllustration} alt="Authentication Illustration" />
        </div>

        {/* Right Side: Login Form */}
        <div className="w-1/2 flex justify-center items-center">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold mb-6 dark:text-[#E0E0E0] text-[#1E2022] text-center">Create an Account</h2>
            <form>
              <div className="mb-4">
                <label className="block text-[#52616B] dark:text-[#A0A0A0] font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  id='name'
                  className="input input-bordered w-full border-[#F7F7F7] dark:border-[#2A2A2A] bg-[#F7F7F7] dark:bg-[#2A2A2A] text-[#52616B] dark:text-[#A0A0A0]" />
              </div>
              <div className="mb-4">
                <label className="block text-[#52616B] dark:text-[#A0A0A0] font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  id='email'
                  className="input input-bordered w-full border-[#F7F7F7] dark:border-[#2A2A2A] bg-[#F7F7F7] dark:bg-[#2A2A2A] text-[#52616B] dark:text-[#A0A0A0]" />
              </div>
              <div className="mb-6">
                <label className="block text-[#52616B] dark:text-[#A0A0A0] font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  className="input input-bordered w-full border-[#F7F7F7] dark:border-[#2A2A2A] bg-[#F7F7F7] dark:bg-[#2A2A2A] text-[#52616B] dark:text-[#A0A0A0]"
                  type="password"
                  id='password'
                  placeholder="Enter your password"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                  type="button"
                >
                  Register
                </button>
              </div>
              <div className="mt-6 text-center">
                <p className='text-sm text-[#52616B] dark:text-[#A0A0A0]'>Already have an account? <Link to={'/'} className="text-blue-500 text-sm">
                  Login
                </Link></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;