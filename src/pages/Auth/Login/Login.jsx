import React, { useState, useContext } from 'react';
import AuthIllustration from "../../../assets/Authentication-rafiki.svg";
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../AuthProvider';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login, googleSignIn } = useContext(AuthContext)

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password)
      .then((userCredential) => {
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'Welcome back!',
          timer: 2000,
          showConfirmButton: false
        });
        navigate('/dashboard');
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: error.message,
        });
      });


  };

  const handleGoogleLogin = () => {
    googleSignIn()
      .then((result) => {
        Swal.fire({
          icon: 'success',
          title: 'Google Login Successful',
          text: 'Welcome back!',
          timer: 2000,
          showConfirmButton: false
        });
        navigate('/dashboard');
      }).catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Google Login Failed',
          text: error.message,
        });
      });
  };

  return (
    <div className='bg-[#F7F7F7] dark:bg-[#2A2A2A] max-w-[1440px] min-h-screen flex justify-center items-center'>
      <div className="w-[80%] h-[550px] bg-white dark:bg-[#1E1E1E] shadow-lg rounded-lg flex">
        <div className="w-1/2 flex justify-center items-center">
          <img className="w-full h-full object-contain" src={AuthIllustration} alt="Authentication Illustration" />
        </div>
        <div className="w-1/2 flex justify-center items-center">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold mb-6 dark:text-[#E0E0E0] text-[#1E2022] text-center">Welcome Back</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-[#52616B] dark:text-[#A0A0A0] font-bold mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input input-bordered w-full border-[#F7F7F7] dark:border-[#2A2A2A] bg-[#F7F7F7] dark:bg-[#2A2A2A]"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-[#52616B] dark:text-[#A0A0A0] font-bold mb-2">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-bordered w-full border-[#F7F7F7] dark:border-[#2A2A2A] bg-[#F7F7F7] dark:bg-[#2A2A2A]"
                  required
                />
              </div>
              <div className="space-y-4">
                <button className="bg-blue-500 text-white font-bold py-3 px-4 rounded w-full" type="submit">
                  Sign In
                </button>
                <button onClick={handleGoogleLogin} className="bg-red-500 flex items-center justify-center gap-2 text-white font-bold py-3 px-4 rounded w-full">
                  <FcGoogle className='text-2xl' /> Login with Google
                </button>
              </div>
              <div className="mt-6 text-center">
                <p className='text-sm text-[#52616B] dark:text-[#A0A0A0]'>Don't have an account? <Link to={'/register'} className="text-blue-500 text-sm">Register</Link></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
