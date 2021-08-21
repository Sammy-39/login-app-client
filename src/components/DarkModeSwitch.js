import React, { useEffect, useRef } from 'react'

import { themes, ThemeContextValue } from '../context/themeContext'
import '../styles/darkModeSwitch.css'

const DarkModeSwitch = () =>{

    const { themeVal, toggleTheme } = ThemeContextValue()

    const switchRef = useRef()

    useEffect(()=>{
       if(themeVal.backgroundColor === '#222'){
           switchRef.current.checked = true
       }
    },[themeVal])

    const handleSwitch = (e) =>{
        if(e.target.checked){
            toggleTheme(themes.dark)
        }
        else{
            toggleTheme(themes.light)
        }
    }

    return(
        <div className="switch" style={themeVal}>
            <label>
                { themeVal.backgroundColor === 'white' && <i className='material-icons'> light_mode </i> }
            <input type="checkbox" onChange={(e)=>handleSwitch(e)} ref={switchRef} />
            <span className="lever"></span>
                { themeVal.backgroundColor === '#222' && <i className='material-icons'> dark_mode </i> }
            </label>
        </div>
    )
}
export default DarkModeSwitch