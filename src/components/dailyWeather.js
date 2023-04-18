import React, { useEffect, useState } from 'react'
import moment from 'moment';


export default function DailyWeather() {
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

            // await fetch(`https://api.openweathermap.org/data/2.5/weather/?lat=${lat}&lon=${long}&units=imperial&APPID=${process.env.REACT_APP_API_KEY}`)
            await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=70117&units=imperial&appid=${process.env.REACT_APP_API_KEY}`)
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
            <>
                <div>
                    Your Location: {data.name}
                </div>
                <div>
                    Current Temp: {data.main.temp}°F
                </div>
                <div>
                    {data.weather[0].description}
                </div>
                <div>
                    High: {data.main.temp_max}
                </div>
                <div>
                    Low: {data.main.temp_min}
                </div>
                <div>
                    Humidity: {data.main.humidity}%
                </div>
                <div>
                    {data.weather[0].icon}
                </div>
                {/* <div>
                    Day: {moment({ dt }).format('dddd')}
                </div>
                <div>
                    Date: {moment(dt).format('LL')}
                </div> */}
            </>
        ) : (
            <div> "Loading" </div>
        )
    );

}