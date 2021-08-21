import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios'

import Login from './screens/login';
import Register from './screens/register';
import ForgotPassword from './screens/forgotPassword';
import Profile from './screens/profile';
import { ThemeContext, ThemeContextValue } from './context/themeContext'
import DarkModeSwitch from './components/DarkModeSwitch'
import './App.css';


axios.defaults.baseURL = "https://login-app-server.herokuapp.com/api"
axios.defaults.withCredentials = true

const App = () => {

  const { theme } = ThemeContextValue()

  const [ themeVal, setThemeVal ] = useState(theme)

  const toggleTheme = (val) => {
    setThemeVal(val)
    localStorage.setItem('theme', JSON.stringify(val))
  }

  return (
    <ThemeContext.Provider value={{themeVal, toggleTheme}}>
      <BrowserRouter>
        <DarkModeSwitch />
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/forgot-password' component={ForgotPassword} />
          <Route path='/profile' component={Profile} />
        </Switch>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}

export default App;
