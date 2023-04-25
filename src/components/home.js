import React, { useEffect, useState } from 'react'
import useLocalStorageState from 'use-local-storage-state'
import CurrentWeather from './components/currentWeather.js'
import HourlyWeather from './components/hourlyWeather.js'
// import Login from './components/login.js'
// import Logout from './components/logout.js'
import Registration from './components/registration.js'
import { Routes, Route, Link } from 'react-router-dom'
import AnimalLobby from './components/animalLobby.js'
import mainBackgroundImage from './assets/backgroundImages/4_edit_by_cleopatrawolf_dfut2ry.png'
// import { useNavigate } from 'react-router-dom'

// export const ToAL = () => {
//   const navigate = useNavigate()

//   return(
//       <>
//       <button onClick={() => navigate('animal-lobby', { replace: true })}>To animal lobby!</button>
//       </>
//   )
// }

function App() {
    const [lat, setLat] = useState(null)
    const [long, setLong] = useState(null)
    const [token, setToken] = useLocalStorageState('loginToken', '')
    const [username, setUsername] = useLocalStorageState('userUsername', '')
    const [hourlyTemps, setHourlyTemps] = useState([])


  // const setAuth = (token, username) => {
  //   setToken(token)
  //   setUsername(username)
  // }


    useEffect(() => {
    const getData = async () => {
        navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
    });
      // console.log("Latitude is:", lat)
      // console.log("Longitude is:", long)
    }
    getData();
}, [lat, long]);


    return (
    <>
        <div>
        <Link to='/animal-lobby'>
        <button>Go to Animal Lobby!</button>
        </Link>
        <Routes>
        <Route path='/animal-lobby' element={<AnimalLobby />} />
        </Routes>
        </div>
        <CurrentWeather lat={lat} long={long} hourlyTemps={hourlyTemps} />
        <HourlyWeather lat={lat} long={long} setHourlyTemps={setHourlyTemps} />
        <div className="backgroundImage" style={{ backgroundImage: `url(${mainBackgroundImage})`, backgroundRepeat: "no-repeat", backgroundSize: "contain", height: 1200, width: 720 }}></div>
        {/* <Login setAuth={setAuth} />
      <Registration setAuth={setAuth} /> */}
    </>
    );
}
export default App;