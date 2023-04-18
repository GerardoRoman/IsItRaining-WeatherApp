import React, { useEffect, useState } from 'react'
import moment from 'moment';

export default function WeeklyWeather() {
    const [lat, setLat] = useState([])
    const [long, setLong] = useState([])
    const [data, setData] = useState([])
    const [city, setCity] = useState([])
    const [high, setHigh] = useState([])
    const [low, setLow] = useState([])
    const [zip, setZip] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            navigator.geolocation.getCurrentPosition(function (position) {
                setLat(position.coords.latitude);
                setLong(position.coords.longitude);
            });

            await fetch(`https://api.openweathermap.org/data/2.5/forecast/?lat=${lat}&lon=${long}&units=imperial&${process.env.REACT_APP_API_KEY}`)
                // await fetch(`https://api.openweathermap.org/data/2.5/forecast?zip=zip=${zip}&units=imperial&appid=${process.env.REACT_APP_API_KEY}`).then(res => res.json())
                .then(result => {
                    setData(result.list)
                    setCity(result.city.name)
                    setHigh(Math.round(result.main.temp))
                    console.log(result);
                });
        }
        fetchData();
    }, [lat, long])

    return (
        (data.length > 0) ? (
            data.map((forecast => (
                <>
                    <div>
                        Your Location: {city}
                    </div>
                    <div>
                        {forecast.weather[0].description}
                    </div>
                    <div>
                        High: {forecast.main.temp_max}
                    </div>
                    <div>
                        Low: {forecast.main.temp_min}
                    </div>
                    <div>
                        {forecast.weather[0].icon}
                    </div>
                    <div>
                        Day: {moment().format('dddd')}
                    </div>
                    <div>
                        Date: {moment().format('LL')}
                    </div>
                </>
            )))) : (
            <div> "Loading" </div>
        )
    );
}