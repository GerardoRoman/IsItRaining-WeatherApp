import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import '../styles/animal.css'
import Confetti from 'react-confetti';


function Animal({ weatherID, token }) {
    const [animal, setAnimal] = useState('')
    const [image, setImage] = useState('')
    const [variation, setVariation] = useState([])
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [captureBoolean, setCaptureBoolean] = useState('')
    const [click, setClick] = useState(false)
    const [pointsLeft, setPointsLeft] = useState(0)
    const navigate = useNavigate();

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
                    // console.log(response.data.random_image)
                    setAnimal(response.data.name)
                    setImage(response.data.image)
                    setVariation(response.data.variation_type)
                    setCaptureBoolean(response.data.can_capture)
                    setPointsLeft(response.data.points_left_until_max)
                    console.log(response.data.points_left_until_max)
                    console.log(response.data.can_capture)
                    console.log(response.data)

                })
        }
    }, [weatherID, token])


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
                closeModal()
                navigate('/animal-lobby')
            })
    };

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function testFunc() {
        console.log('passed')
    }

    const testDiv = () => {
        // const interval = setInterval(setClick(true), 500);
        // return () => clearInterval(interval) &&
        setClick(true);
    }


    // useEffect((click) => {
    //     const interval = setInterval(() => {
    //         console.log('This will run every second!');
    //     }, 1000);
    //     return () => clearInterval(interval);
    // }, [lick]);


    return (
        <div className='animal'>
            {click && <div>NOT TODAY NO CLICKY</div>}
            {captureBoolean ? <img src={image} alt='corresponding-weather-animal'
                onClick={openModal}></img> : <img src={image} alt='corresponding-weather-animal' onClick={setClick}></img>}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                ariaHideApp={false}
            >
                <div>
                    {/* <div>
                            <Confetti
                                style={customStylesConfetti}
                            />
                        </div> */}
                    <h2 className="modalTitle">You caught a {animal}!</h2>
                    <div className="modalImageDiv">
                        <img className="modalImage" src={image} alt='your-new-animal'></img>
                    </div>
                    <div className="pointCountModal">Collect {pointsLeft} more to level up</div>
                    <div className="modalChoice">What would you like to do? </div>
                    <button className="modalButtonLeft" onClick={closeModal}>Release</button>
                    <button className="modalButtonRight" onClick={handleCapture}>Capture</button>

                </div>
            </Modal>
        </div>
    )

}

export default Animal;