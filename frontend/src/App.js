import React, {useEffect} from 'react'
import ReactDOM from 'react-dom';

import logo from './logo.svg';
import './App.css';
import axios from 'axios';

// import ReactHlsPlayer from 'react-hls-player'

function App() {

  
  // <div dangerouslySetInnerHTML={{__html: this.html}}/>

  useEffect(() => {
      axios.get("/video").then(response => {

        console.log(response)

        ReactDOM.render(React.createElement("div", {dangerouslySetInnerHTML: {__html: response.data}}), document.getElementById('video-player'))
      })
    
  }, []);

  return (
    <div id="video-player" className="App">
      
      
      {/* <video id="video" width="500" height="500" controls></video> */}
        {/* <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
        <script>
            const video = document.getElementById('video');
            const videoSrc = '/videos/output.m3u8';

            if (Hls.isSupported()) {
                const hls = new Hls();

                hls.loadSource(videoSrc);
                hls.attachMedia(video);
                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    video.play();
                });
            } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                video.src = videoSrc;
                video.addEventListener('loadedmetadata', () => {
                    video.play();
                });
            }
        </script> */}
    </div>
  );
}

export default App;
