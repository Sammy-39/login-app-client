import { createContext, useContext } from 'react'

export const themes = {
    dark:{
        color: 'white',
        backgroundColor: '#222'
    },
    light:{
        color: 'black',
        backgroundColor: 'white'
    }
}

const defaultValue = { 
    theme: localStorage.getItem('theme') ? JSON.parse(localStorage.getItem("theme")) : themes.light
}

export const ThemeContext = createContext(defaultValue)

export const ThemeContextValue = () => useContext(ThemeContext)