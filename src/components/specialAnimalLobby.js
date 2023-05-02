import React, { useEffect, useState } from 'react'
import axios from 'axios'
import specialAnimalLobbyBackground from '../assets/backgroundImages/Lobby_Background/dfvvtn1-4814102c-4aec-4efd-881e-96fe6383fbc1.png'
import "../styles/specialAnimalLobby.css"
import { Link } from 'react-router-dom'
import { BsFillCloudSunFill } from 'react-icons/bs'
import Modal from 'react-modal';
import { GiBackpack } from 'react-icons/gi'





export default function SpecialAnimalLobby({ token, username }) {
    const [animalList, setAnimalList] = useState([])
    const [yourAnimals, setYourAnimals] = useState([])
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [clickedImage, setClickedImage] = useState([])
    const [clickedName, setClickedName] = useState([])

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            maxWidth: '300px',
            maxHeight: '300px',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    useEffect(() => {
        axios.get('https://is-it-raining.herokuapp.com/my-special-animals', {
            headers: {
                'Authorization': `Token ${token}`
            }
        }).then((response) => {
            const animalMap = response.data
            const animalArray = animalMap.map((response) => {
            console.log(response.specialAnimal)
            return([response.special_animal.special_name, response.special_animal.image])
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



    function closeModal() {
        setIsOpen(false);
    }

    const handleClick = (event) => {
        console.log(event.target);
        setClickedImage(event.target.src);
        setClickedName(event.target.alt);
        setIsOpen(true);
    }

    return (
        <>
            <div>
                {/* <IconContext.Provider value={{ style: { fontSize: '75px', color: "black" } }}>
                    <div className='profile-icon'>
                        <CgProfile />
                    </div>
                </IconContext.Provider> */}

                <h2>Special Animal Inventory</h2>

                <div className='divForAnimalLobbyMap'>
                    <div className='animalLobbyMap'>
                        {
                            yourAnimals.map((data =>
                                <>
                                    <div className='animalLobbyCard'>
                                        <div className='animalImage'>
                                            <img src={data[1]} alt={data[0]} onClick={handleClick}></img>
                                            {console.log(data[1])}
                                        </div>
                                    </div>
                                </>
                            ))
                        }
                                            <Modal
                                                isOpen={modalIsOpen}
                                                onRequestClose={closeModal}
                                                ariaHideApp={false}
                                                style={customStyles}
                                            >
                                                <h2 className="modalAnimalNameeAL">{clickedName}</h2>
                                                <div className="modalImageDivAL">
                                                    <img className="modalImageAL" src={clickedImage} alt='your-new-animal'></img>
                                                </div>
                                                <button className="modalButtonAL" onClick={closeModal}>Back</button>
                                            </Modal>
                    </div>
                </div>
                <div className='lobbyBackgroundImage'>
                    <img src={specialAnimalLobbyBackground} alt='special-lobby-background'></img>
                </div>
                <div className='animalLobbyNavBar'>
                    <Link to='/'>
                        <button className='backToWeather'>
                            <div><BsFillCloudSunFill /></div>
                        </button>
                    </Link>
                    <Link to='/animal-lobby'>
                            <button className='animalLobbyButton'>
                                <div><GiBackpack /></div>
                            </button>
                    </Link>
                </div>
            </div>
        </>
    )
}