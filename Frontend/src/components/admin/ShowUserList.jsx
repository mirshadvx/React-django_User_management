import React from "react";
import "../../index.css";

const ShowUserList = ({ user , onEditClick , onDeleteClick}) => {


  return (
    <tr>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <a className="relative block">
              <img
                alt="profile"
                src={user.profile_picture || "/images/default-profile.jpg"} // Fallback for missing profile picture
                className="mx-auto object-cover rounded-full h-10 w-10"
              />
            </a>
          </div>
          <div className="ml-3">
            <p className="text-gray-900 whitespace-no-wrap">{user.username}</p>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <p className="text-gray-900 whitespace-no-wrap">{user.email}</p>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <p className="text-gray-900 whitespace-no-wrap">{user.phone_number}</p>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <p className="text-gray-900 whitespace-no-wrap">{user.address}</p>
      </td>
      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
        <button onClick={() => onEditClick(user)} className="text-indigo-600 hover:text-indigo-900">
          Edit
        </button>
         <button
          onClick={() => onDeleteClick(user.id)}
          className="text-red-600 hover:text-red-900 ml-4">
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ShowUserList;

