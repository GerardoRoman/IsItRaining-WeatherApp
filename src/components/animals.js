import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import { weatherID }  from './currentWeather.js'

function Animal( {token, weatherID} ) {
    const [weatherCode, setWeatherCode] = useState('')
    const [animal, setAnimal] = useState('')
    const [image, setImage] = useState('')


    useEffect(() => {
        axios.get(`https://is-it-raining.herokuapp.com/weather-animal/${weatherID}/`, {
            // headers: {
            //     'Authorization': `Token ${token}`
            // }
        }).then((response) => {
            console.log(response.data.random_image)
            setWeatherCode(response.data.results)
            setImage(response.data.random_image)
    })


}, [token, weatherID])

return (
    <div>
        <img src={image} alt='corresponding-weather-animal'></img>
    </div>
)

}

export default Animal;