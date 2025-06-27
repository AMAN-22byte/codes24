import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosMail } from "react-icons/io";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../AuthContext";
import SignUp from "./SignUp";

const Loginkaro = ({ onClose }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_MAIN_BACKEND}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
  alert("Login Successful");

  // ✅ Store the full user object for later use
  localStorage.setItem("user", JSON.stringify(result.user));

  // ✅ Use context login method to store token (you already had this)
  login(result.token);

  if (onClose) onClose();
  navigate("/");
}else {
        alert("Login failed: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Server error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="relative bg-white rounded-lg p-6 shadow-lg w-full max-w-sm">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-xl"
          >
            &times;
          </button>
        )}

        <h2 className="text-xl font-bold mb-4 text-purple-700">Login to Your Account</h2>
        <p className="text-sm mb-4 text-purple-400">
          Welcome back! Please enter your credentials to log in.
        </p>

        <form onSubmit={handleLogin}>
          <div className="relative mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <IoIosMail className="text-gray-400" />
            </div>
          </div>

          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaLock className="text-gray-400" />
            </div>
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaEye className="text-gray-500" />
              ) : (
                <FaEyeSlash className="text-gray-500" />
              )}
            </div>
          </div>

          <p className="flex items-end underline text-purple-500 mb-4 cursor-pointer">
            Forget Password?
          </p>

          {/* Optional: ToggleButton if needed */}
          {/* <ToggleButton /> */}

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-[30px] hover:bg-purple-700 transition mt-6 mb-6"
          >
            Login
          </button>
        </form>

        <p className="text-purple-500">
          Don't have an account?{" "}
          <span
            className="text-purple-600 cursor-pointer hover:underline"
            onClick={() => setShowSignUp(true)}
          >
            Sign Up
          </span>
        </p>

        {showSignUp && (
          <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl relative">
              <button
                onClick={() => setShowSignUp(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
              >
                &times;
              </button>
              <SignUp onClose={() => setShowSignUp(false)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Loginkaro;
