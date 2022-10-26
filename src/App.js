import {useState, useEffect} from "react";
import Player from "./components/Player";

function App() {
  const [songs] = useState([
    {
      title: "Forget me too ft. Halsey",
      artist: "Machine Gun Kelly",
      img_src: "./images/song-1.jpg",
      src: "./music/on-n-on.mp3"
    }, 
    {
      title: "Chill-out Acid Squeeze Mix",
      artist: "Spy vs. Spy",
      img_src: "https://i1.sndcdn.com/artworks-gwPCo3ZJkdz5evlr-KGPoPQ-t500x500.jpg",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
    }, 
    {
      title: "One Last Cry",
      artist: "Az Yet",
      img_src: "https://cdn.imusic.am/images/artist/big/17271/1326264817/cover.jpg",
      src: "./music/One-Last-Cry.mp3"
    },
    {
      title: "Oceans Accapella (Cover)",
      artist: "Effect Vocal Band",
      img_src: "https://i0.wp.com/i-ronny.com/wp-content/uploads/2020/12/Effect-Xmas-Carols-2020.jpg?resize=500%2C500&ssl=1",
      src: "./music/Oceans-Master.mp3"
    }
  ]);

  let [currentSongIndex, setCurrentSongIndex] = useState(0);
  let [nextSongIndex, setNextSongIndex] = useState(currentSongIndex + 1);

  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 360px)").matches
  );

  useEffect(() => {
    window
    .matchMedia("(min-width: 360px)")
    .addEventListener('change', e => setMatches( e.matches ));

    setNextSongIndex(() => {
      if (currentSongIndex + 1 > songs.length - 1) {
        return 0;
      } else {
        return currentSongIndex + 1;
      }
    });

}, [currentSongIndex, songs]);

  return (
    <div className="App">
     {matches && <Player
        currentSongIndex={currentSongIndex}
        setCurrentSongIndex={setCurrentSongIndex}
        nextSongIndex={nextSongIndex}
        songs={songs}
      />}
      {!matches && <div className="not-supported">Oop! Device not supported yet.</div>}
    </div>
  );
}

export default App;
