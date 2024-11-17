import { useState, useEffect, useRef } from 'react';
import tomatoLogo from '/logo.svg';

const FOCUS_TIME = 25;
const SHORT_BREAK_TIME = 5;
const LONG_BREAK_TIME = 20;

function App() {
  const [status, setStatus] = useState("focus");
  const [timeLeft, setTimeLeft] = useState(FOCUS_TIME * 60);
  const [sessionsLeft, setSessionsLeft] = useState(4);
  const [isRunning, setIsRunning] = useState(false);

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
        // setCompletedSessions((prev) => prev + 1);
        setSessionsLeft((prev) => prev - 1);
  
        if (sessionsLeft > 1) {
          setStatus("short");
          setTimeLeft(SHORT_BREAK_TIME * 60); // short break duration
        } else {
          setStatus("long");
          setTimeLeft(LONG_BREAK_TIME * 60); // long break duration
          setSessionsLeft(4); // resetting the cycle
          // setCompletedSessions(0); // resetting completed sessions
        }
      }
    } else if (status === "short" || status === "long") {
      // switching to a new focus session after a break
      setStatus("focus");
      setTimeLeft(FOCUS_TIME * 60); // focus session duration
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
      setTimeLeft(SHORT_BREAK_TIME * 60); // Short break duration
    } else {
      // switching to focus session after breaks
      setStatus("focus");
      setTimeLeft(FOCUS_TIME * 60); // focus session duration
    }
  };

  const handleReset = () => {
    clearInterval(timerRef.current);
    setStatus("focus");
    setTimeLeft(FOCUS_TIME * 60);
    setSessionsLeft(4);
    setIsRunning(false);
  };

  return (
    <div>
      <div id="header-section">
        <div className="heading">
          <img src={tomatoLogo} className="logo" alt="logo" />
          <h1>Pomodoro Timer</h1> 
        </div>
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
          <p id="session-label" >{`Focus sessions left till next long break: ${sessionsLeft}`}</p>
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

    </div>
  );
}

export default App
