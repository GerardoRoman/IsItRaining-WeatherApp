import React, { useEffect, useState } from 'react'
import axios from 'axios';
import CurrentWeather from './components/currentWeather.js'
import WeeklyWeather from './components/weeklyWeather.js'
import HourlyWeather from './components/hourlyWeather.js'
import css from './App.css'
import blueTrexRoar from './assets/trexImages/trex_a_1_by_cleopatrawolf_dfujqzu-350t.png'
import mainBackgroundImage from './assets/backgroundImages/4_edit_by_cleopatrawolf_dfut2ry.png'


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
      <CurrentWeather lat={lat} long={long} />
      {/* <HourlyWeather lat={lat} long={long} /> */}
      {/* <WeeklyWeather lat={lat} long={long} /> */}
      <img className='blue-trex-roar' src={blueTrexRoar} alt="Blue T-Rex Roaring"></img>
      <div style={{ backgroundImage: `url(${mainBackgroundImage})`, backgroundRepeat: "no-repeat", backgroundSize: "contain", height: 1200, width: 720 }}></div>

    </div>
  );
}

export default App;
