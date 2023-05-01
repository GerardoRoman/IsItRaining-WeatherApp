import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom'
import '../styles/animal.css'
import { BsChatLeftFill } from 'react-icons/bs'
import Confetti from 'react-confetti';
import Typewriter from 'typewriter-effect'


function Animal({ weatherID, token }) {
    const [animal, setAnimal] = useState('')
    const [image, setImage] = useState('')
    const [variation, setVariation] = useState([])
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [pointsLeft, setPointsLeft] = useState(0)
    const [captureBoolean, setCaptureBoolean] = useState('')
    const [specialName, setSpecialName] = useState('')
    const [specialImg, setSpecialImg] = useState('')
    const [special, setSpecial] = useState([])
    const navigate = useNavigate();
    const [showBubble, setShowBubble] = useState(false)

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            maxWidth: '300px',
            maxHeight: '305px',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    const customStylesConfetti = {
        width: '280px',
        height: '327px',
    }

    useEffect(() => {
        if (weatherID && token) {
            axios.get(`https://is-it-raining.herokuapp.com/weather-animal/${weatherID}/`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`
                    }
                })
                .then((response) => {
                    setAnimal(response.data.name)
                    setImage(response.data.image)
                    setVariation(response.data.variation_type)
                    setCaptureBoolean(response.data.can_capture)
                    setPointsLeft(response.data.points_left_until_max)
                    setSpecialName(response.data.special_animal[0].special_name)
                    setSpecialImg(response.data.special_animal[0].image)

                    // console.log(response.data.points_left_until_max)
                    // console.log(response.data.can_capture)
                    console.log(response.data.special_animal[0].image)

                })
        }
    }, [weatherID, token])



    console.log(token)
    // console.log(specialImg)
    console.log(captureBoolean)
    console.log(pointsLeft)

    const handleCapture = (event) => {
        axios.post(`https://is-it-raining.herokuapp.com/captured/${animal}/${variation}/`, {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                }
            }
        )
            .then(res => {
                setPointsLeft(res.data.points)
                closeModal()
                if (pointsLeft > 1) {
                    navigate('/animal-lobby')
                }
                console.log(res)
            })
    };


    const handleNavToSpecialAnimals = (event) => {
        navigate('/special-animal-lobby')
    }

    function openModal() {
        setIsOpen(true);
        console.log('Modal opened.')
    }

    function closeModal() {
        setIsOpen(false);
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowBubble(false);
        }, 10000);
        return () => clearTimeout(timer);
    }, [showBubble])

    const handleClick = () => {
        (captureBoolean ? openModal() : setShowBubble(true))
    }


    return (
        <div className='animalDiv'>
            <>
                {showBubble &&
                    <div className="talkBubble">
                        <div className="noClickWarningIcon">
                            <div className="chatBoxDiv"><BsChatLeftFill /></div>
                        </div>
                        <div className="noClickWarningText">
                            <div className="warningWords">
                                <Typewriter
                                    onInit={(typewriter) => {
                                        typewriter
                                            .typeString("Try again later.")
                                            .pauseFor(1000)
                                            .typeString(" You JUST caught me...")
                                            .start();
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                }
            </>

            <div className={captureBoolean ? "animalCanCapture" : "animal"}> <img src={image} alt='corresponding-weather-animal' onClick={handleClick}></img> </div>

            {
                (pointsLeft === 0) ?
                    (<Modal
                        isOpen={pointsLeft === 0}
                        onRequestClose={closeModal}
                        style={customStyles}
                        ariaHideApp={false}
                    >
                        <div>
                            <div>
                                <Confetti
                                    style={customStylesConfetti}

                                />
                            </div>
                            <h2 className="modalTitle">You've leveled up your {animal}!</h2>
                            <div className="modalImageDiv">
                                <img className="modalImage" src={specialImg} alt='your-new-animal'></img>
                            </div>
                            <button className="modalButtonRight" onClick={handleNavToSpecialAnimals}>Capture</button>

                        </div>
                    </Modal >
                    ) : (
                        (pointsLeft === 1) ?
                            (
                                <Modal
                                    isOpen={modalIsOpen}
                                    // onRequestClose={closeModal}
                                    style={customStyles}
                                    ariaHideApp={false}
                                >
                                    <div>
                                        <h2 className="modalTitle">You caught a {animal}!</h2>
                                        <div className="modalImageDiv">
                                            <img className="modalImage" src={image} alt='your-new-animal'></img>
                                        </div>
                                        <div className="pointCountModal">Last one until level up</div>
                                        <div className="modalChoice">What would you like to do? </div>
                                        <button className="modalButtonLeft" onClick={closeModal}>Release</button>
                                        <button className="modalButtonRight" onClick={handleCapture}>Capture</button>
                                    </div>
                                </Modal >
                            ) : (
                                <Modal
                                    isOpen={modalIsOpen}
                                    onRequestClose={closeModal}
                                    style={customStyles}
                                    ariaHideApp={false}
                                >
                                    <div>
                                        <h2 className="modalTitle">You caught a {animal}!</h2>
                                        <div className="modalImageDiv">
                                            <img className="modalImage" src={image} alt='your-new-animal'></img>
                                        </div>
                                        <div className="pointCountModal">Collect {pointsLeft} more to level up</div>
                                        <div className="modalChoice">What would you like to do? </div>
                                        <button className="modalButtonLeft" onClick={closeModal}>Release</button>
                                        <button className="modalButtonRight" onClick={handleCapture}>Capture</button>

                                    </div>
                                </Modal >))
            }
        </div >
    )
}

export default Animal;
