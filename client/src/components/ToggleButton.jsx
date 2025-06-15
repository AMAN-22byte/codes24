import { useState } from 'react';

const ToggleButton = () => {
  const [active, setActive] = useState('host'); 

  return (
    <div className="inline-flex p-1 border-2 ml-10 mt-2 border-purple-400 rounded-full bg-white">
      <button
        className={`px-10 py-2 rounded-full transition-all duration-300 ${
          active === 'renter' ? 'bg-purple-400 text-white' : 'text-purple-500'
        }`}
        onClick={() => setActive('renter')}
      >
        Renter
      </button>
      <button
        className={`px-10 py-2 rounded-full transition-all duration-300 ${
          active === 'host' ? 'bg-purple-400 text-white' : 'text-purple-500'
        }`}
        onClick={() => setActive('host')}
      >
        Host
      </button>
    </div>
  );
};

export default ToggleButton;
