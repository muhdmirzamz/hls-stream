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

      if (res.status === 200) {
        console.log("res status is 200")

        setFileDetected(true)
      }
    })
  }, [])

  return (
    <div id="video-player" className="App">
      
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
