import React from 'react';

export default function Progress({ progress }) {
  return (
    <div className="pixel-music-progress">
      <div
        className="pixel-music-progress-bar"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
