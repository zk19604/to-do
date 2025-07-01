import React, { useRef, useState, useEffect } from "react";

const pixelIcons = {
  play: (
    <svg width="24" height="24" viewBox="0 0 24 24" style={{imageRendering:'pixelated'}}><rect x="2" y="2" width="20" height="20" fill="#7a8fff" stroke="#1E4BA5" strokeWidth="2"/><polygon points="8,6 18,12 8,18" fill="#fff" stroke="#1E4BA5" strokeWidth="1"/></svg>
  ),
  pause: (
    <svg width="24" height="24" viewBox="0 0 24 24" style={{imageRendering:'pixelated'}}><rect x="2" y="2" width="20" height="20" fill="#7a8fff" stroke="#1E4BA5" strokeWidth="2"/><rect x="7" y="7" width="3" height="10" fill="#fff" stroke="#1E4BA5" strokeWidth="1"/><rect x="14" y="7" width="3" height="10" fill="#fff" stroke="#1E4BA5" strokeWidth="1"/></svg>
  ),
  rewind: (
    <svg width="24" height="24" viewBox="0 0 24 24" style={{imageRendering:'pixelated'}}><rect x="2" y="2" width="20" height="20" fill="#7a8fff" stroke="#1E4BA5" strokeWidth="2"/><polygon points="16,7 9,12 16,17" fill="#fff" stroke="#1E4BA5" strokeWidth="1"/><rect x="6" y="7" width="2" height="10" fill="#fff" stroke="#1E4BA5" strokeWidth="1"/></svg>
  ),
  forward: (
    <svg width="24" height="24" viewBox="0 0 24 24" style={{imageRendering:'pixelated'}}><rect x="2" y="2" width="20" height="20" fill="#7a8fff" stroke="#1E4BA5" strokeWidth="2"/><polygon points="8,7 15,12 8,17" fill="#fff" stroke="#1E4BA5" strokeWidth="1"/><rect x="16" y="7" width="2" height="10" fill="#fff" stroke="#1E4BA5" strokeWidth="1"/></svg>
  ),
};

export default function Lofi() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const updateProgress = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration || 0);
    };
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', updateProgress);
    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', updateProgress);
    };
  }, []);

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
      audioRef.current.currentTime += 10;
    }
  };

  const handleRewind = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 10;
    }
  };

  const formatTime = (s) => {
    if (!s || isNaN(s)) return "00:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="pixel-music-frame">
      <div className="pixel-music-display">
        <h2>MUSIC</h2>
      </div>
      <div className="pixel-music-controls">
        <button className="pixel-music-btn" onClick={handleRewind} title="Rewind">{pixelIcons.rewind}</button>
        <button className="pixel-music-btn" onClick={togglePlay} title="Play/Pause">{isPlaying ? pixelIcons.pause : pixelIcons.play}</button>
        <button className="pixel-music-btn" onClick={handleForward} title="Forward">{pixelIcons.forward}</button>
      </div>
      <div className="pixel-music-progress">
        <div className="pixel-music-progress-bar" style={{width: duration ? `${(progress/duration)*100}%` : '0%'}}></div>
      </div>
      <div className="pixel-music-time">
        <span>{formatTime(progress)}</span> / <span>{formatTime(duration)}</span>
      </div>
      <audio ref={audioRef} src="/sounds/lofi.mp3" loop />
    </div>
  );
}
