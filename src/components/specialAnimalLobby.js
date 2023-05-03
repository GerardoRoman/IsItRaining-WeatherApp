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
import Thunderstorms from '../assets/music/Thunderstorms.wav'





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
        axios.get('https://is-it-raining.herokuapp.com/my-special-animals', {
            headers: {
                'Authorization': `Token ${token}`
            }
        }).then((response) => {
            const animalMap = response.data
            const animalArray = animalMap.map((response) => {
                return ([response.special_animal.special_name, response.special_animal.image, response.special_animal.id])
            })
            setYourAnimals(animalArray)
        })

    }, [])

    const [play, { pause }] = useSound(Thunderstorms);


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
        setClickedImage(event.target.src);
        setClickedName(event.target.alt);
        setIsOpen(true);
    }

    const handleMusicToggle = () => {
        pause()
    }

    return (
        <>
            <div>

                <h2 className="specialAnimalLobbyHeader">Mega Beasts</h2>
                <h2 className="specialAnimalLobbyHeaderShadow">Mega Beasts</h2>
                <h4 className="specialAnimalLobbytagLine">Level Up!</h4>

                <div className='divForSpecialAnimalLobbyMap'>
                    <div className='specialAnimalLobbyMap'>
                        <>
                            {
                                yourAnimals.map((data =>
                                    <div className='animalLobbyCard' key={data[2]}>
                                        <div className='animalImage'>
                                            <img src={data[1]} alt={data[0]} onClick={handleClick}></img>
                                        </div>
                                    </div>
                                ))
                            }
                        </>
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
                    <div>
                        <Link to='/'>
                            <button className='backToWeather' onClick={handleMusicToggle}>
                                <div><BsFillCloudSunFill /></div>
                            </button>
                        </Link>
                        <Link to='/animal-lobby'>
                            <button className='animalLobbyButton' onClick={handleMusicToggle}>
                                <div><GiDinosaurRex /></div>
                            </button>
                        </Link>
                    </div>
                    <div className="audioPlayerSpecialLobby">
                        <button className="playButton">
                            <IconContext.Provider value={{ size: "3.5em", color: "#FFFFFF" }}>
                            </IconContext.Provider>
                        </button>
                        {!isPlaying ? (
                            <button className="playButton" onClick={playingButton}>
                                <IconContext.Provider value={{ size: "3.5em", color: "#FFFFFF" }}>
                                    <AiFillPlayCircle />
                                </IconContext.Provider>
                            </button>
                        ) : (
                            <button className="playButton" onClick={playingButton}>
                                <IconContext.Provider value={{ size: "3.5em", color: "#FFFFFF" }}>
                                    <AiFillPauseCircle />
                                </IconContext.Provider>
                            </button>
                        )}
                        <button className="playButton">
                            <IconContext.Provider value={{ size: "3.5em", color: "#FFFFFF" }}>
                            </IconContext.Provider>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}