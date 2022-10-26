import {useState, useRef, useEffect} from "react";
import PlayerDetails  from "./PlayerDetails";
import PlayerControls from "./PlayerControls";

const Player = (props) => {
  const audioEl = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  let [currentSong, setCurrentSong] = useState(props.songs[props.currentSongIndex]);

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
        console.log("Index", temp);
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

  const onPlaying = () => {
    const duration = audioEl.current.duration;
    const ct = audioEl.current.currentTime;
    setCurrentSong({...props.songs[props.currentSongIndex], "progress": (ct/duration * 100), "length": duration });

    if (currentSong.progress === 100) {
      skipSong();
    }
  }

  return (
    <div className='c-player'>
      <audio 
        src={currentSong.src}
        onTimeUpdate={onPlaying}
        ref={audioEl}>
      </audio>
      <h4>Playing now</h4>
      {isPlaying ? <span className="now-playing">Now Playing</span> : ""}
      <div className='c-player--container'>
        <PlayerDetails
          isPlaying={isPlaying}
          song={props.songs[props.currentSongIndex]}
        />
        <PlayerControls
          audioEl={audioEl}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          skipSong={skipSong}
          progress={currentSong.progress}
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
        />
        <div className='c-player--cover'><p className="c-player--next"><strong>Next up:</strong> {props.songs[props.nextSongIndex].title} by {props.songs[props.nextSongIndex].artist}</p></div>
      </div>
    </div>
  )
}

export default Player
