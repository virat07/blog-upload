"use client"
import React, { useState, useEffect } from "react";
import { useAuthContext } from "@/context/authContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore_db } from "@/firebaseconfig";
import Notification from "../components/notifcation";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Profile = () => {
  const { user } = useAuthContext();
  const [userData, setUserData] = useState({
    displayName: "",
    email: "",
    linkedinToken: "",
    linkedinURN: "",
  });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState("");
  const [showLinkedinToken, setShowLinkedinToken] = useState(false);
  const [showLinkedinURN, setShowLinkedinURN] = useState(false); // State for toggleable visibility of LinkedIn URN

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const db = firestore_db;
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      }
    };

    fetchUserData();
  }, [user]);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      setLoading(true);
      const db = firestore_db;
      const docRef = doc(db, "users", user.uid);
      try {
        await updateDoc(docRef, userData);
        setNotification("Changes saved successfully!");
      } catch (error) {
        setNotification("Failed to save changes. Please try again.");
      } finally {
        setLoading(false);
        setTimeout(() => {
          setNotification("");
        }, 3000); // Hide the notification after 3 seconds
      }
    }
  };

  const handleNotificationClose = () => {
    setNotification("");
  };

  const toggleShowLinkedinToken = () => {
    setShowLinkedinToken(!showLinkedinToken);
  };

  const toggleShowLinkedinURN = () => {
    setShowLinkedinURN(!showLinkedinURN);
  };

  return (
    <div className="container mx-auto mt-10 p-4">
      <h1 className="text-2xl font-semibold mb-4">Profile</h1>
      {notification && (
        <Notification
          message={notification}
          onClose={handleNotificationClose}
        />
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="displayName"
            value={userData.displayName}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black"
          />
        </div>
        <div className="mb-4 relative">
          <label className="block text-gray-700">LinkedIn Token</label>
          <input
            type={showLinkedinToken ? "text" : "password"}
            name="linkedinToken"
            value={userData.linkedinToken}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black"
          />
          <button
            type="button"
            onClick={toggleShowLinkedinToken}
            className="absolute right-3 top-9 text-gray-600 focus:outline-none flex items-center"
          >
            {showLinkedinToken ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
        <div className="mb-4 relative">
          <label className="block text-gray-700">LinkedIn URN</label>
          <input
            type={showLinkedinURN ? "text" : "password"}
            name="linkedinURN"
            value={userData.linkedinURN}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black"
          />
          <button
            type="button"
            onClick={toggleShowLinkedinURN}
            className="absolute right-3 top-9 text-gray-600 focus:outline-none flex items-center"
          >
            {showLinkedinURN ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
