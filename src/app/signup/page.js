"use client";
import React from "react";
import { useRouter } from "next/navigation";
import signUp from "../Auth/signup";

function Page() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();

  const handleForm = async (event) => {
    event.preventDefault();

    const { result, error } = await signUp(email, password);

    if (error) {
      return console.log(error);
    }

    // else successful
    console.log(result);
    return router.push("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold text-center">Sign up</h1>
        <form onSubmit={handleForm} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              name="email"
              id="email"
              placeholder="example@mail.com"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              name="password"
              id="password"
              placeholder="password"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            Sign up
          </button>
        </form>
        <div className="flex items-center justify-center my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="mx-4 text-sm text-gray-500">or</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={() => router.push("/signin")} // Replace with your actual login page route
            className="inline-block px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 hover:text-blue-700 transition duration-300 ease-in-out"
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page;
