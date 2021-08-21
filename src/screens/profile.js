import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Loader from '../components/Loader'
import { logout } from '../actions/user'
import { ThemeContextValue } from '../context/themeContext'
import logo from "../assets/logo.png"
import '../styles/profile.css'

const Profile = ({history}) =>{

    const { themeVal } = ThemeContextValue()

    const {loading, error, user} = useSelector(state=>state.User)
    const dispatch = useDispatch()

    const handleLogout = () =>{
        dispatch(logout())
        history.push("/login")
    }

    return(
        <div className="profile" style={themeVal}>
            <div className="profile-body">
                { loading && <Loader />} 
                <h5> <img src={logo} alt='' /> Profile </h5>
                {
                    (Object.keys(user).length===0 || error) && 
                    <div className="profile-error">
                        <p> You need to Login to view your profile </p>
                        <button className="btn #0288d1 light-blue darken-2" 
                         onClick={()=>history.push("/login")}> 
                            Login 
                        </button> 
                    </div>
                }
                {
                    Object.keys(user).length!==0 &&
                    <div className="profile-details">
                        <p className="btn-floating btn-large #ffff00 yellow accent-2"> {user.name[0]} </p>
                        <p> {user.name} </p>
                        <p> {user.email} </p>
                        <button className="btn #0288d1 light-blue darken-2" 
                        onClick={handleLogout}> 
                            Logout
                        </button> 
                    </div>
                }
            </div>
        </div>
    )
}

export default Profile