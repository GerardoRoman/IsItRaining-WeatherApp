import "../styles/login.css"
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'


const Login = ({ setAuth }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate();


    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(event)
        console.log(username)
        console.log(password)
        axios.post('https://is-it-raining.herokuapp.com/auth/token/login', {
            username: username,
            password: password,
        }).then(res => {
            const token = res.data.auth_token;
            setAuth(token, username);
            console.log(res.data);
            navigate("/");
        })
    };


    return (
        <>
            <div className="loginPage">

                <div className="LogInGreeting">
                    <h1>
                        <span>Log In</span>

                    </h1>
                    <div className="blobs">
                        <div className="blobs_1"></div>
                        <div className="blobs_2"></div>
                        <div className="blobs_3"></div>
                        <div className="blobs_4"></div>
                        <div className="blobs_5"></div>
                    </div>
                </div>
                <div className='login-form'>
                    <form onFocus={() => setError(null)} onSubmit={handleSubmit}>
                        <div>
                            <label className="usernameLogin"> <span>username: </span></label>
                            <input
                                type='text'
                                name='username'
                                id='username'
                                value={username}
                                required
                                onChange={(e) => setUsername(e.target.value)}
                            />

                        </div>
                        <div>
                            <label className="passwordLogin"><span>password:  </span></label>
                            <input
                                type='password'
                                name='password'
                                id='password'
                                value={password}
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />

                        </div>
                        <div>
                            <button className="submitButtonLogin" type='submit'>Submit!</button>
                        </div>
                        <div className="signUpPrompt" type='submit'>
                            <p>Not a member yet?</p>
                            <a className="signUpLink" href="/register">Sign Up!</a>
                        </div>
                    </form>
                </div>
            </div>
            <div>
                <Link to='/'>
                    <button className="backToWeatherButton">Back to the weather!</button>
                </Link>
            </div>
        </>
    )
}


export default Login