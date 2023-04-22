import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Animal( {token, weatherID} ) {
    const [animal, setAnimal] = useState('')
    const [image, setImage] = useState('')
    

    useEffect(() => {
        console.log("weatherID:", weatherID)
        axios.get(`https://is-it-raining.herokuapp.com/weather-animal/${weatherID}/`, {
            // headers: {
            //     'Authorization': `Token ${token}`
            // }
        }).then((response) => {
            console.log(response.data.random_image)
            setAnimal(response.data.name)
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