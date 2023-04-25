import useLocalStorageState from 'use-local-storage-state'
import Login from './components/login.js'
import Registration from './components/registration.js'
import { Routes, Route, Link } from 'react-router-dom'
import AnimalLobby from './components/animalLobby.js'
import Home from './components/home.js'


function App() {
  const [token, setToken] = useLocalStorageState('loginToken', '')
  const [username, setUsername] = useLocalStorageState('userUsername', '')


  const setAuth = (token, username) => {
    setToken(token)
    setUsername(username)
  }


  return (
    <>
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/animal-lobby' element={<AnimalLobby />} />
          <Route path='/login' element={<Login setAuth={setAuth} />} />
          <Route path='/register' element={<Registration setAuth={setAuth} />} />
        </Routes>
      </div>
    </>
  );
}
export default App;