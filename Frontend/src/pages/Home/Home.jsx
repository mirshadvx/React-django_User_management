import React, { useEffect, useState } from "react";
import "../../index.css";
import api from "../../api";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { toast,Bounce } from 'react-toastify';
import { useSelector, useDispatch } from "react-redux";
import { set_user_data } from "../../redux_toolkit_store/home_slice/User_Data_slicer";


const Home = () => {
  const User_store_data = useSelector((state) => state.User_Data)
  const dispatch = useDispatch()

  const { register, handleSubmit, formState: {errors}, watch} = useForm()
  const navigate = useNavigate()

  useEffect(() => {
    user_data()
  },[])

  useEffect(() => {
    console.log(User_store_data,"store data");
  },[User_store_data])

  const user_data = async () => {
    const datas = await api.get("user/details/")
    .then((res) => res.data)
    .then((data) => { dispatch(set_user_data(data))
    }).catch((err) => alert(err))
  }

  const [isEditing, setIsEditing] = useState(false);


  const edit_details = async (data) => {
    const formData = new FormData();

    if (data.username) formData.append("username", data.username);
    if (data.phone) formData.append("phone_number", data.phone);
    if (data.address) formData.append("address", data.address);
    if (data.gender) formData.append("gender", data.gender);
    if (data.image && data.image[0]) {
      formData.append("profile_picture", data.image[0]);
    }

    try {
      const response = await api.patch("user/details/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // setUser(response.data);
      dispatch(set_user_data(response.data))
        toast('updated successfully!!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      setIsEditing(false);
    } catch (error) {
      console.error("Error upd profile", error);
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const selectedImage = watch("image");

  const previewUrl = selectedImage && selectedImage[0]
    ? URL.createObjectURL(selectedImage[0])
    : User_store_data.profile_picture;

  return (
    <>
    <button onClick={() => {navigate('/logout'); toast.success('Logout successfully!', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
          });}} className="absolute left-[90%] top-7 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Logout
    </button>
      <div className="max-w-2xl mx-4 sm:max-w-md lg:max-w-lg xl:w-[1024px] sm:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900 p-6">
        <div className="text-center">
          <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-gray-200">
            <img
              className="object-cover w-full h-full"
              src={previewUrl ? previewUrl: `http://localhost:8000${User_store_data.profile_picture}`}
              alt="Profile"
            />
            {isEditing && (
              <label
                className="absolute inset-0 bg-gray-700 bg-opacity-10 flex items-center justify-center text-white cursor-pointer"
                htmlFor="profilePictureInput">
                <input
                  id="profilePictureInput"
                  type="file"
                  className="hidden"
                    {...register("image", {
                      validate: {
                        fileType: (files) => {
                          if (!files || !files[0]) return true;
                          const allowedTypes = ["image/jpeg", "image/png"];
                          return allowedTypes.includes(files[0].type) || "Only JPG and PNG files are allowed!";
                        },
                      },
                    })}
                />
                {errors.image && (
                  <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>
                )}
              </label>
              
            )}
          </div>
          <h2 className="text-2xl font-semibold mt-4">{User_store_data.username}</h2>
          {!isEditing && <p className="text-gray-500">{User_store_data.email}</p>}
        </div>

        <div className="mt-6">
          {isEditing ? (
            <form className="space-y-4" onSubmit={handleSubmit(edit_details)}>
              <div>
                <label className="block text-sm font-semibold">Name</label>
                <input
                  type="text"
                  defaultValue={User_store_data.username}
                  {...register('username', {
                  required: false,
                  minLength: {
                    value: 4,
                    message: 'Username must be at least 4 characters long',
                  },
                  maxLength: {
                    value: 20,
                    message: 'Username cannot exceed 20 characters',
                  },
                })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.username && (
              <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold">Phone</label>
                <input
                  type="text"
                  defaultValue={User_store_data.phone_number}
                  {...register('phone', {
                  required: false,
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'Enter a valid 10-digit phone number',
                  },
                  })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                   )}
              </div>
              <div>
                <label className="block text-sm font-semibold">Address</label>
                <input
                  type="text"
                  defaultValue={User_store_data.address}
                  {...register('address', {
                  required: false,
                  maxLength: {
                    value: 100,
                    message: 'Address cannot exceed 100 characters',
                  },
                    })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                    )}
              </div>
              <div>
                <label className="block text-sm font-semibold pb-1">Gender</label>
                <select
                defaultValue={User_store_data.gender}
                 {...register('gender', {
                    required: false,
                  })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Other">Other</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>
                {errors.gender && (
              <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
            )}
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  // onClick={toggleEdit}
                  className="w-1/2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div>
                <strong>Phone:</strong> {User_store_data.phone_number}
              </div>
              <div>
                <strong>Address:</strong> {User_store_data.address}
              </div>
              <div>
                <strong>Gender:</strong> {User_store_data.gender}
              </div>
              <button
                onClick={toggleEdit}
                className="w-1/2 block mx-auto px-4 py-2 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800"
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;


