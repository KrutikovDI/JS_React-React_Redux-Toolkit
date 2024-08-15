import './App.css'
import { Route, Routes } from 'react-router-dom'
import SearchFilm from './pages/SearchFilm/'
import CardFilm from './pages/CardFilm'
import FavoritesFilms from './pages/FavoritesFilms'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<SearchFilm/>}/>
      <Route path='/film' element={<CardFilm/>}/>
      <Route path='/favorite' element={<FavoritesFilms/>}/>
    </Routes>
    </>
  )
}

export default App
