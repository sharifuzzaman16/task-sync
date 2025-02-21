import React from 'react';
import AuthIllustration from "../../../assets/Authentication-rafiki.svg";
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className='bg-[#F7F7F7] max-w-[1440px] min-h-screen flex justify-center items-center'>
      <div className="w-[80%] h-[550px] bg-white shadow-lg rounded-lg flex flex-row-reverse">
        {/* Left Side: Illustration */}
        <div className="w-1/2 flex justify-center items-center">
          <img className="w-full h-full object-contain" src={AuthIllustration} alt="Authentication Illustration" />
        </div>

        {/* Right Side: Login Form */}
        <div className="w-1/2 flex justify-center items-center">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">Create an Account</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  id='name'
                  className="input input-bordered w-full" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  id='email'
                  className="input input-bordered w-full" />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  className="input input-bordered w-full"
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
                <p className='text-sm'>Already have an account? <Link to={'/'} className="text-blue-500 text-sm">
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