import React from 'react'
import ReactHlsPlayer from 'react-hls-player'

export default function VideoPlayer() {
    return <ReactHlsPlayer
            url='http://localhost:9000/videos/output.m3u8'
            autoplay={false}
            controls={true}
            width={500}
            height={375}
            />
}