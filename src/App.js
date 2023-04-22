import React, { useEffect, useState } from 'react'
import axios from 'axios';
import CurrentWeather from './components/currentWeather.js'
import WeeklyWeather from './components/weeklyWeather.js'
import HourlyWeather from './components/hourlyWeather.js'
import mainBackgroundImage from './assets/backgroundImages/4_edit_by_cleopatrawolf_dfut2ry.png'
// import Animal from './components/animals.js'



function App() { // { weatherID }
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
      {/* <Animal weatherID={weatherID} /> */}
      <div style={{ backgroundImage: `url(${mainBackgroundImage})`, backgroundRepeat: "no-repeat", backgroundSize: "contain", height: 1200, width: 720 }}></div>

    </div>
  );
}

export default App;