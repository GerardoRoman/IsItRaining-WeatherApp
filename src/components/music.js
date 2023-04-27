import { AiFillPauseCircle } from 'react-icons/ai'
import { AiFillPlayCircle } from 'react-icons/ai'
import catchum from '../assets/music/catchum.wav'
import silence from '../assets/music/silence.mp3'
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
            <button onClick={play}>
                <div><AiFillPauseCircle /></div>
            </button>
            <button onClick={pause}>
                <div><AiFillPlayCircle /></div>
            </button>
        </>
    )
}