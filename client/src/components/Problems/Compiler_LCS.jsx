// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import Navbar from "../Navbar";
// import Timer from "../Stopwatch/Timer";
// import Codearena from "../Codearena/Codearena";

// const Compiler_LCS = () => {
//   const { title } = useParams();
//   const [problemData, setProblemData] = useState(null);

//   useEffect(() => {
//     const fetchProblem = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/problems/${title}`); // Or /api/problems/${title}
//         setProblemData(res.data);
//       } catch (err) {
//         console.error("Failed to fetch problem:", err);
//       }
//     };

//     fetchProblem();
//   }, [title]);

//   return (
//     <>
//      <div className="min-h-screen bg-gray-100">
//   <Navbar />
//   <div className="flex h-screen">
//     {/* Problem Description Panel */}
//     <div className="w-full md:w-2/5 bg-white p-6 border-r overflow-y-auto">
//       {problemData ? (
//         <>
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">{problemData.Title}</h2>
//           <p className="text-sm text-gray-500 italic mb-2">Difficulty: {problemData.Difficulty}</p>
//           <p className="text-gray-700 mb-6">{problemData.Description}</p>
//           <p className="text-sm text-gray-800"><strong>Testcase:</strong> {problemData.Testcase}</p>
//         </>
//       ) : (
//         <p className="text-gray-600">Loading problem...</p>
//       )}
//     </div>

//     {/* Codearena Panel */}
//     <div className="w-full md:w-3/5 p-6 bg-gray-50 overflow-y-auto">
//       <Codearena problemTitle={title}/>
//     </div>
//   </div>
// </div>

//     </>
//   );
// };

// export default Compiler_LCS;



import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar";
import Timer from "../Stopwatch/Timer";
import Codearena from "../Codearena/Codearena";

const Compiler_LCS = () => {
  const { title } = useParams();
  const [problemData, setProblemData] = useState(null);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_MAIN_BACKEND}/problems/${title}`);
        setProblemData(res.data);
      } catch (err) {
        console.error("Failed to fetch problem:", err);
      }
    };

    fetchProblem();
  }, [title]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 to-white">
      <Navbar />
      
      {/* Header with Timer */}
      <div className="w-full border-b px-6 py-3 bg-white shadow flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800">Solve Problem: {title}</h1>
        <Timer />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Left: Problem Description */}
        <div className="w-full md:w-2/5 p-6 overflow-y-auto border-r border-gray-200 bg-white">
          {problemData ? (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{problemData.Title}</h2>
              <span
  className={`inline-block text-xs px-3 py-1 rounded-full mb-4 font-medium
    ${problemData.Difficulty === "Easy" ? "bg-green-100 text-green-800" :
      problemData.Difficulty === "Medium" ? "bg-yellow-100 text-yellow-800" :
      "bg-red-100 text-red-800"}
  `}
>
  {problemData.Difficulty}
</span>

<div className="flex flex-wrap gap-2 mb-4">
  {problemData.Tags && problemData.Tags.map((tag, index) => (
    <span
      key={index}
      className="inline-block bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full"
    >
      {tag}
    </span>
  ))}
</div>
              <div className="text-gray-800 mb-4 whitespace-pre-line">{problemData.Description}</div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Testcases:</h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                  {problemData.Testcase.map((tc, index) => (
                    <li key={index}>
                      <code className="bg-gray-100 rounded px-2 py-1">{tc}</code>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center h-full">
              <p className="text-gray-500 text-sm animate-pulse">Loading problem...</p>
            </div>
          )}
        </div>

        {/* Right: Code Editor */}
        <div className="w-full md:w-3/5 p-6 bg-gray-50 overflow-y-auto">
          <Codearena problemTitle={title} />
        </div>
      </div>
    </div>
  );
};

export default Compiler_LCS;

