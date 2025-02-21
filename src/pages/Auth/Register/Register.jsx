import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthIllustration from "../../../assets/Authentication-rafiki.svg";
import { useAuth } from '../../../AuthProvider';
import Swal from 'sweetalert2';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    photoURL: ''
  });

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, password, photoURL } = formData;
    
    if (!name || !email || !password || !photoURL) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'All fields are required!',
      });
      return;
    }

    register(email, password, name, photoURL)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful!',
          text: 'You will be redirected to the dashboard.',
          timer: 2000,
          showConfirmButton: false
        });

        setTimeout(() => {
          navigate('/dashboard'); // Redirect to dashboard
        }, 2000);
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed!',
          text: err.message,
        });
      });
  };

  return (
    <div className='bg-[#F7F7F7] dark:bg-[#2A2A2A] max-w-[1440px] min-h-screen flex justify-center items-center'>
      <div className="w-[80%] h-[550px] bg-white dark:bg-[#1E1E1E] shadow-lg rounded-lg flex flex-row-reverse">
        {/* Left Side: Illustration */}
        <div className="w-1/2 flex justify-center items-center">
          <img className="w-full h-full object-contain" src={AuthIllustration} alt="Authentication Illustration" />
        </div>

        {/* Right Side: Registration Form */}
        <div className="w-1/2 flex justify-center items-center">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold mb-6 dark:text-[#E0E0E0] text-[#1E2022] text-center">Create an Account</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label className="block text-[#52616B] dark:text-[#A0A0A0] font-bold mb-1" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id='name'
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input input-bordered w-full border-[#F7F7F7] dark:border-[#2A2A2A] bg-[#F7F7F7] dark:bg-[#2A2A2A] text-[#52616B] dark:text-[#A0A0A0]" 
                />
              </div>
              <div className="mb-2">
                <label className="block text-[#52616B] dark:text-[#A0A0A0] font-bold mb-1" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id='email'
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input input-bordered w-full border-[#F7F7F7] dark:border-[#2A2A2A] bg-[#F7F7F7] dark:bg-[#2A2A2A] text-[#52616B] dark:text-[#A0A0A0]" 
                />
              </div>
              <div className="mb-2">
                <label className="block text-[#52616B] dark:text-[#A0A0A0] font-bold mb-1" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id='password'
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input input-bordered w-full border-[#F7F7F7] dark:border-[#2A2A2A] bg-[#F7F7F7] dark:bg-[#2A2A2A] text-[#52616B] dark:text-[#A0A0A0]" 
                />
              </div>
              <div className="mb-4">
                <label className="block text-[#52616B] dark:text-[#A0A0A0] font-bold mb-1" htmlFor="photoURL">
                  Photo URL
                </label>
                <input
                  type="url"
                  id='photoURL'
                  placeholder="Enter your photo URL"
                  value={formData.photoURL}
                  onChange={handleChange}
                  className="input input-bordered w-full border-[#F7F7F7] dark:border-[#2A2A2A] bg-[#F7F7F7] dark:bg-[#2A2A2A] text-[#52616B] dark:text-[#A0A0A0]" 
                />
              </div>

              <div className="space-y-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                >
                  Register
                </button>
              </div>

              <div className="mt-6 text-center">
                <p className='text-sm text-[#52616B] dark:text-[#A0A0A0]'>Already have an account? 
                  <Link to={'/'} className="text-blue-500 text-sm"> Login</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
