import { useState } from "react";
import "./styles.scss";
import ModifierBoard from "../../components/ModifierBoard";
import RainToggleButton from "../../components/RainToggleButton";
import Footer from "../../layout/Footer";
import { useTimer } from "react-timer-hook";
import { RootState, useAppSelector } from "../../store/store";

const Home = () => {
    //Component state using useState
const [timerStart, setTimerStart] = useState(false);

//Redux state using useAppSelector
const daynight = useAppSelector((state: RootState) => state.mode);
const rain = useAppSelector((state: RootState) => state.rain);

const { mode } = daynight;
const { rainMode } = rain;

const combineMode = `${mode}-${rainMode}`;

//Timer setup using useTimer
const expiryTimestamp = new Date();
expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 0);

const { seconds, minutes, hours, isRunning, pause, resume, restart } = 
useTimer ({
expiryTimestamp,
onExpire: () => setTimerStart(false),
});

//Function to set the timer
const setTimerHandler = (hour: number, minute: number, second: number) => {
    const time = new Date();
    const setupTimer = 
    Number(hour) * 3600 + Number(second) + Number(minute) * 60;
    time.setSeconds(time.getSeconds() + setupTimer);
    restart(time);
};

//JSX Structure

return (
    <>
      {/* Embedded the background video base on each state */}
      {/* Night */}
      <video
        className={combineMode === "night-clear" ? "videoIn" : "videoOut"}
        autoPlay
        loop
        muted
      >
        <source src='/assets/video/Night-clear.mp4' type='video/mp4' />
      </video>
      <video
        className={combineMode === "night-rain" ? "videoIn" : "videoOut"}
        autoPlay
        loop
        muted
      >
        <source src='/assets/video/Night-rainny.mp4' type='video/mp4' />
      </video>
      {/* Day */}
      <video
        className={combineMode === "day-clear" ? "videoIn" : "videoOut"}
        autoPlay
        loop
        muted
      >
        <source src='/assets/video/Day-sunny.mp4' type='video/mp4' />
      </video>
      <video
        className={combineMode === "day-rain" ? "videoIn" : "videoOut"}
        autoPlay
        loop
        muted
      >
        <source src='/assets/video/Day-rainny.mp4' type='video/mp4' />
      </video>
    <RainToggleButton/>
    <ModifierBoard
    seconds={seconds}
    minutes={minutes}
    hours={hours}
    isRunning={isRunning}
    pause={pause}
    resume={resume}
    restart={restart}
    setTimerHandler={setTimerHandler}
    setTimerStart={setTimerStart}
    timerStart={timerStart}
    />
    <Footer/>
    </>
);
};

export default Home;