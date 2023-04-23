import { useState, useEffect} from 'react'
import useAuth from '../hooks/useAuth'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from '../api/axios'
import { LoginForm } from '../ui-components/LoginForm';

const LOGIN_URL = '/login';

function Login() {
    const { setAuthToken } = useAuth()
    const [username, setUsername] = useState<string>('')
    const [password, setpassword] = useState<string>('')
    const [usernameErrorMessage, setUsernameErrorMessage] = useState<string>('')
    const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('')
    const [isUsernameValid, setIsUsernameValid] = useState<boolean>(false)
    const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false)

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/"
    //MOVE VALIDATION METHODS INTO VALIDATION HELPER
    console.log('LOGIN FROM', from)

    useEffect(() => {
        setUsernameErrorMessage('');
    }, [username])

    useEffect(() => {
        setPasswordErrorMessage('');
    }, [password])

    function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>){
        setpassword(event.target.value)
    }
    
    function handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>){
        setUsername(event.target.value);
    }

    function validateUsername(event: React.ChangeEvent<HTMLInputElement>){
        if (event.target.value.trim() === '') {
            setUsernameErrorMessage('User email is required');
            setIsUsernameValid(false)
            return false
        } else if (!/^[A-Za-z0-9._%+-]{1,64}@(?:[A-Za-z0-9-]{1,63}\.){1,125}[A-Za-z]{2,63}$/.test(event.target.value)) {
            setUsernameErrorMessage('Invalid email format')
            setIsUsernameValid(false)
            return false
        } else {
            setIsUsernameValid(true)
            setUsernameErrorMessage('')
            return true
        }
    }

    function validatePassword(event: React.ChangeEvent<HTMLInputElement>){
        if (event.target.value.trim() === "") {
            setPasswordErrorMessage("Password is required.");
            setIsPasswordValid(false)
        } else {
            setIsPasswordValid(true)
            setPasswordErrorMessage("")
        }
      }
      

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault()

        if(!isUsernameValid || !isPasswordValid)
            return null

        try {
            const response = await axios.post(LOGIN_URL, { username, password })
            const accessToken = response?.data?.token
            setAuthToken(accessToken)
            localStorage.setItem('token', accessToken)
            navigate(from, { replace: true })
        } catch (error: any) {
            if (!error?.response) {
                setPasswordErrorMessage('No Server Response');
            } else if (error.response?.status === 400) {
                setPasswordErrorMessage('Missing Username or Password');
            } else if (error.response?.status === 401) {
                setPasswordErrorMessage('Unauthorized');
            } else {
                setPasswordErrorMessage('Login Failed');
            }
        }
    }

    return (
        <LoginForm 
            onSubmit={handleSubmit} 
            username={username}
            usernameLabel={'Email: *'}
            usernameError= {usernameErrorMessage}
            password={password}
            passwordLabel={'Password: *'} 
            passwordError= {passwordErrorMessage}
            buttonLabel={'Login'} 
            onPasswordChange={handlePasswordChange} 
            onUsernameChange={handleUsernameChange} 
            onValidateUsername={validateUsername} 
            onValidatePassword={validatePassword }/>

    )
}

export { Login }