import React, { useState } from 'react';
import '../styles/Flashcard.css';

const Flashcard = ({ card }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      className={`flashcard ${isFlipped ? 'flipped' : ''}`} 
      onClick={handleClick}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
    >
      <div className="flashcard-inner">
        <div className="flashcard-front">
          <div className="content">
            <h2>{card.question}</h2>
          </div>
          <div className="instruction">Click to flip</div>
        </div>
        <div className="flashcard-back">
          <div className="content">
            <p>{card.answer}</p>
          </div>
          <div className="instruction">Click to flip back</div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
