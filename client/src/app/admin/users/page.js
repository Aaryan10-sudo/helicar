"use client";
import { baseURL } from "@/config/config";
import DeleteIcon from "@/ui/DeleteIcon";
import Loader from "@/ui/Loader";
import UserIcon from "@/ui/UserIcon";
import { Dialog } from "@headlessui/react";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";

const roles = ["Admin", "Driver", "Manager"];

const UsersPanel = () => {
  const [users, setUsers] = useState([]);
  const [loader, setLoader] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const deleteAdmin = async (id) => {
    try {
      const result = await axios({
        url: `${baseURL}/admin/delete?id=${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (error) {}
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: `Product deleted successfully`,
          icon: "success",
        });
        deleteAdmin(id);
        getAllAdmin();
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      profileImage,
    };
    console.log(data);
    try {
      setLoader(true);
      const result = await axios({
        method: "POST",
        url: `${baseURL}/admin/create`,
        data: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(result);
      getAllAdmin();
      setIsOpen(false);
      setFormData("");
      setProfileImage("");
      setLoader(false);
    } catch (error) {
      console.log(error.message);
      setLoader(false);
    }
  };

  const getAllAdmin = async () => {
    try {
      const result = await axios({
        method: "GET",
        url: `${baseURL}/admin/getAll`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUsers(result.data.data);
      console.log(result);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  useEffect(() => {
    getAllAdmin();
  }, []);

  const onDrop = useCallback(async (acceptedFiles) => {
    let fileData = acceptedFiles[0];
    let data = new FormData();
    data.append("document", fileData);
    try {
      let result = await axios({
        url: `${baseURL}/file/single`,
        method: "POST",
        data: data,
      });
      console.log(result.data.result);
      setProfileImage(result.data.result);
    } catch (error) {
      console.log(error.response?.data?.message || "Something went wrong");
      console.log(error.message);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen p-8 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-black">Users Management</h1>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add User
        </button>
      </div>

      <table className="w-full table-auto border border-gray-700 rounded-lg overflow-hidden">
        <thead className="bg-blue-100 text-left text-black">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Role</th>
            <th className="p-3">Profile</th>
            <th className="p-3">Status</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, index) => (
            <tr key={index} className="border-t border-gray-700 ">
              <td className="p-3 text-black">{u.name}</td>
              <td className="p-3 text-black">{u.email}</td>
              <td className="p-3 text-black">{u.role}</td>
              <td className="p-3 text-black">
                {u.profileImage && (
                  <img
                    src={u.profileImage}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
              </td>
              <td className="p-3 text-black ">Active</td>
              <td className="mx-[20px]">
                <button
                  className="mx-[20px] cursor-pointer"
                  onClick={() => handleDelete(u.id)}
                >
                  <DeleteIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white text-black shadow-lg rounded-lg p-6 w-full max-w-md">
            <Dialog.Title className="text-xl font-semibold mb-4">
              Add New User
            </Dialog.Title>

            <form onSubmit={handleSubmit} className="space-y-4">
              <span className="">
                <div
                  {...getRootProps()}
                  className="w-[80px] h-[80px] rounded-lg p-2 mb-4 cursor-pointer flex justify-center items-center"
                >
                  <input {...getInputProps()} />
                  <div className="w-full rounded-lg flex justify-center items-center h-full">
                    {profileImage ? (
                      <img src={profileImage} className="w-full h-full" />
                    ) : (
                      <UserIcon />
                    )}
                  </div>
                </div>
              </span>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full p-2 bg-gray-200 rounded"
                required
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-2 bg-gray-200 rounded"
                required
              />

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full p-2 bg-gray-200 rounded"
                required
              />

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-2 bg-gray-200 rounded"
                required
              >
                <option value="" disabled>
                  Select Role
                </option>
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 text-white flex justify-center items-center"
                >
                  {loader ? <Loader /> : "Save"}
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default UsersPanel;
