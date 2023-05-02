import React, { useState, useEffect } from 'react'
import axios from 'axios'
import defaultImage from '../assets/backgroundImages/dinos_2_by_cleopatrawolf_dfvrbgi.png'


function BackgroundImages({ weatherCode }) {
    const [image, setImage] = useState('')


    const customStyles = {
        textIndent: '100%',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        height: '100vh',
        // width: '130%',

    }

    useEffect(() => {
        if (weatherCode) {
            axios.get(`https://is-it-raining.herokuapp.com/background/?code=${weatherCode}`)
                .then((response) => {
                    setImage(response.data[0].background_image)
                })
        }
    }, [weatherCode])

    return (
        <div className='background-image'>
            <img src={image || defaultImage} alt='corresponding-weather-background' style={customStyles} onError={() => {
                console.log('Error loading image');
                setImage(null)
            }} />
        </div>
    )

}

export default BackgroundImages;