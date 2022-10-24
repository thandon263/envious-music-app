import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay, faPause, faForward, faBackward } from "@fortawesome/free-solid-svg-icons";

const PlayerControls = (props) => {
  return (
    <div className="controls">
      <progress className="progress-bar"></progress>
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
