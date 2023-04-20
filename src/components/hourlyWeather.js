import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

export default function HourlyWeather({ lat, long }) {
    const [hourlyData, setHourlyData] = useState([])

    useEffect(() => {
        if (lat && long) {
            const URL = (`http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY2}&q=${lat},${long}&days=2&aqi=no&alerts=no`)
            axios.get(URL).then(result => {
                setHourlyData(result.data.forecast)
                console.log(result.data)
                const day1 = result.data.forecast.forecastday[0].hour
                const day1Forecast = day1.map((forecast) => {
                    return ([forecast.temp_f, forecast.time])
                });
                const day2 = result.data.forecast.forecastday[1].hour
                const day2Forecast = day2.map((forecast) => {
                    return ([forecast.temp_f, forecast.time])
                });
                console.log(day1Forecast)
                console.log(day2Forecast)
                const twentyFourHourForecast = [...day1Forecast, ...day2Forecast]
                console.log(twentyFourHourForecast)
                const date = new Date();
                const showTime = date.getHours()
                    + ':' + date.getMinutes()
                console.log(showTime)
                console.log(date)
            })
        }
    }, [lat, long])

    return (
        // hourlyData.length > 0 && (
        //     hourlyData.map((data => (
        <>
            {/* <div>
                        Time: {hourlyData.hour[0].time}
                    </div>
                    <div>
                        Temp: {hourlyData.hour[0].temp_f}°F
                    </div> */}
        </>
        // )))
        // )
    );
}