import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
// import round from 'moment-round';

export default function HourlyWeather({ lat, long }) {
    const [hourlyData, setHourlyData] = useState([])
    const [forecast, setForecast] = useState([])
    const [currentDate, setCurrentDate] = useState(null)
    const [currentHour, setCurrentHour] = useState(null)
    const [day1, setDay1] = useState([])
    const [timeAdds, setTimeAdds] = useState([])

    useEffect(() => {
        if (lat && long) {
            const URL = (`http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY2}&q=${lat},${long}&days=2&aqi=no&alerts=no`)
            axios.get(URL).then(result => {
                setHourlyData(result.data.forecast)

                // console.log(result.data)
                const day1 = result.data.forecast.forecastday[0].hour
                // console.log(day1)
                const day1Forecast = day1.map((forecast) => {
                    return ([forecast.temp_f, forecast.time, forecast.condition])
                });

                const day2 = result.data.forecast.forecastday[1].hour
                const day2Forecast = day2.map((forecast) => {
                    return ([forecast.temp_f, forecast.time, forecast.condition])
                });

                const fourtyEightHourForecast = [...day1Forecast, ...day2Forecast]
                console.log(fourtyEightHourForecast)
                setForecast(fourtyEightHourForecast)
                // const currentTimeDate = forecast[1]
                // console.log(day1)

                const date = new Date();
                // console.log(date)
                const timeAddTwelve = (moment(date).add(12, 'hours'))
                console.log(timeAddTwelve)

                // console.log(moment(date).format('YYYY-MM-DD hh:mm'))
                // require('moment-round');
                // console.log(date.ceil(1, 'hours'))
                // setCurrentHour(moment(date).format('hh'))
                // console.log(moment(date).format('h:mma'))


                // let output = result.data.forecast.forecastday[0].hour.filter(time => moment(time.time) < timeAdds && moment(time.time) > date)
                // console.log(output)

                let futureForecast = fourtyEightHourForecast.filter(time => moment(time[1]) < timeAddTwelve && moment(time[1]) > date)
                setForecast(futureForecast)
                console.log(futureForecast)
            })
        }
    }, [lat, long])


    console.log(forecast)
    console.log(currentHour)
    const timeRoundUp = currentHour + 1
    console.log(timeRoundUp)


    return (
        forecast.length > 0 && (
            forecast.map((data => (
                <>
                    <div>
                        <div>
                            {moment(data[1]).format('dddd')} at {moment(data[1]).format('h:mma')}
                        </div>
                        <div>
                            Temp: {Math.round(data[0])}°F
                        </div>
                        <div>
                            {data[2].text}
                        </div>
                        <div>
                        </div>
                        {/* <div>
                            {data[2].icon}
                        </div>
                        <div>
                            {data[2].code}
                        </div> */}
                    </div>
                </>
            )
            ))
        ));
}