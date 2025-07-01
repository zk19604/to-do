import React, { useState, useEffect } from "react";

export default function Pomodoro() {
  const [work, setWork] = useState(25);
  const [shortbreak, setShortbreak] = useState(5);
  const [longbreak, setLongbreak] = useState(15);
  const [showSettings, setShowSettings] = useState(false);
  const [start, setStart] = useState(false);
  const [mode, setMode] = useState(1); // 1: work, 2: short break, 3: long break
  const [time, setTime] = useState(work * 60);
  const [sessions, setSessions] = useState(0);

  // Update time when mode or durations change
  useEffect(() => {
    if (mode === 1) setTime(work * 60);
    else if (mode === 2) setTime(shortbreak * 60);
    else if (mode === 3) setTime(longbreak * 60);
  }, [mode, work, shortbreak, longbreak]);

  // Countdown timer
  useEffect(() => {
    if (!start || time <= 0) return;

    const intervalId = setInterval(() => {
      setTime(prev => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [start, time]);

  
  useEffect(() => {
    if (time !== 0) return;

    setStart(false); 

    if (mode === 1) {
      setSessions(prev => {
        const next = prev + 1;
        if (next % 4 === 0) {
          setMode(3); 
        } else {
          setMode(2); 
        }
        return next;
      });
    } 
    else if (mode === 2 || mode === 3) {
      setMode(1); 
    }
  }, [time]);

  const handleStart = () => setStart(true);
  const formatTime = (seconds) =>
    `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

  return (
    <div>
      <h1>Pomodoro</h1>
      <button onClick={() => setShowSettings(!showSettings)}>Settings</button>

      {showSettings && (
        <div>
          <input type="number" min ="0" value={work} onChange={(e) => setWork(Number(e.target.value))} />
          <input type="number" min ="0" value={shortbreak} onChange={(e) => setShortbreak(Number(e.target.value))} />
          <input type="number" min ="0" value={longbreak} onChange={(e) => setLongbreak(Number(e.target.value))} />
          <button onClick={() => setShowSettings(false)}>Save</button>
        </div>
      )}

      <button onClick={() => setMode(1)}>Work</button>
      <button onClick={() => setMode(2)}>Short Break</button>
      <button onClick={() => setMode(3)}>Long Break</button>

      {mode === 1 && <div>Work</div>}
      {mode === 2 && <div>Short Break</div>}
      {mode === 3 && <div>Long Break</div>}

      <div>
        <span>{formatTime(time)}</span>
      </div>
      <div>
        <button onClick={handleStart} disabled={start}>Start</button>
        <button onClick={() => setStart(false)} disabled={!start}>Stop</button>
      </div>
    </div>
  );
}
