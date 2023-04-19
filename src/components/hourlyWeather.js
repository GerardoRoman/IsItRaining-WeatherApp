import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

export default function HourlyWeather({ lat, long }) {
    const [hourlyData, setHourlyData] = useState([])

    useEffect(() => {
        if (lat && long) {
            const URL = (`http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY2}&q=${lat},${long}&days=2&aqi=no&alerts=no`)
            axios.get(URL).then(result => {
                setHourlyData(result.data.forecast.forecastday)
                console.log(result);
                console.log(result.data.forecast.forecastday)
                // console.log(result.forecast.forecastday[0].hour)
                // console.log(result.forecast.forecastday[0].hour[0].time)
                // console.log(result.forecast.forecastday[0].hour[0].time_epoch)
                // console.log(result.forecast.forecastday[0].hour[0].temp_f)
            })
        }
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
            ))))
    );
}