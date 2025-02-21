import React from 'react';
import AuthIllustration from "../../../assets/Authentication-rafiki.svg";
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className='bg-[#F7F7F7] dark:bg-[#2A2A2A] max-w-[1440px] min-h-screen flex justify-center items-center'>
      <div className="w-[80%] h-[550px] bg-white dark:bg-[#1E1E1E] shadow-lg rounded-lg flex">
        {/* Left Side: Illustration */}
        <div className="w-1/2 flex justify-center items-center">
          <img className="w-full h-full object-contain" src={AuthIllustration} alt="Authentication Illustration" />
        </div>

        {/* Right Side: Login Form */}
        <div className="w-1/2 flex justify-center items-center">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold mb-6 dark:text-[#E0E0E0] text-[#1E2022] text-center">Welcome Back</h2>
            <form>
              <div className="mb-4">
                <label className="block text-[#52616B] dark:text-[#A0A0A0] font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  id='email'
                  className="input input-bordered w-full border-[#F7F7F7] dark:border-[#2A2A2A] bg-[#F7F7F7] dark:bg-[#2A2A2A]" />
              </div>
              <div className="mb-6">
                <label className="block text-[#52616B] dark:text-[#A0A0A0] font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  className="input input-bordered w-full border-[#F7F7F7] dark:border-[#2A2A2A] bg-[#F7F7F7] dark:bg-[#2A2A2A]"
                  type="password"
                  id='password'
                  placeholder="Enter your password"
                />
              </div>
              <div className="mb-6">
                <label className="flex items-center text-[#52616B] dark:text-[#A0A0A0] text-sm">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-500 border-[#F7F7F7] dark:border-[#2A2A2A] bg-[#F7F7F7] dark:bg-[#2A2A2A] transition duration-150 ease-in-out" />
                  <span className="ml-2">Remember Me</span>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                  type="button"
                >
                  Sign In
                </button>
              </div>
              <div className="mt-6 text-center">
                <p className='text-sm text-[#52616B] dark:text-[#A0A0A0]'>Don't have an account? <Link to={'/register'} className="text-blue-500 text-sm">
                  Register
                </Link></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;