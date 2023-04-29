import useLocalStorageState from 'use-local-storage-state'
import Login from './components/login.js'
import Registration from './components/registration.js'
import { Routes, Route, Link } from 'react-router-dom'
import AnimalLobby from './components/animalLobby.js'
import Home from './components/home.js'
import Loading from './components/loading.js'



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
          <Route path='/' element={<Home token={token} setAuth={setAuth} />} />
          <Route path='/animal-lobby' element={<AnimalLobby token={token} username={username} />} />
          <Route path='/login' element={<Login setAuth={setAuth} />} />
          <Route path='/register' element={<Registration setAuth={setAuth} />} />
          <Route path='/loader' element={<Loading />} />
        </Routes>
      </div>
    </>
  );
}
export default App;