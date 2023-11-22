import { useState } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom'

import AuthContext from "./contexts/authContext.js"
import * as authService from '../src/services/authService.js'

import GameCreate from "./components/game-create/gameCreate.jsx"
import GameList from "./components/game-list/GameList.jsx"
import Header from "./components/header/Header.jsx"
import Home from "./components/home/Home.jsx"
import Login from "./components/login/Login.jsx"
import Register from "./components/register/Register.jsx"
import GameDetails from "./components/game-details/GameDetails.jsx"
import Path from "./paths.js";
import Logout from "./components/logout/logout.jsx";


function App() {
  const navigate = useNavigate();

  const [auth, setAuth] = useState(()=>{
    localStorage.removeItem('accessToken');

    return {}
  });

  const loginSubmitHandler = async (values) => {
    const result = await authService.login(values.email, values.password);

    setAuth(result);
    localStorage.setItem('accessToken', result.accessToken);

    navigate(Path.Home);
  };

  const registerSubmitHandler =async (values) => {
    const result = await authService.register(values.email, values.password);

    setAuth(result);
    localStorage.setItem('accessToken', result.accessToken);

    navigate(Path.Home);
  };

  const logoutHandler =()=> {
    setAuth({});
    localStorage.removeItem('accessToken');

  }
  const values = {
    loginSubmitHandler,
    registerSubmitHandler,
    logoutHandler,
    username:auth.username,
    email:auth.email,
    isAuthenticated: !!auth.accessToken
  }


  return (
    <AuthContext.Provider value={values}>
      <div id="box">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<GameList />} />
          <Route path="/games/create" element={<GameCreate />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/games/:gameId" element={<GameDetails />} />
          <Route path={Path.Logout} element= {<Logout />} />

        </Routes>
      </div>
    </AuthContext.Provider>
  )
}

export default App
