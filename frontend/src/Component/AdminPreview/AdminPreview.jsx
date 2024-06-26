import React, { useEffect, useState } from "react";
import "./AdminPreview.css";
import { CiSearch } from "react-icons/ci";
import UserTable from "./UserTable";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import useAuthRedirect from "../../../context/useAuth";
import axios from "axios";

const AdminPreview = () => {
  useAuthRedirect();
  const [search, setSearch] = useState("");
  const [adminData, setAdminData] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAdmin = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("https://hostel-management-with-react.vercel.app//admin");
        setAdminData(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setMessage("Cannot fetch data");
      }
    };
    fetchAdmin();
  }, []);

  const handleDelete = async (id) => {
    console.log("Deleting user with id:", id);
    try {
      await axios.delete(`https://hostel-management-with-react.vercel.app/admin/${id}`);
      setAdminData((prevData) => prevData.filter((admin) => admin._id !== id));
      setMessage("Admin deleted successfully");
    } catch (error) {
      setMessage("Failed to delete admin");
      console.error("Error deleting admin", error);
    }
  };

  const handleUpdateRole = async (id, newRole) => {
    try {
      const response = await axios.patch(`https://hostel-management-with-react.vercel.app/admin/${id}`, {
        role: newRole,
      });
      setAdminData((prevData) =>
        adminData.map((admin) =>
          admin._id === id ? { ...admin, role: response.data.role } : admin
        )
      );
      setMessage("Admin updated successfully");
    } catch (error) {
      setMessage("Failed to update admin");
      console.error("Failed to update admin", error);
    }
  };

  const filteredData = adminData.filter(
    (admin) =>
      admin.fullname.toLowerCase().includes(search.toLowerCase()) ||
      admin.email.toLowerCase().includes(search.toLowerCase()) ||
      admin.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="__prevCon">
      <h2 className="__prevHeader">Admins</h2>

      <div className="__prevSearchCon">
        <CiSearch className="__prevSearchIcon" />
        <input
          type="text"
          className="__prevSearch"
          placeholder="Search by name or email or role"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

     <div className="__prevList">
      {isLoading ? (
        <p>Loading...</p>
        ): adminData.length > 0 ? (
          <UserTable
            data={filteredData}
            onDelete={handleDelete}
            onUpdateRole={handleUpdateRole}
          />
        ) : (<p>no update admin</p>)
      }

     </div>

      {message && <p>{message}</p>}

      </div>
  )
}


export default AdminPreview;
