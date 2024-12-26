import React,{ useState } from 'react'
import '../../index.css';
import { FaUser, FaLock} from "react-icons/fa";
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constants';
import 'react-toastify/dist/ReactToastify.css';
import { toast,Bounce } from 'react-toastify';


const Login = () => {

  const [loading, setLoading ] = useState(false)
  const navigate = useNavigate();

  const {
  register,
  handleSubmit,
  formState: { errors },
  } = useForm()


  const Submit = async (da) => {
    setLoading(true)
    try {
      const res = await api.post("/api/token/",{
        username : da.username,
        password : da.password
      });

      if (res) {
        toast.success('Login successfully!', {
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
        localStorage.setItem(ACCESS_TOKEN , res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        console.log(res);
        console.log(localStorage.getItem(ACCESS_TOKEN,REFRESH_TOKEN));
        
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }

  }

  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full mx-auto bg-white rounded-xl shadow-lg p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Login</h2>
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

                <div className='flex justify-between'>
                  <button
                    type="submit"
                    className="w-[40%] flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Login
                  </button>
                  <button onClick={() => navigate('/register')}
                    className="w-[40%] flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
  )
}

export default Login