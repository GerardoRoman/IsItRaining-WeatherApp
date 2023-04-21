import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import 'weather-react-icons/lib/css/weather-icons.css';
import 'weather-react-icons/lib/css/weather-icons-wind.css';
import { WeatherIcon } from 'weather-react-icons';


export default function CurrentWeather({ lat, long }) {
    const [data, setData] = useState([])
    const [weatherIcon, setWeatherIcon] = useState([])
    const [weatherID, setWeatherID] = useState([])

    useEffect(() => {
        if (lat && long) {
            const URL = (`https://api.openweathermap.org/data/2.5/weather/?lat=${lat}&lon=${long}&units=imperial&APPID=${process.env.REACT_APP_API_KEY}`)
            axios.get(URL).then(result => {
                setData(result.data);
                setWeatherIcon(result.data.weather[0].icon)
                setWeatherID(result.data.weather[0].id)
            })
        }
    }, [lat, long])

    console.log(weatherID)
    const iconUrl = `http://openweathermap.org/img/w/${weatherIcon}.png`;

    return (
        (typeof data.main != 'undefined') ? (

            <div className="weatherCard">
                <div className="header">
                    {data.name}
                </div>
                <div className="cardBody">
                    <div className="tempIconBucket">
                        <div className="icon">
                            {weatherIcon}
                        </div>
                        <div className="temp">
                            {Math.round(data.main.temp)}°F
                        </div>
                    </div>
                    <div className="description">
                        {data.weather[0].description}
                    </div>
                    {/* <div className="icon">
                        <WeatherIcon iconId={weatherIcon} name="owm" />
                    </div> */}
                    <div>
                        {<img src={iconUrl}> </img>}
                    </div>
                    <div className="highLowBox">
                        <div className="high">
                            ↑ {Math.round(data.main.temp_max)}°F
                        </div>
                        <div className="low">
                            ↓ {Math.round(data.main.temp_min)}°F
                        </div>
                    </div>
                    <div className="humidity">
                        Humidity: {data.main.humidity}%
                    </div>
                </div>
            </div >
        ) : (
            <div> "Loading" </div>
        )
    );

}