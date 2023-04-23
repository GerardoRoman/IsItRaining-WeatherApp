import React, { useEffect, useState } from 'react'
import useLocalStorageState from 'use-local-storage-state'
import CurrentWeather from './components/currentWeather.js'
import HourlyWeather from './components/hourlyWeather.js'
import Login from './components/login.js'
import Logout from './components/logout.js'
import Registration from './components/registration.js'
import mainBackgroundImage from './assets/backgroundImages/4_edit_by_cleopatrawolf_dfut2ry.png'




function App() {
  const [lat, setLat] = useState(null)
  const [long, setLong] = useState(null)
  const [token, setToken] = useLocalStorageState('loginToken', '')
  const [username, setUsername] = useLocalStorageState('userUsername', '')


  const setAuth = (token, username) => {
    setToken(token)
    setUsername(username)
  }


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
      {token ? (
        <>
          <CurrentWeather lat={lat} long={long} token={token} />
          <HourlyWeather lat={lat} long={long} token={token} />
          <div style={{ backgroundImage: `url(${mainBackgroundImage})`, backgroundRepeat: "no-repeat", backgroundSize: "contain", height: 1200, width: 720 }}></div>
        </>
      ) : (
        <>
          <Login setAuth={setAuth} />
          <Registration setAuth={setAuth} />
        </>
      )
      }
    </>
  );
}
export default App;