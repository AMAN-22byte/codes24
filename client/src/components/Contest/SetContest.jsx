import React, { useState } from "react";

const Setcontest = () => {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Contest, setContest] = useState("");
//   const [Tags, setTags] = useState("");
  const [Testcase, setTestcase] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const data = {
      Title,
      Description,
      Contest,
    //   Tags: Tags.split(",").map(tag => tag.trim()), 
      Testcase
    };

    try {
      const response = await fetch("http://localhost:5000/contestset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        alert("Created Successfully");
        console.log("Response:", result);
        setTitle("");
        setDescription("");
        setContest("");
        // setTags("");
        setTestcase("");
      } else {
        alert("Error: " + (result.message || "Failed to Create Problem"));
      }
    } catch (error) {
      console.error("SetProblem error:", error);
      alert("SETCONTESTPROBLEM Denied");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-xl space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-purple-700">
          Set CONTEST Problem
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Problem Title
          </label>
          <input
            type="text"
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full mt-1 px-4 py-2 border rounded-md h-32 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Contest
          </label>
          <select
            value={Contest}
            onChange={(e) => setContest(e.target.value)}
            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          >
            <option value="">Select Contest Name</option>
            <option value="W1">W1</option>
            <option value="W2">W2</option>
            <option value="W3">W3</option>
            <option value="W4">W4</option>
            <option value="W5">W5</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Sample Test Case
          </label>
          <textarea
            value={Testcase}
            onChange={(e) => setTestcase(e.target.value)}
            placeholder={`Input:\n1 2\nOutput:\n3`}
            className="w-full mt-1 px-4 py-2 border rounded-md h-32 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
        >
          Register Problem
        </button>
      </form>
    </div>
  );
};

export default Setcontest;
