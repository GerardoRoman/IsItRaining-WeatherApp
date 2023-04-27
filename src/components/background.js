import React, { useState, useEffect } from 'react'
import axios from 'axios'

function BackgroundImages({ weatherCode }) {
    const [image, setImage] = useState('')

    useEffect(() => {
            axios.get(`https://is-it-raining.herokuapp.com/background/?code=${weatherCode}`) 
                .then((response) => {
                    setImage(response.data[0].background_image) // add mapping
                    console.log(response.data.background_image)
                })
    }, [weatherCode])

    return (
        <div className='background-image'>
            <img src={image} alt='corresponding-weather-background' />
        </div>
    )

}

export default BackgroundImages;