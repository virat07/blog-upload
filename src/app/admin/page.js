"use client";
import React, { useState } from "react";
import { useAuthContext } from "@/context/authContext";
import firebase_app, { firestore, firestore_db } from "@/firebaseconfig";
import { useRouter } from "next/navigation";
import axios from "axios";
import { addDoc, collection } from "firebase/firestore";

function Page() {
  const { user } = useAuthContext();
  const userToken = `AQWYar4xgnwf8J2f9WHQsqP5aKSunG7MOuzF5dCQnsQegnIt5r-vW9JWiXWUDI8F4O9yYJFDVLPZMgRIsCivWOOaMhMylblq8KlxDgdt6jAGogMlcbJtugeWEH3Hvv5NpRnnUN0ZsJIP4SNTZzlwzRlZljrOt1XKy3GnQGqykMSoGj-OFueLZLGgua5FVRrorgFITmVm4CvJeVrRZbkS_kqq1Vz0Qu7Kx0X-Y1bald4CTXxyaHuE9jJIppL7VCegXmKc3jepiJasQYRpR8fd-AtNORUQqLWYPyjtqnWuvIh1phxzcYCVsRXzz6NXBsNMumwM5dybHjZiFVO2d0jL6A2QemqqyQ`;
  const yourLinkedInURN = "PuS83scXBk";
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [platforms, setPlatforms] = useState({
    instagram: false,
    linkedin: false,
    twitter: false,
    facebook: false,
  });

  const handlePlatformToggle = (platform) => {
    setPlatforms({
      ...platforms,
      [platform]: !platforms[platform],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postData = {
        accessToken: userToken,
        title,
        content,
        linkedInURN: yourLinkedInURN, // Corrected variable name
      };

      alert("Post created successfully!");

      // Post to LinkedIn if selected
      if (platforms.linkedin) {
        const response = await fetch("/api/linkedin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log("LinkedIn API response:", responseData);
      }

      // Clear form fields after submission
      setTitle("");
      setContent("");
      setPlatforms({
        instagram: false,
        linkedin: false,
        twitter: false,
        facebook: false,
      });
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post.");
    }
  };

  React.useEffect(() => {
    if (user == null) router.push("/");
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className=" p-10 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">
          Create a New Post
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block mb-1 font-medium text-gray-800"
            >
              Title:
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 text-black"
              required
            />
          </div>
          <div>
            <label
              htmlFor="content"
              className="block mb-1 font-medium text-gray-800"
            >
              Content:
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 text-black"
              required
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="font-medium text-gray-800">Post to:</label>
            <div className="flex items-center space-x-2">
              <SwitchToggle
                label="Instagram"
                checked={platforms.instagram}
                onChange={() => handlePlatformToggle("instagram")}
              />
              <SwitchToggle
                label="LinkedIn"
                checked={platforms.linkedin}
                onChange={() => handlePlatformToggle("linkedin")}
              />
              <SwitchToggle
                label="Twitter"
                checked={platforms.twitter}
                onChange={() => handlePlatformToggle("twitter")}
              />
              <SwitchToggle
                label="Facebook"
                checked={platforms.facebook}
                onChange={() => handlePlatformToggle("facebook")}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:bg-indigo-600"
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
}

function SwitchToggle({ label, checked, onChange }) {
  return (
    <div className="flex items-center space-x-1">
      <input
        type="checkbox"
        id={label}
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      <label
        htmlFor={label}
        className={`flex items-center cursor-pointer ${
          checked ? "bg-indigo-600" : "bg-gray-300"
        } rounded-full w-14 h-7 transition-colors`}
      >
        <span
          className={`block rounded-full ${
            checked ? "translate-x-7" : "translate-x-0"
          } w-7 h-7 bg-white shadow-md transform transition-transform`}
        />
      </label>
      <span className="ml-2 font-medium text-gray-800">{label}</span>
    </div>
  );
}

export default Page;
