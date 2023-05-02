import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CurrentWeather from './currentWeather.js'
import HourlyWeather from './hourlyWeather.js'
import '../styles/home.css'
import { useNavigate } from 'react-router-dom'
import BackgroundImages from './background.js'


function Home({ token, setAuth }) {
    const [lat, setLat] = useState(null)
    const [long, setLong] = useState(null)
    const [hourlyTemps, setHourlyTemps] = useState([])
    const [weatherCode, setWeatherCode] = useState(null)
    // const [isPlaying, setIsPlaying] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        const getData = async () => {
            navigator.geolocation.getCurrentPosition(function (position) {
                setLat(position.coords.latitude);
                setLong(position.coords.longitude);
            });
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
        </>
    );
}

export default Home;