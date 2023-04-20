// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import moment from 'moment';

// export default function WeeklyWeather({ lat, long }) {
//     const [data, setData] = useState([])
//     const [city, setCity] = useState([])
//     const [date, setDate] = useState([])
//     const [zip, setZip] = useState([])

//     useEffect(() => {
//         const URL = (`https://api.openweathermap.org/data/2.5/forecast/?lat=${lat}&lon=${long}&units=imperial&appid=${process.env.REACT_APP_API_KEY}`)
//         axios.get(URL).then(result => {
//             setData(result.list)
//             setCity(result.city.name)
//             console.log(result);
//         })
//     }, [lat, long])


//     return (
//         (data.length > 0) ? (
//             data.map((forecast => (
//                 <>
//                     <div>
//                         Your Location: {city}
//                     </div>
//                     <div>
//                         {forecast.weather[0].description}
//                     </div>
//                     <div>
//                         High: {Math.round(forecast.main.temp_max)}°F
//                     </div>
//                     <div>
//                         Low: {Math.round(forecast.main.temp_min)}°F
//                     </div>
//                     <div>
//                         {forecast.weather[0].icon}
//                     </div>
//                     <div>
//                         Day: {moment(forecast.dt_txt).format('dddd')}
//                     </div>
//                     <div>
//                         Date: {moment(forecast.dt_txt).format('LL')}
//                     </div>
//                     <div>
//                         Time: {moment(forecast.dt_txt).format('h:mma')}
//                     </div>
//                 </>
//             )))) : (
//             <div> "Loading" </div>
//         )
//     );
// }