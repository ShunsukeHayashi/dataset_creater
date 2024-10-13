import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../context/AppContext';

const ApiResponse: React.FC = () => {
  const { apiResponse } = useAppContext();
  const [displayedText, setDisplayedText] = useState('');
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const responseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!apiResponse) {
      setDisplayedText('');
      setCurrentPairIndex(0);
      return;
    }

    const pairs = apiResponse.split('\n\n');
    if (currentPairIndex < pairs.length) {
      const currentPair = pairs[currentPairIndex];
      let charIndex = 0;

      const typingInterval = setInterval(() => {
        if (charIndex < currentPair.length) {
          setDisplayedText(prev => prev + currentPair[charIndex]);
          charIndex++;
        } else {
          clearInterval(typingInterval);
          setTimeout(() => {
            setCurrentPairIndex(prev => prev + 1);
            setDisplayedText(prev => prev + '\n\n');
          }, 500); // Pause before next pair
        }
      }, 20); // Adjust typing speed here

      return () => clearInterval(typingInterval);
    }
  }, [apiResponse, currentPairIndex]);

  useEffect(() => {
    if (responseRef.current) {
      responseRef.current.scrollTop = responseRef.current.scrollHeight;
    }
  }, [displayedText]);

  if (!apiResponse) {
    return null;
  }

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">API Response (Realtime)</h2>
      <div
        ref={responseRef}
        className="bg-gray-100 p-4 rounded-md overflow-x-auto h-64 overflow-y-auto whitespace-pre-wrap font-mono"
      >
        {displayedText}
        <span className="animate-pulse">|</span>
      </div>
    </div>
  );
};

export default ApiResponse;