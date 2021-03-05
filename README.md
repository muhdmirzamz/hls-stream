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

#### Technologies used
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
