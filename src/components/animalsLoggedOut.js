import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Modal from 'react-modal';
import { Link } from 'react-router-dom'
import '../styles/animal.css'


export default function AnimalLoggedOut({ weatherID }) {
    const [animal, setAnimal] = useState('')
    const [image, setImage] = useState('')
    const [modalIsOpen, setIsOpen] = React.useState(false);


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

    useEffect(() => {
        if (weatherID) {
            axios.get(`https://is-it-raining.herokuapp.com/weather-animal/${weatherID}/`)
                .then((response) => {
                    // console.log(response.data.random_image)
                    setAnimal(response.data.name)
                    setImage(response.data.image)
                })
        }
    }, [weatherID])

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <>
            <div className='animal'>
                <img src={image} alt='corresponding-weather-animal' onClick={openModal}></img>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    ariaHideApp={false}
                >
                    <h2 className="modalTitle">Login to capture this {animal}!</h2>
                    <div className="modalImageDiv">
                        <img src={image} alt='your-new-animal'></img>
                    </div>
                    <button className="modalButtonLeft" onClick={closeModal}>Nevermind</button>
                    <Link to='/login'>
                        <button className="modalButtonRight">Login!</button>
                    </Link>

                </Modal>
            </div>
        </>
    )
}
