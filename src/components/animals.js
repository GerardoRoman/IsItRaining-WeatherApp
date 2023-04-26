import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'




const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};



function Animal({ weatherID, token }) {
    const [animal, setAnimal] = useState('')
    const [image, setImage] = useState('')
    const [capturedAnimals, setCapturedAnimals] = useState('')
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const navigate = useNavigate();
    let subtitle;


    useEffect(() => {
        if (weatherID) {
            axios.get(`https://is-it-raining.herokuapp.com/weather-animal/${weatherID}/`)
                .then((response) => {
                    // console.log(response.data.random_image)
                    setAnimal(response.data.name)
                    setImage(response.data.random_image)
                })
        }
    }, [weatherID])

    const handleCapture = (event) => {
        axios.post(`https://is-it-raining.herokuapp.com/captured/${animal}/`, {},
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
    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }
    function closeModal() {
        setIsOpen(false);
    }

    console.log(token)

    return (
        (token ? (

            <div className='animal'>
                <img src={image} alt='corresponding-weather-animal' onClick={openModal}></img>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                    ariaHideApp={false}
                >
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>You caught a {animal}!</h2>
                    <div className="modalImage">
                        <img src={image} alt='your-new-animal'></img>
                    </div>
                    <div>Choose what you'd like to do with it!</div>
                    <button onClick={closeModal}>release back to the wild</button>
                    <button onClick={handleCapture}>capture to your collection</button>

                </Modal>
            </div>
        ) : (<div className='animal'>
            <img src={image} alt='corresponding-weather-animal' onClick={openModal}></img>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Login to capture this {animal}!</h2>
                <div className="modalImage">
                    <img src={image} alt='your-new-animal'></img>
                </div>
                <button onClick={closeModal}>Nevermind</button>
                <Link to='/login'>
                    <button>Login!</button>
                </Link>

            </Modal>
        </div>
        ))
    )

}

export default Animal;