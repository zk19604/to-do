import React, { useRef, useState } from "react";

export default function Lofi() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 10; // skip forward 10 seconds
    }
  };

  const handleRewind = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 10; // rewind 10 seconds
    }
  };

  return (
    <div className="flex gap-4 items-center">
     <h2>MUSIC</h2> 
      <button onClick={handleRewind}>⏪</button>
      <button onClick={togglePlay}>
        {isPlaying ? "⏸️" : "▶️"}
      </button>
      <button onClick={handleForward}>⏩</button>

      {/* Hidden audio element */}
      <audio ref={audioRef} src="/sounds/lofi.mp3" loop />
    </div>
  );
}
