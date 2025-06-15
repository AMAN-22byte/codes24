import React from "react";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";

const block = [
  {
    header: "Weekly_01",
    content: "Register and Lead the troup",
  },
  {
    header: "Weekly_02",
    content: "Register and Lead the troup",
  },
  {
    header: "Weekly_03",
    content: "Register and Lead the troup",
  },
  {
    header: "Weekly_04",
    content: "Register and Lead the troup",
  },
  {
    header: "Weekly_05",
    content: "Register and Lead the troup",
  },
];

const Basecontest = () => {
  return (
    <>
      <Navbar />
      <div className="flex-col align-middle justify-center text-center font-extrabold text-3xl mt-5">
        <h1>
          BRUTE {">"} BETTER {">"} OPTIMAL
        </h1>
        <h2 className="text-xl mt-2">Weekly Contest</h2>
      </div>
      <h1 className="text-5xl text-purple-600 font-bold flex align-text-top justify-center mt-5">Comming soon !!</h1>
      {/* Card Container */}
      <div className="flex flex-wrap justify-center gap-6 mt-6">
        {block.map((item, index) => (
          <div
            key={index}
            className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <svg
              className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20">
              <path d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z" />
            </svg>

            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {item.header}
            </h5>
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
              {item.content}
            </p>
            <a
              href="#"
              className="inline-flex font-medium items-center text-blue-600 hover:underline">
              Register Now
              <svg
                className="w-3 h-3 ml-2 rtl:rotate-[270deg]"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
                />
              </svg>
            </a>
          </div>
        ))}
      </div>
      <Link to='/contestset'><div className="flex justify-center"><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" type="button">Set Problem for Weekly_Contest_01</button></div></Link>
      
      
    </>
  );
};

export default Basecontest;
