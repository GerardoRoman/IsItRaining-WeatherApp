import useLocalStorageState from 'use-local-storage-state'
// import Login from './components/login.js'
// import Logout from './components/logout.js'
import Registration from './components/registration.js'
import { Routes, Route, Link } from 'react-router-dom'
import AnimalLobby from './components/animalLobby.js'
import Home from './components/home.js'


function App() {
  const [token, setToken] = useLocalStorageState('loginToken', '')
  const [username, setUsername] = useLocalStorageState('userUsername', '')


  // const setAuth = (token, username) => {
  //   setToken(token)
  //   setUsername(username)
  // }


  return (
    <>
      <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/animal-lobby' element={<AnimalLobby />} />
      </Routes>
      </div>
      {/* <Login setAuth={setAuth} />
      <Registration setAuth={setAuth} /> */}
    </>
  );
}
export default App;