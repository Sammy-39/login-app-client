import React, { useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import M from 'materialize-css'

import Loader from '../components/Loader'
import { login, logout } from '../actions/user'
import { ThemeContextValue } from '../context/themeContext'
import logo from "../assets/logo.png"
import '../styles/login.css'


const Login = ({ history }) =>{

    const { themeVal } = ThemeContextValue()

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [disable,setDisable] = useState(false)
    const [showPassword,setShowPassword] = useState(false)
    
    const {loading, error, user} = useSelector(state=>state.User)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(Object.keys(user).length!==0){
            setEmail('')
            setPassword('')
            history.push("/profile")
        }
        // eslint-disable-next-line
    },[user])

    useEffect(()=>{
        if(loading){
            setDisable(true)
        }
        else{
            setDisable(false)
        }
    },[loading])

    useEffect(()=>{
        if(error){
            M.Toast.dismissAll()
            if(error){ M.toast({html: error , classes: '#dd2c00 deep-orange accent-4'}) }
            dispatch(logout())
        }
        // eslint-disable-next-line
    },[error])

    const handleShowPassword = () =>{
        if(showPassword) { setShowPassword(false) }
        else{ setShowPassword(true) }
    }

    const handleLogin = (e) =>{
        M.Toast.dismissAll()
        e.preventDefault()
        dispatch(login(email,password))
    }
 
    return(
        <div className="login" style={themeVal}>
            <div className="login-form">
                {loading && <Loader />} 
                <h5> <img src={logo} alt='' /> Login </h5>
                <form onSubmit={e=>handleLogin(e)}>
                    <div className="input-field"> 
                        <input id="email" type="email" value={email} required style={themeVal}
                        onChange={e=>setEmail(e.target.value)} disabled={disable} />
                        <label style={themeVal} htmlFor="email">Email</label>
                    </div>
                    <div className="input-field">
                        {
                            !showPassword ? <i className='material-icons visible' 
                            onClick={handleShowPassword}> visibility_off </i> : 
                            <i className='material-icons visible' 
                            onClick={handleShowPassword}> visibility </i>
                        }
                        <input id="password" type={showPassword ? 'text': 'password'} value={password} style={themeVal}
                        onChange={e=>setPassword(e.target.value)} disabled={disable} required />
                        <label style={themeVal} htmlFor="password">Password</label>
                        <Link className="forgot-pwd" to={disable ? '#' : '/forgot-password'}>
                        Forgot password? </Link>
                    </div>
                    <button className="btn login-btn #6200ea deep-purple accent-4" type="submit"
                     disabled={disable}> 
                     Login </button>
                    <Link className="register-link" 
                     to={ disable ? '#':'/register'}> 
                     New to Login App? Signup </Link>
                </form>
            </div>
        </div>
    )
}

export default Login