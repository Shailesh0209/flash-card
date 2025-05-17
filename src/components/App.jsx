import React, { useState, useEffect } from 'react';
import Flashcard from './Flashcard';
import NavigationControls from './NavigationControls';
import ProgressTracker from './ProgressTracker';
import { flashcards } from '../data/flashcardData';
import useLocalStorage from '../hooks/useLocalStorage';
import '../styles/App.css';

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useLocalStorage('flashcard-progress', {
    known: [],
    unknown: []
  });
  const [animation, setAnimation] = useState('');
  
  const handlePrev = () => {
    if (currentIndex > 0) {
      setAnimation('slide-right');
      setTimeout(() => {
        setCurrentIndex(currentIndex - 1);
        setAnimation('');
      }, 200);
    }
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setAnimation('slide-left');
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setAnimation('');
      }, 200);
    }
  };

  const handleKnow = () => {
    const cardId = flashcards[currentIndex].id;
    
    setProgress(prev => {
      // Remove from unknown if it was there
      const newUnknown = prev.unknown.filter(id => id !== cardId);
      
      // Add to known if not already there
      const newKnown = prev.known.includes(cardId) 
        ? prev.known 
        : [...prev.known, cardId];
        
      return {
        known: newKnown,
        unknown: newUnknown
      };
    });
    
    // Move to next card if not at the end
    if (currentIndex < flashcards.length - 1) {
      handleNext();
    }
  };

  const handleDontKnow = () => {
    const cardId = flashcards[currentIndex].id;
    
    setProgress(prev => {
      // Remove from known if it was there
      const newKnown = prev.known.filter(id => id !== cardId);
      
      // Add to unknown if not already there
      const newUnknown = prev.unknown.includes(cardId) 
        ? prev.unknown 
        : [...prev.unknown, cardId];
        
      return {
        known: newKnown,
        unknown: newUnknown
      };
    });
    
    // Move to next card if not at the end
    if (currentIndex < flashcards.length - 1) {
      handleNext();
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex]);

  return (
    <div className="app">
      <header>
        <h1 className="title-gradient">Vibe Flashcards</h1>
        <p className="neon-text">Level up your learning with this cyberpunk study tool</p>
      </header>

      {/* 3D cubes decoration */}
      <div className="cube-decoration top-left"></div>
      <div className="cube-decoration bottom-right"></div>

      <div className="app-container holographic">
        <div className={`flashcard-container ${animation}`}>
          <Flashcard card={flashcards[currentIndex]} />
        </div>

        <NavigationControls
          currentIndex={currentIndex}
          totalCards={flashcards.length}
          onPrev={handlePrev}
          onNext={handleNext}
          onKnow={handleKnow}
          onDontKnow={handleDontKnow}
        />

        <ProgressTracker
          total={flashcards.length}
          known={progress.known.length}
          unknown={progress.unknown.length}
        />
      </div>
    </div>
  );
}

export default App;
