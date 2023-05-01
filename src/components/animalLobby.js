import React, { useEffect, useState } from 'react'
import axios from 'axios'
// import animalLobbyBackgroundImage from '../assets/backgroundImages/8_png_by_cleopatrawolf_dfuq867.png'
// import animalLobbyBackgroundImage from '../assets/backgroundImages/Lobby_Background/dfvvsj5-5060c6cc-828c-4616-9497-e42984af5829.png'
// import animalLobbyBackgroundImage from '../assets/backgroundImages/Lobby_Background/dfvvsjb-47d639d2-8203-4dc4-b0ec-a5ad2614e6ce.png'
// import animalLobbyBackgroundImage from '../assets/backgroundImages/Lobby_Background/dfvvsjf-2df6cb00-1a41-4e3a-a7ce-295314a2c45c.png'
// import animalLobbyBackgroundImage from '../assets/backgroundImages/Lobby_Background/dfvvsjk-7c33edc3-5bf1-40ae-8e61-629195582fcd.png'
// import animalLobbyBackgroundImage from '../assets/backgroundImages/Lobby_Background/dfvvt1l-04392b28-2c0d-451a-a037-3f383f7f2b2b.png'
// import animalLobbyBackgroundImage from '../assets/backgroundImages/Lobby_Background/dfvvt10-32154008-1901-4fab-b134-a96561056a92.png'
// import animalLobbyBackgroundImage from '../assets/backgroundImages/Lobby_Background/dfvvtaq-2fd86882-146a-4d2f-81a9-12d22dcd7377.png'
// import animalLobbyBackgroundImage from '../assets/backgroundImages/Lobby_Background/dfvvtkb-986c1dc5-9f18-4ff2-a545-78416ce2f0e4.png'
// import animalLobbyBackgroundImage from '../assets/backgroundImages/Lobby_Background/dfvvtn1-4814102c-4aec-4efd-881e-96fe6383fbc1.png'
// import animalLobbyBackgroundImage from '../assets/backgroundImages/Lobby_Background/dfvvtqd-2dd5c639-7503-45ba-9529-8b6438aa2135.png'
// import animalLobbyBackgroundImage from '../assets/backgroundImages/Lobby_Background/dfvvttc-29187cfa-6829-4c23-af07-4c01cde11bba.png'
// import animalLobbyBackgroundImage from '../assets/backgroundImages/Lobby_Background/dfvvtwg-93fcab11-7add-469f-a523-605a1cae4087.png'
// import animalLobbyBackgroundImage from '../assets/backgroundImages/Lobby_Background/dfvvu84-326bb710-eb9f-4d79-9e17-3e82fe3066b6.png'
// import animalLobbyBackgroundImage from '../assets/backgroundImages/Lobby_Background/dfvvun2-9c4ff1c1-a6aa-4f02-8432-530007682aab.png'
// import animalLobbyBackgroundImage from '../assets/backgroundImages/Lobby_Background/dfvvune-0200b2f7-c50b-4638-8145-48fce91626a4.png'
// import animalLobbyBackgroundImage from '../assets/backgroundImages/Lobby_Background/dfvvunv-50d870df-d6fa-4c8b-aca1-67c3e1210abc.png'
// import animalLobbyBackgroundImage from '../assets/backgroundImages/Lobby_Background/dfvvuod-3e2ed477-99ce-43d8-824c-9c695b3cd9e6.png'
// import animalLobbyBackgroundImage from '../assets/backgroundImages/Lobby_Background/dfvvv9r-ce0fee38-1ea5-479a-b3ac-f2955c08432f.png'
// import animalLobbyBackgroundImage from '../assets/backgroundImages/Lobby_Background/dfvvva0-c44461ca-4673-415d-a701-73dcd41a772e.png'
// import animalLobbyBackgroundImage from '../assets/backgroundImages/Lobby_Background/dfvvvfa-2f177ea0-af7f-42df-ad7c-b913a28a1a1c.png'
import animalLobbyBackgroundImage from '../assets/backgroundImages/Lobby_Background/dfvvvgt-fee1d09a-2cf3-46c4-9826-87a073effd98.png'
import "../styles/animalLobby.css"
import { Link } from 'react-router-dom'
import { BsFillCloudSunFill } from 'react-icons/bs'
import Modal from 'react-modal'
import { GiDinosaurBones } from 'react-icons/gi'
import { Line } from 'rc-progress'

export default function AnimalLobby({ token, username }) {
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
        axios.get('https://is-it-raining.herokuapp.com/my-animals', {
            headers: {
                'Authorization': `Token ${token}`
            }
        }).then((response) => {
            const animalMap = response.data
            console.log(response.data)
            const animalArray = animalMap.map((response) => {
                return ([response.animal.name, response.animal.image, response.animal.id, response.animal.points_left_until_max, response.points])
            })
            setYourAnimals(animalArray)
        })

    }, [])


    function deleteAnimal(animalId) {
        axios.delete(`https://is-it-raining.herokuapp.com/my-animals/${animalId}`, {
            headers: {
            'Authorization': `Token ${token}`
            }
        }).then((response) => {
            console.log(response.data)
            setYourAnimals(yourAnimals.filter(animal => animal[2] !== animalId))
        }).catch((error) => {
            console.error(error)
        })
    }


    function closeModal() {
        setIsOpen(false);
    }

    // const [progress, setProgress] = useState(0)

    const handleClick = (event) => {
        console.log(event.target);
        setClickedImage(event.target.src);
        setClickedName(event.target.alt);
        // setProgress(Math.round((data[3] / 10) * 100))
        setIsOpen(true);
    }

    return (
        <>
            <div>
                <h2>Animal Inventory</h2>

                <div className='divForAnimalLobbyMap'>
                    <div className='animalLobbyMap'>
                        {
                            yourAnimals.map((data =>
                                <>
                                    <div className='animalLobbyCard'>
                                        <div className='animalImage'>
                                            <img src={data[1]} alt={data[0]} onClick={handleClick}></img>
                                                <Line percent={data[4] * 10}
                                                strokeWidth="3"
                                                strokeColor="#BF00FF"
                                                strokeLinecap="square"
                                                trailWidth="3"
                                                trailColor="#f3f3f3" />
                                        </div>
                                    </div>
                                </>
                            ))
                        }
                        {
                            yourAnimals.map((data =>
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
                                                    <div className='modal-progress-bar'>
                                                        <Line percent={data[4] * 10}
                                                            strokeWidth="3"
                                                            strokeColor="#BF00FF"
                                                            strokeLinecap="square"
                                                            trailWidth="3"
                                                            trailColor="#f3f3f3" />
                                                    </div>
                                                    <div className='delete-animal-button'>
                                                        <button onClick={() => deleteAnimal(data[2])}>Delete</button>
                                                    </div>
                                                <button className="modalButtonAL" onClick={closeModal}>Back</button>
                                            </Modal>
                                            ))
                                        }
                    </div>
                </div>

                <div className='lobbyBackgroundImage'>
                    <img src={animalLobbyBackgroundImage} alt='profile-background'></img>
                </div>
                <div className='animalLobbyNavBar'>
                    <Link to='/'>
                        <button className='backToWeather'>
                            <div><BsFillCloudSunFill /></div>
                        </button>
                    </Link>
                    <Link to='/special-animal-lobby'>
                        <button className='specialAnimalLobbyButton'>
                            <div><GiDinosaurBones /></div>
                        </button>
                    </Link>
                </div>
            </div>
        </>
    )
}