import React, { useEffect, useState } from 'react'
import moment from 'moment';

const HourlyWeather = ({ time = 1 }) => {
    const [lat, setLat] = useState([])
    const [long, setLong] = useState([])
    const [hourlyData, setHourlyData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            navigator.geolocation.getCurrentPosition(function (position) {
                setLat(position.coords.latitude);
                setLong(position.coords.longitude);
            });

            await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY2}&q=${lat},${long}&days=2&aqi=no&alerts=no`)
                .then(res => res.json())
                .then(result => {
                    setHourlyData(result.forecast.forecastday)
                    // console.log(result);
                    // console.log(result.forecast)
                    // console.log(result.forecast.forecastday[0].hour)
                    // console.log(result.forecast.forecastday[0].hour[0].time)
                    // console.log(result.forecast.forecastday[0].hour[0].time_epoch)
                    // console.log(result.forecast.forecastday[0].hour[0].temp_f)
                });
        }
        fetchData();
        console.log("Latitude is:", lat)
        console.log("Longitude is:", long)
    }, [lat, long])



    return (
        hourlyData.length > 0 && (
            hourlyData.map((data => (
                <>
                    <div>
                        Time: {data.hour[0].time}
                    </div>
                    <div>
                        Temp: {data.hour[0].temp_f}°F
                    </div>
                </>
            )))));
}

export default HourlyWeather;