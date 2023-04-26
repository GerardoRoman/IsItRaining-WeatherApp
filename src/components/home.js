import React, { useEffect, useState } from 'react'
import CurrentWeather from './currentWeather.js'
import HourlyWeather from './hourlyWeather.js'
import Login from './login.js'
import mainBackgroundImage from '../assets/backgroundImages/4_edit_by_cleopatrawolf_dfut2ry.png'
import { Link } from 'react-router-dom'

function Home({ token }) {
    const [lat, setLat] = useState(null)
    const [long, setLong] = useState(null)
    const [hourlyTemps, setHourlyTemps] = useState([])


    useEffect(() => {
        const getData = async () => {
            navigator.geolocation.getCurrentPosition(function (position) {
                setLat(position.coords.latitude);
                setLong(position.coords.longitude);
            });
            console.log("Latitude is:", lat)
            console.log("Longitude is:", long)
        }
        getData();
    }, [lat, long]);


    return (
        <>
            <CurrentWeather lat={lat} long={long} hourlyTemps={hourlyTemps} token={token} />
            <HourlyWeather lat={lat} long={long} setHourlyTemps={setHourlyTemps} />
            <div className="backgroundImage" style={{ backgroundImage: `url(${mainBackgroundImage})`, backgroundRepeat: "no-repeat", backgroundSize: "contain", height: 1200, width: 720 }}></div>
            {token ? (
                <Link to='/animal-lobby'>
                    <button>Go to Animal Lobby!</button>
                </Link>
            ) : (
                <Link to='/login'>
                    <button>Login!</button>
                </Link>
            )}
        </>
    );
}
export default Home;