import { AiFillPauseCircle } from 'react-icons/ai'
import { AiFillPlayCircle } from 'react-icons/ai'
import catchum from '../assets/music/catchum.wav'
import React, { useEffect, useState } from 'react'




export default function Music() {


    function play() {
        new Audio(catchum).play()
    }

    function pause() {
        new Audio(catchum).pause()
    }

    return (
        <>
            <div className="playButton">
                <button onClick={play}>
                    <div><AiFillPauseCircle /></div>
                </button>
            </div>
            <div className="pauseButton">
                <button onClick={pause}>
                    <div><AiFillPlayCircle /></div>
                </button>
            </div>
        </>
    )
}