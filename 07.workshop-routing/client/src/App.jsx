import GameCreate from "./components/game-create/gameCreate.jsx"
import GameList from "./components/game-list/GameList.jsx"
import Header from "./components/header/Header.jsx"
import Home from "./components/home/Home.jsx"
import { Routes, Route } from 'react-router-dom'
import Login from "./components/login/Login.jsx"
import Register from "./components/register/Register.jsx"


function App() {

  return (
    <div id="box">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<GameList />} />
        <Route path="/games/create" element={<GameCreate />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Routes>
    </div>
  )
}

export default App
