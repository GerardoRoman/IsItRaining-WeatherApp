import React, { useEffect, useState } from 'react'
import moment from 'moment';
import '../App.css';

export default function CurrentWeather() {
    const [lat, setLat] = useState([])
    const [long, setLong] = useState([])
    const [data, setData] = useState([])
    const [zip, setZip] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            navigator.geolocation.getCurrentPosition(function (position) {
                setLat(position.coords.latitude);
                setLong(position.coords.longitude);
            });

            await fetch(`https://api.openweathermap.org/data/2.5/weather/?lat=${lat}&lon=${long}&units=imperial&APPID=${process.env.REACT_APP_API_KEY}`)
                // await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip}&units=imperial&appid=${process.env.REACT_APP_API_KEY}`)
                .then(res => res.json())
                .then(result => {
                    setData(result)
                    console.log(result);
                });
        }
        fetchData();
        console.log("Latitude is:", lat)
        console.log("Longitude is:", long)
    }, [lat, long])


    return (
        (typeof data.main != 'undefined') ? (

            <div className="weatherCard">
                <div className="header">
                    {data.name}
                </div>
                <div className="cardBody">
                    <div className="temp">
                        {Math.round(data.main.temp)}°F
                    </div>
                    <div className="description">
                        {data.weather[0].description}
                    </div>
                    <div className="icon">
                        {data.weather[0].icon}
                    </div>
                    <div className="flexBox">
                        <div className="high">
                            High: {Math.round(data.main.temp_max)}°F
                        </div>
                        <div className="low">
                            Low: {Math.round(data.main.temp_min)}°F
                        </div>
                    </div>
                    <div className="humidity">
                        Humidity: {data.main.humidity}%
                    </div>
                </div>
            </div>
        ) : (
            <div> "Loading" </div>
        )
    );

}