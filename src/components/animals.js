import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Animal() {
    const [weatherCode, setWeatherCode] = useState()
    const [animal, setAnimal] = useState()

    useEffect(() => {
        axios.get('https://is-it-raining.herokuapp.com/weather-animal/<int:original_code>/', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        }).then((response) => {
            console.log(response.data.results)
            setWeatherCode(response.data.results)
    })

    setAnimal(animal.id)
}, [])
}