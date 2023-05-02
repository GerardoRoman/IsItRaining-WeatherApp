import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { TiArrowBack } from 'react-icons/ti'
import "./../styles/registration.css"


const Registration = ({ setAuth }) => {
    const [userName, setUserName] = useState('')
    const [passWord, setPassWord] = useState('')
    const [error, setError] = useState('')
    const [issue, setIssue] = useState('')
    const navigate = useNavigate();


    const handleRegister = (event) => {
        event.preventDefault()
        axios.post('https://is-it-raining.herokuapp.com/auth/users/', {
            username: userName,
            password: passWord
        }).then(res => {
            axios.post('https://is-it-raining.herokuapp.com/auth/token/login',
                {
                    username: userName,
                    password: passWord,

                }).then(res => {
                    const token = res.data.auth_token;
                    setAuth(token, userName);
                    navigate("/");
                })
        }).catch(error => {
            setIssue(error.message)
            console.log(error.message)
            console.log(error)
        })
    }


    return (
        <>
            <div className="registrationPage">
                <div className="RegistrationGreeting">
                    <h1>
                        <span>Sign Up</span>
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
                    <form onFocus={() => setError(null)} onSubmit={handleRegister}>
                        <div>
                            <label className="usernameRegister"><span>username: </span></label>
                            <input
                                type='text'
                                name='username'
                                id='username'
                                value={userName}
                                required
                                onChange={(e) => setUserName(e.target.value)}
                            >
                            </input>
                        </div>
                        <div>
                            <label className="passwordRegister"><span>password: </span></label>
                            <input
                                type='password'
                                name='password'
                                id='password'
                                value={passWord}
                                required
                                onChange={(e) => setPassWord(e.target.value)}
                            >
                            </input>
                        </div>
                        <div className="disclaimerPassword">
                            <p>* password must be a minimum of 8 characters *</p>
                        </div>
                        {issue &&
                            <div className="errorPassword">
                                Issue with username or password. Try again.
                            </div>
                        }
                        <div>
                            <button className="submitButtonRegister" type='submit'>Submit!</button>
                        </div>
                        <div className='registerNavBar'>
                            <Link to='/login'>
                                <button className='backToLogin'>
                                    <div><TiArrowBack /></div>
                                </button>
                            </Link>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
};

export default Registration