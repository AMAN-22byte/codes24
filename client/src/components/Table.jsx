import React from 'react'
import {Link} from "react-router-dom";
import { useEffect,useState } from 'react';
import axios from 'axios';


const getDifficultyCell = (difficulty) => {
  if (difficulty === "Easy") {
    return <td className="px-6 py-4 font-bold text-green-500">{difficulty}</td>;
  } else if (difficulty === "Medium") {
    return <td className="px-6 py-4 font-bold text-yellow-500">{difficulty}</td>;
  } else if (difficulty === "Hard") {
    return <td className="px-6 py-4 font-bold text-red-500">{difficulty}</td>;
  } else {
    return <td className="px-6 py-4 font-bold text-gray-500">{difficulty}</td>; 
  }
};


const Table = () => {
    const [problems,setProblems] = useState([])
    useEffect(() => {
    axios.get('http://localhost:5000/')
      .then(res => setProblems(res.data))
      .catch(err => console.error(err));
  }, []);
  return (
    

<div className="relative overflow-x-auto shadow-md sm:rounded-lg w-300">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Problem
                </th>
                {/* <th scope="col" className="px-6 py-3">
                    Rating
                </th> */}
                <th scope="col" className="px-6 py-3">
                    Category
                </th>
                <th scope="col" className="px-6 py-3">
                    Status
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {problems.map((problem, index) => (
          <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{problem.Title}</th>
            {/* <td className="px-6 py-4">{problem.Description}</td> */}
            {getDifficultyCell(problem.Difficulty)}
            
            <td className="px-6 py-4">dynamic</td>
            <td className="px-6 py-4">
                    <Link key={problem._id} to={`/problems/${encodeURIComponent(problem.Title)}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Solve</Link>
                    {/* <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Solve</a> */}
                </td>
            {/* <td className="px-6 py-4">{problem.tags.join(', ')}</td> */}
          </tr>
        ))}
        </tbody>
    </table>
</div>

  )
}

export default Table