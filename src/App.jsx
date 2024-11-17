import { useState, useEffect, useRef } from 'react';
import tomatoLogo from '/logo.svg';
import settingsIcon from '/settings.svg';
import Modal from './Modal.jsx'

function App() {
  const [status, setStatus] = useState("focus");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [sessionsLeft, setSessionsLeft] = useState(4);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [focusTime, setFocusTime] = useState(25);
  const [shortBreakTime, setShortBreakTime] = useState(5);
  const [longBreakTime, setLongBreakTime] = useState(20);

  const timerRef = useRef(null);
  const bellRef = useRef(null);

  useEffect(() => {
    bellRef.current = new Audio("/bell.mp3");
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor =
      status === "focus"
        ? "#EB5252"
        : status === "short"
        ? "#3B4CA8"
        : "#00b86f";

    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    if (timeLeft === 0) {
      clearInterval(timerRef.current);
      playBellSound();
      handleNextSession();
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning, timeLeft, status]);

  const playBellSound = () => {
    if (bellRef.current) {
      bellRef.current.play().catch((error) => {
        console.error("Error playing bell sound:", error);
      });
    }
  };

  const handleNextSession = () => {
    if (status === "focus") {
      if (timeLeft === 0) {
        // focus session ends without skips
        setCompletedSessions((prev) => prev + 1);
        setSessionsLeft((prev) => prev - 1);
  
        if (sessionsLeft > 1) {
          setStatus("short");
          setTimeLeft(5 * 60); // short break duration
        } else {
          setStatus("long");
          setTimeLeft(20 * 60); // long break duration
          setSessionsLeft(4); // resetting the cycle
          setCompletedSessions(0); // resetting completed sessions
        }
      }
    } else if (status === "short" || status === "long") {
      // switching to a new focus session after a break
      setStatus("focus");
      setTimeLeft(25 * 60); // focus session duration
    }
  };

  const handlePauseContinue = () => {
    setIsRunning((prev) => !prev);
  };

  const handleSkip = () => {
    clearInterval(timerRef.current);
    playBellSound();
  
    if (status === "focus") {
      // skipping to a short break without decrementing sessionsLeft
      setStatus("short");
      setTimeLeft(5 * 60); // Short break duration
    } else {
      // switching to focus session after breaks
      setStatus("focus");
      setTimeLeft(25 * 60); // focus session duration
    }
  };

  const handleReset = () => {
    clearInterval(timerRef.current);
    setStatus("focus");
    setTimeLeft(focusTime * 60);
    setSessionsLeft(4);
    setIsRunning(false);
  };

  const handleSaveSettings = () => {
    setTimeLeft(focusTime * 60); // updating timer with new focus time
    setIsModalOpen(false);
    handleReset(); // resetting the app with new settings
  };

  return (
    <div>
      <div id="header-section">

        <div className="heading">
          <img src={tomatoLogo} className="logo" alt="settings icon" />
          <h1>Pomodoro Timer</h1> 
        </div>

        <button onClick={() => setIsModalOpen(true)} id="settings-btn">
          <img src={settingsIcon} className="icon" alt="settings icon" />
        </button>

      </div>

      <div id="body-section">

        <div className={`${status}2 timer-section`}>
          <p id="timer-label" >
            {status === "focus"
              ? "Focus Session"
              : status === "short"
              ? "Short Break"
              : "Long Break"
            }
          </p>
          <p id="time-left">
          {`${String(Math.floor(timeLeft / 60)).padStart(2, "0")}:${String(
            timeLeft % 60
            ).padStart(2, "0")}`
          }
          </p>
          <p id="session-label" >{`focus sessions left till long break: ${sessionsLeft}`}</p>
          <button 
            id="start_stop" 
            className={`${status}1 buttons btn`}
            onClick={handlePauseContinue}
          >
            {isRunning ? "pause timer" : "start timer"}
          </button>
        </div>

        <div id="btn-section">
          <button 
            id="reset" 
            className={`${status}2 buttons btn`}
            onClick={handleReset}
          >
            reset
          </button>
          <button 
            id="skip" 
            className={`${status}2 buttons btn`}
            onClick={handleSkip}
          >
            skip
          </button>
        </div>

      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Settings</h2>        
        <p>Time durations are in minutes</p>
        <div className="settings-form">
          
          <label htmlFor="focus-time" className="settings-label">Pomodoro Length :</label>
          <input 
            id="focus-time" 
            type="number" 
            className="settings-input" 
            value={focusTime}
            onChange={(e) => setFocusTime(+e.target.value)}
            min={1}
          />

          <label htmlFor="short-break" className="settings-label">Short Break Length :</label>
          <input 
            id="short-break" 
            type="number" 
            className="settings-input" 
            value={shortBreakTime}
            onChange={(e) => setShortBreakTime(+e.target.value)}
            min={1}
          />

          <label htmlFor="long-break" className="settings-label">Long Break Length :</label>
          <input 
            id="long-break" 
            type="number" 
            className="settings-input" 
            value={longBreakTime}
            onChange={(e) => setLongBreakTime(+e.target.value)}
            min={1}
          />

          <label htmlFor="cycles" className="settings-label">Number of Pomodoros per Cycle :</label>
          <input 
            id="cycles" 
            type="number" 
            className="settings-input" 
            value={sessionsLeft}
            onChange={(e) => setSessionsLeft(+e.target.value)}
            min={1}
          />
        
        </div>
        <button className="modal-btns btn" onClick={handleSaveSettings}>
          save
        </button>
        <button className="modal-btns btn" onClick={handleReset}>
          reset
        </button>
      </Modal>

    </div>
  );
}

export default App
