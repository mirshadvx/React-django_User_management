import React, { useEffect, useState } from "react";
import api from "../../api";
import ShowUserList from "../../components/admin/ShowUserList";
import EditUser_data from "../../components/admin/EditUser_data";
import 'react-toastify/dist/ReactToastify.css';
import { toast,Bounce } from 'react-toastify';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [filtered_data, setFiltered_data] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get("api/admin/users/");
      setUsers(response.data);
      setFiltered_data(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Failed to fetch user details. Only admins can access this.");
    }
  };

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilterText(value);

    const filtered = users.filter((user) =>
      user.username.toLowerCase().includes(value.toLowerCase()) || user.email.toLowerCase().includes(value.toLowerCase())
    );
    setFiltered_data(filtered);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedUser(null);
  };

  const handleSave = async (userId, updatedData) => {
    try {
      const response = await api.patch(`/api/admin/users/${userId}/`, updatedData);
      setUsers((prev) =>
        prev.map((user) => (user.id === userId ? { ...user, ...updatedData } : user))
      );
      setFiltered_data((prev) =>
        prev.map((user) => (user.id === userId ? { ...user, ...updatedData } : user))
      );
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
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user.");
    }
  };

  const delete_user = async (id) => {
   try {
      const response = await api.delete(`/api/admin/users/${id}/`);
      setUsers((prev) => prev.filter((user) => user.id !== id));
      setFiltered_data((prev) => prev.filter((user) => user.id !== id));
      toast.error('User deleted successfully!!', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user.");
    }
  }
  

  return (
    <div className="container max-w-3xl px-4 mx-auto sm:px-8">
      <div className="py-8">
        <div className="flex flex-row justify-between w-full mb-1 sm:mb-0">
          <h2 className="text-2xl leading-tight">Users</h2>
          <div className="text-end">
            <form
              className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="relative">
                <input
                  type="text"
                  id="filter"
                  value={filterText}
                  onChange={handleFilterChange}
                  className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-[350px] py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Filter by name"
                />
              </div>
            </form>
          </div>
        </div>
        <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
          <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    Phone
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    Address
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered_data.map((user) => (
                  <ShowUserList key={user.id} user={user}  onEditClick={handleEditClick} onDeleteClick={delete_user}/>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {selectedUser && (
        <EditUser_data
          user={selectedUser}
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSave={handleSave}
        />
      )} 
    </div>
  );
};

export default Admin;



// import React, { useEffect, useState } from "react";
// import api from "../../api";
// import ShowUserList from "../../components/admin/ShowUserList";

// const Admin = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const response = await api.get("api/admin/users/");
//       setUsers(response.data);
//       console.log(response.data);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       alert("Failed to fetch user details. Only admins can access this.");
//     }
//   };

//   return (
//     <div className="container max-w-3xl px-4 mx-auto sm:px-8">
//       <div className="py-8">
//         <div className="flex flex-row justify-between w-full mb-1 sm:mb-0">
//           <h2 className="text-2xl leading-tight">Users</h2>
//           <div className="text-end">
//             <form className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0">
//               <div className="relative">
//                 <input
//                   type="text"
//                   id="&quot;form-subscribe-Filter"
//                   className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
//                   placeholder="name"
//                 />
//               </div>
//               <button
//                 className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
//                 type="submit"
//               >
//                 Filter
//               </button>
//             </form>
//           </div>
//         </div>
//         <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
//           <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
//             <table className="min-w-full leading-normal">
//               <thead>
//                 <tr>
//                   <th
//                     scope="col"
//                     className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
//                   >
//                     Name
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
//                   >
//                     Email
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
//                   >
//                     Phone
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
//                   >
//                     Address
//                   </th>
//                   <th
//                     scope="col"
//                     className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
//                   >
//                     Action
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {users.map((user) => (
//                   <ShowUserList key={user.id} user={user} />
//                 ))}
//               </tbody>

//             </table>
//             <div className="flex flex-col items-center px-5 py-5 bg-white xs:flex-row xs:justify-between">
//               <div className="flex items-center">
//                 <button
//                   type="button"
//                   className="w-full p-4 text-base text-gray-600 bg-white border rounded-l-xl hover:bg-gray-100"
//                 >
//                   <svg
//                     width="9"
//                     fill="currentColor"
//                     height="8"
//                     className=""
//                     viewBox="0 0 1792 1792"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"></path>
//                   </svg>
//                 </button>
//                 <button
//                   type="button"
//                   className="w-full px-4 py-2 text-base text-indigo-500 bg-white border-t border-b hover:bg-gray-100 "
//                 >
//                   1
//                 </button>
//                 <button
//                   type="button"
//                   className="w-full px-4 py-2 text-base text-gray-600 bg-white border hover:bg-gray-100"
//                 >
//                   2
//                 </button>
//                 <button
//                   type="button"
//                   className="w-full px-4 py-2 text-base text-gray-600 bg-white border-t border-b hover:bg-gray-100"
//                 >
//                   3
//                 </button>
//                 <button
//                   type="button"
//                   className="w-full px-4 py-2 text-base text-gray-600 bg-white border hover:bg-gray-100"
//                 >
//                   4
//                 </button>
//                 <button
//                   type="button"
//                   className="w-full p-4 text-base text-gray-600 bg-white border-t border-b border-r rounded-r-xl hover:bg-gray-100"
//                 >
//                   <svg
//                     width="9"
//                     fill="currentColor"
//                     height="8"
//                     className=""
//                     viewBox="0 0 1792 1792"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Admin;