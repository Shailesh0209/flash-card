import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';
import '../styles/Celebration.css';

const Celebration = ({ show, onComplete }) => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    // Auto-hide celebration after 6 seconds
    let timer;
    if (show) {
      timer = setTimeout(() => {
        onComplete();
      }, 6000);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, [show, onComplete]);

  if (!show) return null;

  return (
    <div className="celebration-overlay">
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        recycle={false}
        numberOfPieces={300}
        gravity={0.15}
      />
      
      <motion.div 
        className="celebration-modal"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.h2 
          animate={{
            scale: [1, 1.1, 1],
            color: ["#4f46e5", "#10b981", "#4f46e5"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          🎉 Great Job! 🎉
        </motion.h2>
        <p>You've completed all the flashcards!</p>
        
        <div className="stats-box">
          <div className="stat-item">
            <div className="stat-value">100%</div>
            <div className="stat-label">Complete</div>
          </div>
        </div>
        
        <button className="continue-btn" onClick={onComplete}>
          Continue
        </button>
      </motion.div>
    </div>
  );
};

export default Celebration;
