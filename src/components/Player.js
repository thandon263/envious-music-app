import {useState, useRef, useEffect} from "react";
import PlayerDetails  from "./PlayerDetails";
import PlayerControls from "./PlayerControls";

const Player = (props) => {
  const audioEl = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      audioEl.current.play();
    } else {
      audioEl.current.pause();
    }
  });

  const skipSong = (forwards = true) => {
    if (forwards) {
      props.setCurrentSongIndex(() => {
        let temp = props.currentSongIndex;
        temp++;

        if (temp > props.songs.length - 1) {
          temp = 0;
        }

        return temp;
      });
    } else {
      props.setCurrentSongIndex(() => {
        let temp = props.currentSongIndex;
        temp--;

        if (temp < 0) {
          temp = props.songs.length - 1;
        }

        return temp;
      });
    }
  }

  return (
    <div className='c-player'>
      <audio src={props.songs[props.currentSongIndex].src} ref={audioEl}></audio>
      <h4>Playing now</h4>
      <div className='c-player--container'>
        <PlayerDetails
          isPlaying={isPlaying}
          song={props.songs[props.currentSongIndex]}
        />
        <PlayerControls 
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          skipSong={skipSong}
        />
        <div className='c-player--cover'><p className="c-player--next"><strong>Next up:</strong> {props.songs[props.nextSongIndex].title} by {props.songs[props.nextSongIndex].artist}</p></div>
      </div>
    </div>
  )
}

export default Player
