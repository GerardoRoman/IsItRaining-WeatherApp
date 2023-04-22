import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Animal( {weatherID} ) { //add token beside weatherID
    const [animal, setAnimal] = useState('')
    const [image, setImage] = useState('')
    

    console.log("weatherID:", {weatherID})
    useEffect(() => {
        if (weatherID) {
        axios.get(`https://is-it-raining.herokuapp.com/weather-animal/${weatherID}/`, {
            // headers: {
            //     'Authorization': `Token ${token}`
            // }
        }).then((response) => {
            console.log(response.data.random_image)
            setAnimal(response.data.name)
            setImage(response.data.random_image)
            console.log("weather:", {weatherID})

    })
        }

}, [weatherID]) //add token beside weatherID

return (
    <div>
        <img src={image} alt='corresponding-weather-animal'></img>
    </div>
)

}

export default Animal;