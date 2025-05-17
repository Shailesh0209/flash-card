import React from 'react';
import '../styles/ProgressTracker.css';

const ProgressTracker = ({ total, known, unknown }) => {
  const completed = known + unknown;
  const completedPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const knownPercentage = total > 0 ? Math.round((known / total) * 100) : 0;
  const unknownPercentage = total > 0 ? Math.round((unknown / total) * 100) : 0;

  return (
    <div className="progress-tracker">
      <h3>
        {/* Cyberpunk style heading */}
        <span className="progress-header-text">Progress Stats</span>
      </h3>
      <div className="progress-bar-container">
        <div className="progress-bar">
          <div 
            className="progress-known" 
            style={{ width: `${knownPercentage}%` }}
            title={`Known: ${known} cards (${knownPercentage}%)`}
          ></div>
          <div 
            className="progress-unknown" 
            style={{ width: `${unknownPercentage}%` }}
            title={`Unknown: ${unknown} cards (${unknownPercentage}%)`}
          ></div>
        </div>
      </div>
      <div className="progress-stats">
        <div className="stat">
          <span className="stat-value">{completed}/{total}</span>
          <span className="stat-label">Completed</span>
        </div>
        <div className="stat">
          <span className="stat-value">{known}</span>
          <span className="stat-label">Known</span>
        </div>
        <div className="stat">
          <span className="stat-value">{unknown}</span>
          <span className="stat-label">Unknown</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;
