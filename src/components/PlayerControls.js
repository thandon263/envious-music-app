import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay, faPause, faForward, faBackward } from "@fortawesome/free-solid-svg-icons";

const PlayerControls = (props) => {

  const clickRef = useRef();

  const checkWidth = (e) => {
    let width = clickRef.current.clientWidth;
    const offset = e.nativeEvent.offsetX;
    const divProgress = offset / width * 100;
    props.audioEl.current.currentTime = divProgress / 100 * props.currentSong.length;
  }

  return (
    <div className="controls">
      <div className="progress-bar">
        <div className="progress-bar--wrapper" onClick={checkWidth} ref={clickRef}>
          <div className="seek-bar" style={{ width: `${props.progress}%`}}></div>
        </div>
      </div>
      <div className="c-player--controls">
        <button className="skip-btn" onClick={() => props.skipSong(false)}>
          <FontAwesomeIcon icon={faBackward} />
        </button>
        <button className="play-btn" onClick={() => props.setIsPlaying(!props.isPlaying)}>
          <FontAwesomeIcon icon={props.isPlaying ? faPause : faPlay} />
        </button>
        <button className="skip-btn">
          <FontAwesomeIcon icon={faForward} onClick={() => props.skipSong()}/>
        </button>
      </div>
    </div>
  )
}

export default PlayerControls
