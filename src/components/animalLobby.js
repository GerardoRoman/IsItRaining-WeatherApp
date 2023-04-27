import { useEffect, useState } from 'react'
import axios from 'axios'
import animalLobbyBackgroundImage from '../assets/backgroundImages/8_png_by_cleopatrawolf_dfuq867.png'
import { CgProfile } from 'react-icons/cg'
import { IconContext } from 'react-icons'
import "../styles/profile-icon.css"
import "../styles/animalLobby.css"
import { Link } from 'react-router-dom'


export default function AnimalLobby({ token, username }) {
    const [animalList, setAnimalList] = useState([])
    const [yourAnimals, setYourAnimals] = useState([])
    

    useEffect(() => {
        axios.get('https://is-it-raining.herokuapp.com/my-animals', {
            headers: {
                'Authorization': `Token ${token}`
            }
        }).then((response) => {
            const animalMap = response.data
            const animalArray = animalMap.map((response) => {
                return ([response.animal.name, response.animal.image, response.animal.id])
            })
            setYourAnimals(animalArray)
        })

    }, [])


    function deleteAnimal(animalId) {
        console.log(animalId)
        axios.delete(`https://is-it-raining.herokuapp.com/captured/${animalId}`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
            .then(() => setAnimalList((animalList) => animalList.filter((animal) => animal.id !== animalId)))
    }


    return (
        <>
            <div>
                <IconContext.Provider value={{ style: { fontSize: '75px', color: "black" } }}>
                    <div className='profile-icon'>
                        <CgProfile />
                    </div>
                </IconContext.Provider>

                <h2>{username}'s Animal Lobby</h2>

                <div className='animal-lobby-map'>
                {
                    yourAnimals.map((data => 
                        <>
                            <div className='animal-lobby-container'>
                                <div className='animal-name'>
                                    {data[0]}
                                </div>
                                <div className='animal-image'>
                                    <img src={data[1]} alt={data[0]}></img>
                                </div>
                                <div className='delete-animal-button'>
                                    <button onClick={() => deleteAnimal(data[3])}>Delete</button>
                                </div>
                            </div>
                        </>
                        ))
                    }
                </div>

                <div className='lobby-background-image'>
                    <img src={animalLobbyBackgroundImage} alt='profile-background'></img>
                </div>

                <div className='button-container'>
                    <Link to='/'>
                        <button className='back-to-weather'>Back to Weather!</button>
                    </Link>
                </div>

                <div className='lobby-background-image'>
                    <img src={animalLobbyBackgroundImage} alt='profile-background'></img>
                </div>
            </div>
        </>
    )
}