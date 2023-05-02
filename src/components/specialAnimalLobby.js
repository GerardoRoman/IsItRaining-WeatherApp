import React, { useEffect, useState } from 'react'
import axios from 'axios'
import specialAnimalLobbyBackground from '../assets/backgroundImages/Lobby_Background/dfvvtn1-4814102c-4aec-4efd-881e-96fe6383fbc1.png'
import "../styles/specialAnimalLobby.css"
import { Link } from 'react-router-dom'
import { BsFillCloudSunFill } from 'react-icons/bs'
import Modal from 'react-modal';
import { GiDinosaurRex } from 'react-icons/gi'
import useSound from "use-sound";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import lobbySong from '../assets/music/lobbySong.wav'
import { GiBackpack } from 'react-icons/gi'





export default function SpecialAnimalLobby({ token }) {
    const [animalList, setAnimalList] = useState([])
    const [yourAnimals, setYourAnimals] = useState([])
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [clickedImage, setClickedImage] = useState([])
    const [clickedName, setClickedName] = useState([])
    const [isPlaying, setIsPlaying] = useState(false);


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
        axios.get('https://is-it-raining.herokuapp.com/my-animals', {
            headers: {
                'Authorization': `Token ${token}`
            }
        }).then((response) => {
            const animalMap = response.data
            console.log(response.data)
            const animalArray = animalMap.map((response) => {
                const specialAnimal = response.animal.special_animal
                console.log(specialAnimal)
                return ([specialAnimal[1]])
            })
            console.log(animalArray)
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

    const [play, { pause }] = useSound(lobbySong);


    const playingButton = () => {
        if (isPlaying) {
            pause();
            setIsPlaying(false);
        } else {
            play();
            setIsPlaying(true);
        }
    };

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
                <h2>Special Animal Inventory</h2>

                <div className='divForSpecialAnimalLobbyMap'>
                    <div className='specialAnimalLobbyMap'>
                        {
                            yourAnimals.map((data =>
                                <>
                                    <div className='specialAnimalLobbyCard'>
                                        <div className='specialAnimalImage'>
                                            <img src={data[1]} alt={data} onClick={handleClick}></img>
                                            {console.log(data[1])}
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
                                </>
                            ))
                        }
                    </div>
                </div>
                <div className='lobbyBackgroundImage'>
                    <img src={specialAnimalLobbyBackground} alt='special-lobby-background'></img>
                </div>
                <div className='animalLobbyNavBar'>
                    <div>
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
                    <div className="audioPlayerSpecialLobby">
                        <button className="playButton">
                            <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
                            </IconContext.Provider>
                        </button>
                        {!isPlaying ? (
                            <button className="playButton" onClick={playingButton}>
                                <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
                                    <AiFillPlayCircle />
                                </IconContext.Provider>
                            </button>
                        ) : (
                            <button className="playButton" onClick={playingButton}>
                                <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
                                    <AiFillPauseCircle />
                                </IconContext.Provider>
                            </button>
                        )}
                        <button className="playButton">
                            <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
                            </IconContext.Provider>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}