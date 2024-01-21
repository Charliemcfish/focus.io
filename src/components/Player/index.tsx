import { useState, useRef, useEffect } from "react";
import "./styles.scss";
import { RootState, useAppSelector } from "../../store/store";

export interface IPlayerProps {
  currentSongIndex: number;
  setCurrentSongIndex: any;
  songs: any;
}

const Player = ({
  currentSongIndex,
  setCurrentSongIndex,
  songs,
}: IPlayerProps) => {
  // Access the volume state from the Redux store
  const data = useAppSelector((state: RootState) => state.volume);
  const { volumeValue } = data;

  // Create a reference to the audio element for controlling playback
  const audioElement = useRef<any>();
  
  // State to track whether the song is currently playing
  const [isPlaying, setIsPlaying] = useState(false);

  // useEffect hook to handle audio playback and volume changes
  useEffect(() => {
    // Check if the song is playing
    if (isPlaying) {
      audioElement.current.play();
    } else {
      audioElement.current.pause();
    }

    // Set the volume based on the state value
    audioElement.current.volume = volumeValue / 100;
  });

  // Function to skip to the next or previous song
  const SkipSong = (forwards = true) => {
    if (forwards) {
      setCurrentSongIndex(() => {
        let temp = currentSongIndex;
        temp++;

        // Loop to the first song if reached the end
        if (temp > songs.length - 1) {
          temp = 0;
        }

        return temp;
      });
    } else {
      setCurrentSongIndex(() => {
        let temp = currentSongIndex;
        temp--;

        // Loop to the last song if reached the beginning
        if (temp < 0) {
          temp = songs.length - 1;
        }

        return temp;
      });
    }
  };

  return (
    <div className="music-player">
      {/* Audio element for playing the song */}
      <audio loop src={songs[currentSongIndex].src} ref={audioElement}></audio>
      <div className="music-player--controls">
        {/* Button to skip to the previous song */}
        <button className="skip-btn" onClick={() => SkipSong(false)}>
          <img src="/assets/icons/prev.svg" alt="" />
        </button>
        {/* Button to play/pause the current song */}
        <button className="play-btn" onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? (
            <img src="/assets/icons/pause.svg" alt="" />
          ) : (
            <img src="/assets/icons/play.svg" alt="" />
          )}
        </button>
        {/* Button to skip to the next song */}
        <button className="skip-btn" onClick={() => SkipSong()}>
          <img src="/assets/icons/next.svg" alt="" />
        </button>
      </div>
    </div>
  );
};

export default Player;
