import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Modal from 'react-modal';



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

// Modal.setAppElement('#animalButton');


function Animal({ weatherID }) {
    const [animal, setAnimal] = useState('')
    const [image, setImage] = useState('')
    const [captured, setCaptured] = useState('')
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);


    useEffect(() => {
        if (weatherID) {
            axios.get(`https://is-it-raining.herokuapp.com/weather-animal/${weatherID}/`)
                .then((response) => {
                    // console.log(response.data.random_image)
                    setAnimal(response.data.name)
                    setImage(response.data.random_image)
                    console.log("weather:", { weatherID })
                })
        }

    }, [weatherID])

    console.log(animal)

    const handleClick = (event) => {
        // axios.post(`https://is-it-raining.herokuapp.com/captured/${animal}/`, {},)
        //     .then(res => {
        //         setCaptured(res.data.FILL_ME_IN);
        //     })
        console.log('clicked')
    };

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }


    return (
        <div className='animal'>
            <img src={image} alt='corresponding-weather-animal' onClick={openModal}></img>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
                <button onClick={closeModal}>close</button>
                <div>I am a modal</div>
                <form>
                    <input />
                    <button>tab navigation</button>
                    <button>stays</button>
                    <button>inside</button>
                    <button>the modal</button>
                </form>
            </Modal>
        </div>
    )

}

export default Animal;