import React, { useEffect, useState } from 'react'
import axios from 'axios';
import CurrentWeather from './components/currentWeather.js'
import WeeklyWeather from './components/weeklyWeather.js'
import HourlyWeather from './components/hourlyWeather.js'
import myImage from './assets/trex_a_1_by_cleopatrawolf_dfujqzu-350t.png'
import image from './assets/4_by_cleopatrawolf_dfuq86t.png'
import css from './App.css'


function App() {
  const [lat, setLat] = useState(null)
  const [long, setLong] = useState(null)
  const [userPos, setUserPos] = useState({ lat: null, long: null })


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
    <div className='home-component'>
      {/* <CurrentWeather lat={lat} long={long} /> */}
      <HourlyWeather lat={lat} long={long} />
      {/* <WeeklyWeather lat={lat} long={long} /> */}
      <img className='t-rex' src={myImage} alt='t=rex'></img>
      <div style={{ backgroundImage: `url(${image})`, backgroundRepeat: "no-repeat", backgroundSize: "contain", height: 1200, width: 720 }}></div>

    </div>
  );
}

export default App;
