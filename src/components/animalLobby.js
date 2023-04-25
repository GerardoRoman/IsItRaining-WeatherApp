import { useEffect, useState } from 'react'
import axios from 'axios'
import animalLobbyBackgroundImage from '../assets/backgroundImages/8_png_by_cleopatrawolf_dfuq867.png'
import { CgProfile } from 'react-icons/cg'
import { IconContext } from 'react-icons'
import "../styles/profile-icon.css"
import "../styles/animalLobby.css"

export default function AnimalLobby({ username }) { //add token 
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
            <IconContext.Provider value={{ style: { fontSize: '75px', color: "black" } }}>
                <div className='profile-icon'>
                    <CgProfile />
                </div>
            </IconContext.Provider>
            <h2>{username}</h2>
            <div className='display-animals'>
                <div>
                    
                </div>
            </div>
            <div className='lobby-background-image'>
                <img src={animalLobbyBackgroundImage} alt='profile-background'></img>
            </div>
            <div className='back-to-weather'>
                <button><a href={`/`}>back to weather</a></button>
            </div>
        </div>
    )
}