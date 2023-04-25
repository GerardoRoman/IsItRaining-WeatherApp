import React, { useState, useEffect } from 'react'
import axios from 'axios'

function BackgroundImages({ weatherID }) {
    const [image, setImage] = useState('')

    useEffect(() => {
        if (weatherID) {
            axios.get(`https://is-it-raining.herokuapp.com/background/`) //${weatherID} after 'background?'
            .then((response) => {
                console.log(response) // add mapping 
                setImage(response) // add mapping
            })
        }
    }, [weatherID])

    return(
        <div className='background-image'>
            <img src={image} alt='corresponding-weather-background'></img>
        </div>
    )

}

export default BackgroundImages;