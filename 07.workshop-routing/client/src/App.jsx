import GameList from "./components/game-list/GameList.jsx"
import Header from "./components/header/Header.jsx"
import Home from "./components/home/Home.jsx"
import { Routes, Route } from 'react-router-dom'


function App() {

  return (
    <div id="box">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<GameList />} />

      </Routes>
    </div>
  )
}

export default App
