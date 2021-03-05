import React, {useEffect, useState} from 'react'

// import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import ReactHlsPlayer from 'react-hls-player'

function App() {

  const [fileDetected, setFileDetected] = useState(false)

  useEffect(() => {
    axios.get("/video").then(res => {
      console.log("res status: " + res.status)

      // look out for a status 200 to set state variable
      // this will toggle visibility for player
      if (res.status === 200) {
        console.log("res status is 200")

        setFileDetected(true)
      }
    })
  }, [])

  return (
    <div id="video-player" className="App">
      
      {/* only initiate the player when the output file is ready */}
      {/* using a state variable here to toggle visibility */}
      {fileDetected ? 
        <ReactHlsPlayer
          url='videos/output.m3u8'
          autoplay={true}
          controls={true}
          width={640}
          height={480}
          muted="muted"
        />
        : null
      }

    </div>
  );
}

export default App;
