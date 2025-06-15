import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    // Replace with your auth-token logic
    const token = localStorage.getItem("token");

    const fetchUserData = async () => {
      try {
        const userRes = await axios.get("/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(userRes.data);

        const submissionRes = await axios.get("/api/submissions/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSubmissions(submissionRes.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchUserData();
  }, []);

  const solvedCount = new Set(
    submissions.filter(s => s.status === "Accepted").map(s => s.problemId)
  ).size;

  if (!userData) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Welcome, {userData.name}</h1>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-xl shadow bg-green-100">
          <h2 className="text-xl font-semibold">Questions Solved</h2>
          <p className="text-3xl">{solvedCount}</p>
        </div>
        <div className="p-4 rounded-xl shadow bg-blue-100">
          <h2 className="text-xl font-semibold">Total Submissions</h2>
          <p className="text-3xl">{submissions.length}</p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-2">Submission History</h2>
      <div className="bg-white shadow rounded-lg overflow-auto max-h-96">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4">Problem</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Language</th>
              <th className="py-2 px-4">Time</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((sub, index) => (
              <tr key={index} className="border-t">
                <td className="py-2 px-4">{sub.problemTitle}</td>
                <td className={`py-2 px-4 ${sub.status === 'Accepted' ? 'text-green-600' : 'text-red-500'}`}>
                  {sub.status}
                </td>
                <td className="py-2 px-4">{sub.language}</td>
                <td className="py-2 px-4">{new Date(sub.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
