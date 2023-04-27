import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CurrentWeather from './currentWeather.js'
import HourlyWeather from './hourlyWeather.js'
import Login from './login.js'
import Music from './music.js'
import mainBackgroundImage from '../assets/backgroundImages/4_edit_by_cleopatrawolf_dfut2ry.png'
import { Link } from 'react-router-dom'
import '../styles/home.css'
import { useNavigate } from 'react-router-dom'
import BackgroundImages from './background.js'

function Home({ token, setAuth }) {
    const [lat, setLat] = useState(null)
    const [long, setLong] = useState(null)
    const [hourlyTemps, setHourlyTemps] = useState([])
    const navigate = useNavigate();
    const [weatherCode, setWeatherCode] = useState(null)

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
            // console.log('loggedout')
        })
    }


    return (
        <>
            <CurrentWeather lat={lat} long={long} hourlyTemps={hourlyTemps} token={token} setWeatherCode={setWeatherCode} />
            <HourlyWeather lat={lat} long={long} setHourlyTemps={setHourlyTemps} />
            <BackgroundImages weatherCode={weatherCode} />
            <div className="musicToggleButton">
                <Music />
            </div>
            {token ? (
                <>
                    <Link to='/animal-lobby'>
                        <button className='animalLobbyButton'>Go to Animal Lobby!</button>                </Link>
                    <div className='logoutButton'>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </>
            ) : (
                <Link to='/login'>
                    <button className='loginButton'>Login!</button>
                </Link>
            )}
        </>
    );
}
export default Home;