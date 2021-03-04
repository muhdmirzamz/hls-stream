const app = require('express')();
const fs = require('fs');
const hls = require('hls-server');

app.get('/video', (req, res) => {
    // res.type('.js');
    // return res.status(200).sendFile(`${__dirname}/video_player.js`);
    const html = `
    <video id="video" width="500" height="500" controls></video>
    <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
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
    </script>
    `
    return res.status(200).send(html);
});

const server = app.listen(9000);

new hls(server, {
    provider: {
        exists: (req, cb) => {
            const ext = req.url.split('.').pop();

            if (ext !== 'm3u8' && ext !== 'ts') {
                return cb(null, true);
            }

            fs.access(__dirname + req.url, fs.constants.F_OK, function (err) {
                if (err) {
                    console.log('File not exist');
                    return cb(null, false);
                }
                cb(null, true);
            });
        },
        getManifestStream: (req, cb) => {
            const stream = fs.createReadStream(__dirname + req.url);
            cb(null, stream);
        },
        getSegmentStream: (req, cb) => {
            const stream = fs.createReadStream(__dirname + req.url);
            cb(null, stream);
        }
    }
});