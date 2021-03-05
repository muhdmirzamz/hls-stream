const express = require('express')
const app = express()
const fs = require('fs');
const hls = require('hls-server');

const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');


app.get('/video', (req, res) => {
    ffmpeg.setFfmpegPath(ffmpegInstaller.path);

    var headersSent = false

    // rtsp://admin:As123789@10.168.12.110
    // videos/video.mp4

    // 640x480 5s segments 20s
    // 640x480 3s segments 21s?
    
    // 480x360 5s segments 20s
    // 480x360 3s segments 

    ffmpeg('rtsp://admin:Aa123789@10.168.12.110', { timeout: 432000 }).addOptions([
        '-profile:v baseline',
        '-fflags -nobuffer', // no idea whether this causes lower latency
        '-probesize 32', // no idea whether this causes lower latency
        '-s 480x360',
        '-level 3.0',
        '-start_number 0',
        '-hls_time 2',
        '-hls_list_size 0',
        '-f hls'
    ]).output('videos/output.m3u8')
        .on('end', () => {
            console.log('end');
        })
        .on('progress', function (progress) {
            console.log('Processing: ' + progress.percent + '% done')

            // console.log(__dirname + req.url)
            fs.access("videos/output.m3u8", fs.constants.F_OK, function (err) {
                if (err) {
                    console.log("Processing error")
                    console.log('File not exist');
                } else {
                    // check to see if headers are sent so as to avoid headers being sent again
                    // headers should be sent once
                    if (headersSent === false) {
                        console.log("Processing success")
                        console.log("File exists")
                        // this.fileDetected = true
    
    
                        //file exists
                        console.log("==========")
                        console.log("==========m3u8 file detected==========")
                        console.log("==========")
                        
                        headersSent = true
                        
                        res.sendStatus(200)
                    }
                }
            });
    })
    .run();
});


const server = app.listen(8084);

new hls(server, {
    provider: {
        exists: (req, cb) => {
            const ext = req.url.split('.').pop();

            if (ext !== 'm3u8' && ext !== 'ts') {
                return cb(null, true);
            }

            

            fs.access(__dirname + req.url, fs.constants.F_OK, function (err) {
                if (err) {
                    console.log("HLS error")
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