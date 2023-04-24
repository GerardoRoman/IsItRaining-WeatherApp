import { useEffect, useState } from 'react'
import axios from 'axios'
import charactersMenuBackgroundImage from './assets/backgroundImages/8_png_by_cleopatrawolf_dfuq867.png'

export default function Profile({ username }) { //add token 
    const [animalList, setAnimalList] = useState([])
    const [animalId, setAnimalId] = useState('')

    console.log(username.username)
    
    useEffect(() => {
        axios.get('https://is-it-raining.herokuapp.com/my-animals/', {
            // headers: {
            //     'Authorization': `Token ${token}`
            // }
        }).then((response) => {
            setAnimalList(response.data)
        })

        setAnimalId(animalList.id)
    }, [])

    console.log(animalList)
    console.log(animalId)

    function deleteAnimal(animalId) {
        console.log(animalId)
        axios.delete(`https://is-it-raining.herokuapp.com/captured/${animalId}`, {
            // headers: {
            //     'Authorization': `Token ${token}`
            // }
        })
            .then(() => setAnimalList((animalList) => animalList.filter((animal) => animal.id !== animalId)))
    }

    return (
        <div>
            <img src={charactersMenuBackgroundImage} alt='profile-background'></img>
        </div>
    )
}