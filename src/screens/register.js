import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import M from 'materialize-css'

import Loader from '../components/Loader'
import { register } from '../actions/user'
import { ThemeContextValue } from '../context/themeContext'
import logo from "../assets/logo.png"
import '../styles/register.css'

const Regsiter = ({ history }) =>{

    const { themeVal } = ThemeContextValue()

    const [name, setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [disable,setDisable] = useState(false)
    const [showPassword,setShowPassword] = useState(false)

    const {loading, error, message} = useSelector(state=>state.Register)
    const { user } = useSelector(state=>state.User)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(Object.keys(user).length!==0){
            history.push("/profile")
        }
        // eslint-disable-next-line
    },[user])
    
    useEffect(()=>{
        if(message){
            setName('')
            setEmail('')
            setPassword('')
            M.toast({
                html: 'Registered Successfully!' , 
                classes: '#33691e light-green darken-4', 
                displayLength: 2000
            })
            history.push('/login')
            dispatch({type:"USER_REGISTER_INITIAL_STATE"})
        }
        // eslint-disable-next-line
    },[message])

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
            dispatch({type:"USER_REGISTER_INITIAL_STATE"})
        }
        // eslint-disable-next-line
    },[error])

    const handleShowPassword = () =>{
        if(showPassword) { setShowPassword(false) }
        else{ setShowPassword(true) }
    }

    const handleRegister = (e) =>{
        M.Toast.dismissAll()
        e.preventDefault()
        dispatch(register(name,email,password))
    }
 
    return(
        <div className="register" style={themeVal}>
            <div className="register-form">
                {loading && <Loader />} 
                <h5> <img src={logo} alt='' />  Register </h5>
                <form onSubmit={e=>handleRegister(e)}>
                    <div className="input-field"> 
                        <input id="name" type="text" value={name} required style={themeVal}
                        onChange={e=>setName(e.target.value)} disabled={disable} />
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className="input-field"> 
                        <input id="email" type="email" value={email} required style={themeVal}
                        onChange={e=>setEmail(e.target.value)} disabled={disable} />
                        <label htmlFor="email">Email</label>
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
                        <label htmlFor="password">Password</label>
                    </div>
                    <button className="btn register-btn #6200ea deep-purple accent-4" type="submit"
                    disabled={disable}> 
                        Continue 
                     </button>
                    <Link className="login-link" 
                     to={ disable ? '#' : '/login'}> 
                     Already have an account? Login </Link>
                </form>
            </div>
        </div>
    )
}

export default Regsiter