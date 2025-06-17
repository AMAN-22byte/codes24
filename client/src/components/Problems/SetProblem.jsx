import React, { useState } from "react";

const SetProblem = () => {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Difficulty, setDifficulty] = useState("");
  const [Tags, setTags] = useState("");
  const [Testcase, setTestcase] = useState(""); // single string, maybe multiline
  const [hiddenTC, setHiddenTC] = useState([
    { input: "", output: "" }
  ]);

  // Add new empty hidden test case pair
  const addHiddenTC = () => {
    setHiddenTC([...hiddenTC, { input: "", output: "" }]);
  };

  // Remove hidden test case by index
  const removeHiddenTC = (index) => {
    const newHiddenTC = hiddenTC.filter((_, i) => i !== index);
    setHiddenTC(newHiddenTC);
  };

  // Handle input change for hiddenTC
  const handleHiddenTCChange = (index, field, value) => {
    const newHiddenTC = [...hiddenTC];
    newHiddenTC[index][field] = value;
    setHiddenTC(newHiddenTC);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // For Testcase, you might want to send it as an array, splitting by lines or some delimiter
    const testcaseArray = Testcase
      .split("\n\n") // split by empty line between test cases
      .map(tc => tc.trim())
      .filter(tc => tc.length > 0);

    const data = {
      Title,
      Description,
      Difficulty,
      Tags: Tags.split(",").map(tag => tag.trim()).filter(tag => tag !== ""),
      Testcase: testcaseArray,
      hiddenTC: hiddenTC.filter(tc => tc.input && tc.output) // only non-empty
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_MAIN_BACKEND}/set`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Created Successfully");
        console.log("Response:", result);
        setTitle("");
        setDescription("");
        setDifficulty("");
        setTags("");
        setTestcase("");
        setHiddenTC([{ input: "", output: "" }]);
      } else {
        alert("Error: " + (result.message || "Failed to Create Problem"));
      }
    } catch (error) {
      console.error("SetProblem error:", error);
      alert("SETPROBLEM Denied");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-xl space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-purple-700">
          Set New Problem
        </h2>

        {/* Other fields unchanged... */}

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
            Difficulty
          </label>
          <select
            value={Difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          >
            <option value="">Select Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            value={Tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="e.g. arrays, dp, math"
            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Sample Test Cases (separate multiple test cases by empty lines)
          </label>
          <textarea
            value={Testcase}
            onChange={(e) => setTestcase(e.target.value)}
            placeholder={`Input:\n1 2\nOutput:\n3\n\nInput:\n4 5\nOutput:\n9`}
            className="w-full mt-1 px-4 py-2 border rounded-md h-32 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hidden Test Cases (input & output pairs)
          </label>

          {hiddenTC.map((tc, idx) => (
            <div key={idx} className="mb-4 p-4 border rounded-md bg-gray-50">
              <label className="block text-xs font-medium text-gray-600">Input</label>
              <textarea
                value={tc.input}
                onChange={(e) => handleHiddenTCChange(idx, "input", e.target.value)}
                placeholder="Enter input for hidden test case"
                className="w-full mt-1 px-3 py-2 border rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-purple-400"
                rows={3}
                required
              />
              <label className="block text-xs font-medium text-gray-600 mt-2">Output</label>
              <textarea
                value={tc.output}
                onChange={(e) => handleHiddenTCChange(idx, "output", e.target.value)}
                placeholder="Enter expected output for hidden test case"
                className="w-full mt-1 px-3 py-2 border rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-purple-400"
                rows={2}
                required
              />
              {hiddenTC.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeHiddenTC(idx)}
                  className="mt-2 text-red-500 text-xs hover:underline"
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addHiddenTC}
            className="mt-2 bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700 transition"
          >
            Add Hidden Test Case
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
        >
          Submit Problem
        </button>
      </form>
    </div>
  );
};

export default SetProblem;
