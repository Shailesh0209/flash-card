import React from 'react';
import '../styles/NavigationControls.css';

const NavigationControls = ({ 
  currentIndex, 
  totalCards, 
  onPrev, 
  onNext, 
  onKnow, 
  onDontKnow 
}) => {
  return (
    <div className="navigation-controls">
      <div className="nav-buttons">
        <button 
          className="cyberpunk-btn nav-btn" 
          onClick={onPrev} 
          disabled={currentIndex === 0}
          aria-label="Previous card"
        >
          <span className="btn-content">Prev</span>
        </button>
        <span className="card-counter">{currentIndex + 1} / {totalCards}</span>
        <button 
          className="cyberpunk-btn nav-btn" 
          onClick={onNext} 
          disabled={currentIndex === totalCards - 1}
          aria-label="Next card"
        >
          <span className="btn-content">Next</span>
        </button>
      </div>
      <div className="feedback-buttons">
        <button 
          className="feedback-btn know" 
          onClick={onKnow}
          aria-label="I know this"
        >
          <span className="btn-glow"></span>
          <span>I Know This</span>
        </button>
        <button 
          className="feedback-btn dont-know" 
          onClick={onDontKnow}
          aria-label="Don't know"
        >
          <span className="btn-glow"></span>
          <span>Don't Know</span>
        </button>
      </div>
    </div>
  );
};

export default NavigationControls;
