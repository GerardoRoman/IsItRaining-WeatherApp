import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'weather-react-icons/lib/css/weather-icons.css';
import 'weather-react-icons/lib/css/weather-icons-wind.css';
import Animal from './animals.js'
import Loading from './loading.js'
import AnimalLoggedOut from './animalsLoggedOut.js'
import { Link } from 'react-router-dom'
import { GiDinosaurRex } from 'react-icons/gi'
import { IoMdLogOut } from 'react-icons/io'
import { IoMdLogIn } from 'react-icons/io'


export default function CurrentWeather({ lat, long, hourlyTemps, token, setWeatherCode, handleLogout }) {
    const [data, setData] = useState([])
    const [weatherIcon, setWeatherIcon] = useState([])
    const [weatherID, setWeatherID] = useState([])
    const [catchum, setCatchum] = useState('')

    useEffect(() => {
        if (lat && long) {
            const URL = (`https://api.openweathermap.org/data/2.5/weather/?lat=${lat}&lon=${long}&units=imperial&APPID=${process.env.REACT_APP_API_KEY}`)
            axios.get(URL)
                .then(result => {
                    setData(result.data);
                    setWeatherIcon(result.data.weather[0].icon)
                    setWeatherID(result.data.weather[0].id)
                    setWeatherCode(result.data.weather[0].id)
                })
        }
    }, [lat, long, weatherID])

    // console.log(weatherID)

    const high = Math.max(...hourlyTemps)
    const low = Math.min(...hourlyTemps)

    return (
        (typeof data.main != 'undefined') ? (
            <>
                <div className="weatherCard">
                    <div className="header" data-drag-scroll-enabled="true">
                        {data.name}
                    </div>
                    <div className="cardBody">
                        <div className="tempIconBucket">
                            <div className="iconContainer">
                                <div className='icon'>
                                    <img src={`http://openweathermap.org/img/w/${weatherIcon}.png`} alt="icon"></img>
                                </div>
                            </div>
                            <div className="temp">
                                {Math.round(data.main.temp)}°
                            </div>
                        </div>
                        <div className="currentWeatherInfo">
                            <div className="description">
                                {data.weather[0].description}
                            </div>
                            <div className="highLowBox">
                                <div className="high">
                                    ↑ {Math.ceil(high)}°F
                                </div>
                                <div className="low">
                                    ↓ {Math.floor(low)}°F
                                </div>
                            </div>
                            <div className="humidity">
                                Humidity: {data.main.humidity}%
                            </div>
                        </div>
                    </div>
                </div >
                <div className="hourlyForecastLabel">
                    Swipe for hourly forecast →
                </div>
                {token ? (
                    <>
                        <div>
                            <Animal weatherID={weatherID} token={token} />
                        </div>
                        <div className="loggedInNavBar">
                            <Link to='/animal-lobby'>
                                <button className='animalLobbyButton'>
                                    <div><GiDinosaurRex /></div>
                                </button>
                            </Link>
                            <div className='logoutButton'>
                                <button onClick={handleLogout}>
                                    <div><IoMdLogOut /></div>
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div>
                            <AnimalLoggedOut weatherID={weatherID} />
                        </div>
                        <div className="loggedOutNavBar">
                            <Link to='/login'>
                                <button className='loginButton'>
                                    <div><IoMdLogIn /></div>
                                </button>
                            </Link>
                        </div>
                    </>
                )}
            </>
        ) : (
            <div> <Loading /> </div>
        )
    );

}