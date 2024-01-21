import { useState } from 'react';

import { chill, jazzy, sleep } from '../../data/songData';
import './styles.scss';
import Player from '../../components/Player';
import { CONSTANTS } from '../../constants/constants';
import { RootState, useAppSelector } from '../../store/store';

const Footer = () => {
    //Retrieve mood data from the Redux Store
    const data = useAppSelector((state: RootState) => state.mood);
    const { moodMode } = data;

    //State to manage the current index of the song being played
    const [currentSongIndex, setCurrentSongIndex] = useState(0);

    return (
        <div className='footer'>
            <div className='song-name'>
                {/* Display the current song name based on the mood mode */}
                {moodMode === 'chill' ? (
                    <span>Song name: {chill[currentSongIndex].name}</span>
                ) : moodMode === 'jazzy' ? (
                    <span>Song name: {jazzy[currentSongIndex].name}</span>
                ) : (
                <span>Song name: {sleep[currentSongIndex].name}</span>


    )}
                
            </div>
        <div className='controller'>
        {/* Render the Player Component with the appropriate song data based on mood mode*/}
        {moodMode === 'chill' ? (
            <Player
            currentSongIndex={currentSongIndex}
            setCurrentSongIndex={setCurrentSongIndex}
            songs={chill}
            />
        ) : moodMode === 'jazzy' ? (
            <Player
            currentSongIndex={currentSongIndex}
            setCurrentSongIndex={setCurrentSongIndex}
            songs={jazzy}
            />
        ): (
            <Player
            currentSongIndex={currentSongIndex}
            setCurrentSongIndex={setCurrentSongIndex}
            songs={sleep}
            />
        )}
        </div>
        <div className='author'>
            Made By: 
            <a
            href={CONSTANTS.AUTHOR_GITHUB_LINK}
            target='_blank'
            rel='noopener noreferrer'
            className='author-name'
            >
            {CONSTANTS.AUTHOR}
            </a>
        </div>
        </div>
        );
        };

        export default Footer;