const express = require('express')
const app = express()
const fs = require('fs');
const hls = require('hls-server');

const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');


app.get('/video', (req, res) => {
    ffmpeg.setFfmpegPath(ffmpegInstaller.path);

    var headersSent = false

    // for rtsp
    // rtsp://username:password@ip_address

    // for mp4

    ffmpeg('videos/video.mp4', { timeout: 432000 }).addOptions([
        '-profile:v baseline',
        '-fflags -nobuffer', // no idea whether this causes lower latency
        '-probesize 32', // no idea whether this causes lower latency
        '-s 480x360', // resolution (scale)
        '-level 3.0', 
        '-start_number 0',
        '-hls_time 2', // length of each segment (2s in this case)
        '-hls_list_size 0',
        '-f hls' // format to hls
    ]).output('videos/output.m3u8') // output.m3u8 will be in a directory called "videos"
        .on('end', () => {
            console.log('end');
        })
        .on('progress', function (progress) {

            // while ffmpeg is converting and processing the files
            // check to see if the .m3u8 file has been created
            // we need it for the video player to play something
            console.log('Processing: ' + progress.percent + '% done')

            // check if the file exists
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

    
                        //file exists
                        console.log("==========")
                        console.log("==========m3u8 file detected==========")
                        console.log("==========")
                        
                        headersSent = true
                        
                        // when the .m3u8 file has been created
                        // send a response to your frontend so that the player can be initialised and shown
                        res.sendStatus(200) 
                    }
                }
            });
    })
    .run();
});


// we are using a proxy, so make sure the port number corresponds to your frontend's package.json proxy attribute
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