import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';


export default function HourlyWeather({ lat, long, setHourlyTemps }) {
    const [forecast, setForecast] = useState([])
    const [todayForecast, setTodayForecast] = useState([])



    useEffect(() => {
        if (lat && long) {
            const URL = (`https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY2}&q=${lat},${long}&days=2&aqi=no&alerts=no`)
            axios.get(URL).then(result => {

                const day1 = result.data.forecast.forecastday[0].hour
                const day1Forecast = day1.map((forecast) => {
                    return ([forecast.temp_f, forecast.time, forecast.condition])
                });

                const day2 = result.data.forecast.forecastday[1].hour
                const day2Forecast = day2.map((forecast) => {
                    return ([forecast.temp_f, forecast.time, forecast.condition])
                });

                const fourtyEightHourForecast = [...day1Forecast, ...day2Forecast]
                setForecast(fourtyEightHourForecast)

                const date = new Date();
                const timeAddTwelve = (moment(date).add(12, 'hours'))

                let futureForecast = fourtyEightHourForecast.filter(time => moment(time[1]) < timeAddTwelve && moment(time[1]) > date)
                setForecast(futureForecast)

                let hourlyTemps = day1Forecast.map((forecast) => forecast[0])
                setHourlyTemps(hourlyTemps)
            })
        }
    }, [lat, long, setHourlyTemps])


    return (

        forecast.length > 0 && (
            <>
                <div className="divForHourlyMap">
                    <div className="hourlyWeatherMap">
                        {
                            forecast.map((data => (
                                <div className="hourlyWeatherCard">
                                    <>
                                        <div className="hourlyTime">
                                            {moment(data[1]).format('h:mma')}
                                        </div>
                                        <div className="hourlyIcon">
                                            <img src={`http:${data[2].icon}`} alt="icon"></img>
                                        </div>
                                        <div className="hourlyTemp">
                                            {Math.round(data[0])}°F
                                        </div>
                                    </>
                                </div>
                            )
                            ))
                        }
                    </div>
                </div>
            </>
        ));
}