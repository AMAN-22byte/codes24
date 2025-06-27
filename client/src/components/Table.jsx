import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const getDifficultyStyle = (difficulty) => {
  const baseClass = "px-4 py-2 font-semibold rounded-full text-xs";
  if (difficulty === "Easy") return `${baseClass} text-green-600 bg-green-100`;
  if (difficulty === "Medium")
    return `${baseClass} text-yellow-600 bg-yellow-100`;
  if (difficulty === "Hard") return `${baseClass} text-red-600 bg-red-100`;
  return `${baseClass} text-gray-600 bg-gray-100`;
};

const Table = () => {
  const [problems, setProblems] = useState([]);
  const navigate = useNavigate();
  const [solvedProblems, setSolvedProblems] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      const user = JSON.parse(localStorage.getItem("user")); // Or via API
      const { data } = await axios.get(
        `${import.meta.env.VITE_MAIN_BACKEND}/user/${user._id}`
      );
      setSolvedProblems(data.solvedProblems.map((id) => id.toString())); // Convert ObjectId to string
    };

    fetchUser();
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_MAIN_BACKEND}/`)
      .then((res) => setProblems(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleRowClick = (title) => {
    navigate(`/problems/${encodeURIComponent(title)}`);
  };

  return (
    <div className="overflow-x-auto w-full pl-20">
      <div className="min-w-full shadow-md rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
        <table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-300">
          <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-800 dark:text-gray-400">
            <tr>
              <th className="px-6 py-4">Problem</th>
              <th className="px-6 py-4">Difficulty</th>
              <th className="px-6 py-4">Topics</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem, index) => (
              <tr
                key={problem._id}
                onClick={() => handleRowClick(problem.Title)}
                className="cursor-pointer transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {problem.Title}
                </td>
                <td className="px-6 py-4">
                  <span className={getDifficultyStyle(problem.Difficulty)}>
                    {problem.Difficulty}
                  </span>
                </td>
                <td className="px-6 py-4 space-x-1">
                  {problem.Tags && problem.Tags.length > 0 ? (
                    problem.Tags.map((tag, i) => (
                      <span
                        key={i}
                        className="inline-block bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {solvedProblems.includes(problem._id) ? (
                    <span
                      className="inline-block w-3 h-3 bg-green-500 rounded-full"
                      title="Solved"
                    />
                  ) : (
                    <span
                      className="inline-block w-3 h-3 bg-red-500 rounded-full"
                      title="Unsolved"
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {problems.length === 0 && (
          <div className="text-center py-6 text-gray-500 dark:text-gray-400">
            No problems found.
          </div>
        )}
      </div>
    </div>
  );
};
export default Table;
