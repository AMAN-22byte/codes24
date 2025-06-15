import React, { useEffect, useState, useRef } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

const formatTime = (seconds) => {
  const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
};

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isActive]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setSeconds(0);
    setIsActive(false);
  };

  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-white border rounded-xl shadow-sm text-gray-800">
      <span className="text-lg font-mono font-semibold">{formatTime(seconds)}</span>
      <button
        onClick={toggleTimer}
        className="text-gray-600 hover:text-blue-600 transition-colors"
        title={isActive ? "Pause" : "Start"}
      >
        {isActive ? <Pause size={20} /> : <Play size={20} />}
      </button>
      <button
        onClick={resetTimer}
        className="text-gray-600 hover:text-red-500 transition-colors"
        title="Reset"
      >
        <RotateCcw size={20} />
      </button>
    </div>
  );
};

export default Timer;
