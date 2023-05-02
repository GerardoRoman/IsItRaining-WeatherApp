import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CurrentWeather from './currentWeather.js'
import HourlyWeather from './hourlyWeather.js'
import '../styles/home.css'
import { useNavigate } from 'react-router-dom'
import BackgroundImages from './background.js'
// import catchum from '../assets/music/catchum.wav'
// import sunshine from '../assets/music/sunshine.wav'
// import rain from '../assets/music/rain.wav'
// import useSound from "use-sound";
// import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
// import { IconContext } from "react-icons";


function Home({ token, setAuth }) {
    const [lat, setLat] = useState(null)
    const [long, setLong] = useState(null)
    const [hourlyTemps, setHourlyTemps] = useState([])
    const [weatherCode, setWeatherCode] = useState(null)
    // const [isPlaying, setIsPlaying] = useState(false);
    const navigate = useNavigate();


    // const [play, { pause }] = useSound(catchum);


    // const playingButton = () => {
    //     if (isPlaying) {
    //         pause();
    //         setIsPlaying(false);
    //     } else {
    //         play();
    //         setIsPlaying(true);
    //     }
    // };

    useEffect(() => {
        const getData = async () => {
            navigator.geolocation.getCurrentPosition(function (position) {
                setLat(position.coords.latitude);
                setLong(position.coords.longitude);
            });
            // console.log("Latitude is:", lat)
            // console.log("Longitude is:", long)
        }
        getData();
    }, [lat, long]);


    const handleLogout = () => {
        axios.post('https://is-it-raining.herokuapp.com/auth/token/logout',
            {},
            {
                headers: {
                    'Authorization': `Token ${token}`
                },
            }
        ).then(() => {
            setAuth('', null)
            navigate('/')
        })
    }

    return (
        <>
            <CurrentWeather lat={lat} long={long} hourlyTemps={hourlyTemps} token={token} setWeatherCode={setWeatherCode} handleLogout={handleLogout} />
            <HourlyWeather lat={lat} long={long} setHourlyTemps={setHourlyTemps} />
            <BackgroundImages weatherCode={weatherCode} />
            {/* <div className="audioPlayer">
                <div className="audioPlayerHome">
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
            </div> */}

        </>
    );
}

export default Home;