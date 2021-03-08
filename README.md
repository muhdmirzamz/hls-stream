# HLS Stream

A sample project to convert RTSP to HLS and stream it to React frontend via ExpressJS.

### INSTALL

#### backend

```cd backend```

```npm install```

#### frontend
```cd frontend```

```npm install```

### HOW TO RUN

#### backend
```node app.js```

#### frontend
```npm start```

Make sure there's something to convert. Put the video file into the "videos" folder in your backend. If there is no "videos" folder, create one. So the "videos" folder should be in backend/videos. Your video should be in backend/videos/video.mp4

### `React Router` use case

If you are using `React Router` and your router base name is not `'/'` and is something like `<Router basename = '/main'>`, here is what you do.

#### Client side

``` javascript
axios.get("/main/video").then(res => {
  console.log("res status: " + res.status)

  if (res.status === 200) {
    console.log("res status is 200")

    setFileDetected(true)
  }
})
```

``` javascript
{fileDetected ? 
    <ReactHlsPlayer
        url='videos/output.m3u8'
        autoplay={true}
        controls={true}
        width={640}
        height={480}
        muted="muted"
        className={classes.videoFeed}
    /> : 
    <video controls className={classes.videoFeed}>
    {/* currently uses express js for video streaming */}
    {/* <source src="http://localhost:9000/video_stream" type="video/mp4"></source> */}

    Sorry, your browser doesn't support embedded videos.
    </video>
}
```

#### Server side
``` javascript
app.get('/main/video', (req, res) => {})
```

``` javascript
ffmpeg('main/videos/video_name.mp4', { timeout: 432000 }).addOptions([

]).output('main/videos/output.m3u8')
```

As you can see, everything is prefixed by the router's base name except for the `ReactHlsPlayer`'s url property.

If it is an endpoint, include the base name. 

If it is a file path, do not include. But, make sure there is a folder with the base name in your backend.


### Technologies used
- React
- Express JS
- [hls-server](https://www.npmjs.com/package/hls-server)
- [fluent-ffmpeg](https://www.npmjs.com/package/fluent-ffmpeg)
- [@ffmpeg-installer/ffmpeg](https://www.npmjs.com/package/@ffmpeg-installer/ffmpeg)
- [axios](https://www.npmjs.com/package/axios)
- [react-hls-player](https://www.npmjs.com/package/react-hls-player)

**Note**
- Check the ```ffmpeg``` function in ```app.js``` to make sure you are converting the right file/folder. 
- This project does not currently delete the ```.ts``` files.
- This project uses a proxy attribute in the ```package.json``` file, it does not use CORS. 
