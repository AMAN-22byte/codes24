import React, { useState } from "react";
import { IoIosMail } from "react-icons/io";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import Loginkaro from "./Loginkaro";
import { useAuth } from "../AuthContext"; // ✅ Add this

const Login = ({ onClose }) => {
  const { login } = useAuth(); // ✅ Get login from context
  const [showPassword, setShowPassword] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // State for form inputs
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const data = {
      firstname,
      lastname,
      email,
      password
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_MAIN_BACKEND}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        alert("Registered Successfully");
        console.log("Response:", result);

        login(result.token); // ✅ Log in the user automatically

        onClose(); // ✅ Close the modal
      } else {
        alert("Error: " + (result.message || "Failed to register"));
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Server error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="relative bg-white rounded-lg p-6 shadow-lg w-full max-w-sm">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-xl">
          &times;
        </button>

        <h2 className="text-xl font-bold mb-4 text-purple-700">Create Your Account</h2>
        <p className="text-sm mb-4 text-purple-400">Sign up to start coding !!</p>

        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="First Name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Last Name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div className="mb-4 relative">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <IoIosMail className="text-gray-400" />
            </div>
          </div>

          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaLock className="text-gray-400" />
            </div>
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
            </div>
          </div>

          <div className="relative mb-6">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaLock className="text-gray-400" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-[30px] hover:bg-purple-700 transition">
            Next
          </button>
        </form>

        <p className="text-purple-500 mt-4">
          Already have an account?{" "}
          <span
            className="text-purple-600 cursor-pointer hover:underline"
            onClick={() => setShowLogin(true)}>
            Login
          </span>
        </p>

        {showLogin && (
          <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl relative">
              <button
                onClick={() => setShowLogin(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl">
                &times;
              </button>
              <Loginkaro onClose={() => setShowLogin(false)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
