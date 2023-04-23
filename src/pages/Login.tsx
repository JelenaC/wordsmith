import { useRef, useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from '../api/axios'

const LOGIN_URL = '/login';

function Login() {
    const { setAuth, setAuthToken } = useAuth()

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/"
    console.log('LOGIN FROM', from)

    const userRef = useRef<HTMLInputElement>(null)
    const errorRef = useRef<HTMLInputElement>(null)

    const [username, setUsername] = useState('')
    const [password, setpassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        userRef.current && userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrorMessage('');
    }, [username, password])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL, { username, password })
            console.log(JSON.stringify(response?.data))
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.token
            setAuth({ username, password, accessToken })
            setAuthToken(accessToken)
            localStorage.setItem('token', accessToken);
            setUsername('');
            setpassword('');
            navigate(from, { replace: true });
        } catch (error: any) {
            if (!error?.response) {
                setErrorMessage('No Server Response');
            } else if (error.response?.status === 400) {
                setErrorMessage('Missing Username or Password');
            } else if (error.response?.status === 401) {
                setErrorMessage('Unauthorized');
            } else {
                setErrorMessage('Login Failed');
            }
            errorRef.current && errorRef.current.focus();
        }
    }

    return (

        <section>
            <p ref={errorRef} className={errorMessage ? "errmsg" : "offscreen"} aria-live="assertive">{errorMessage}</p>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setpassword(e.target.value)}
                    value={password}
                    required
                />
                <button>Sign In</button>
            </form>
        </section>

    )
}

export { Login }