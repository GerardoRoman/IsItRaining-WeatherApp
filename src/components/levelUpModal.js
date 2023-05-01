import Confetti from 'react-confetti';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'





export default function LevelUpModal({ animal, specialImg }) {
    const navigate = useNavigate();
    const [modalIsOpen, setIsOpen] = React.useState(false);



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

    return (
        <Modal
            isOpen={modalIsOpen}
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

    )
}