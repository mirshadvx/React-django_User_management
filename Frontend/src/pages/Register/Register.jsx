import React, { useState } from "react";
import '../../index.css'
import api from '../../api'
import { useNavigate } from 'react-router-dom'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants'
import { FaUser, FaEnvelope, FaLock, FaPhone, FaCamera, FaMapMarkerAlt } from "react-icons/fa";
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {

  const [loading, setLoading ] = useState(false)
  const navigate = useNavigate();

  const {
  register,
  handleSubmit,
  formState: { errors },
  } = useForm()

  const Submit = async (da) => {
    setLoading(true)
    console.log(da);

    try {
      const res = await api.post("/api/user/register/", { 
        username : da.username, 
        email : da.email,
        password : da.password, 
        phone : da.phone , 
      });
      
      if (res) {
          toast.success('Register successfully!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
          navigate('/');
      }
      
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        alert(error.response.data.detail || "An error occurred. Please try again.");
      } else {
        alert("Network error. Please try again.");
      }
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
          <p className="mt-2 text-gray-600">Register to get started</p>
        </div>

        <form onSubmit={handleSubmit(Submit)} className="space-y-6">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700">
              <FaUser className="mr-2" />
              Username
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                {...register('username', {
                  required: 'Username is required',
                  minLength: {
                    value: 4,
                    message: 'Username must be at least 4 characters long',
                  },
                  maxLength: {
                    value: 20,
                    message: 'Username cannot exceed 20 characters',
                  },
                })}
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
            )}
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700">
              <FaEnvelope className="mr-2" />
              Email
            </label>
            <input
              type="email"
              name="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: 'Enter a valid email address',
            },
          })}
            />
            {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
             )}
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700">
              <FaLock className="mr-2" />
              Password
            </label>
            <input
              type="password"
              name="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters long',
            },
            })}
            />
            {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
             )}
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700">
              <FaPhone className="mr-2" />
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              {...register('phone', {
              required: 'Phone number is required',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Enter a valid 10-digit phone number',
              },
              })}
            />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
              )}
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Register
            </button>
          </div>

          <div className="flex items-center justify-between text-sm">
            <a onClick={() => navigate('/login')}  className="text-blue-600 hover:text-blue-500 cursor-pointer">
              Already have an account? Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;