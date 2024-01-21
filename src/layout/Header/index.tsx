import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeDayNight } from "../../store/slice/modeSlice";
import "./styles.scss";
import { Link } from "react-router-dom";
import DarkLightSwitch from "../../components/DarkLightSwitch";
import { CONSTANTS } from "../../constants/constants";
import { RootState } from "../../store/store";

export interface IDarkLightSwitchProps {
  theme: string;
}

const Header = () => {
  // State for managing fullscreen mode
  const [fullscreen, setFullscreen] = useState(false);

  // Redux hooks to access the global state and dispatch actions
  const daynight = useSelector((state: RootState) => state.mode);
  const dispatch = useDispatch();
  const { mode } = daynight;

  // Function to dispatch the changeDayNight action when the day/night switch is clicked
  const daynightHandler = () => {
    dispatch(changeDayNight());
  };

  // Function to toggle fullscreen mode
  const fullscreenHandler = () => {
    if (!fullscreen) {
      document.documentElement.requestFullscreen();
      setFullscreen(true);
    } else {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };

  return (
    <nav className='wrap'>
      {/* Link to the home page */}
      <Link to='/'>
        <img src='/assets/icons/lofi-logo.gif' alt='' />
      </Link>
      <div className='nav-menu'></div>
      <div className='nav-menu'>
        {/* GitHub link */}
        <a target='_blank' rel='noreferrer' href={CONSTANTS.AUTHOR_GITHUB_LINK}>
          <i className='fab fa-github'></i>
          <span>GitHub</span>
        </a>

        {/* Component for switching between dark and light mode */}
        <div onClick={daynightHandler}>
          <DarkLightSwitch theme={mode} />
        </div>

        {/* Button for toggling fullscreen mode */}
        <button onClick={fullscreenHandler} className='fullscreen-btn'>
          <i className='fas fa-expand fa-lg'></i>
        </button>
      </div>
    </nav>
  );
};

export default Header;
