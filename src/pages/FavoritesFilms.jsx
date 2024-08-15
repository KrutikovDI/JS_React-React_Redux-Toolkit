import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import Card from '../components/Card/';
import { deleteFilm } from '../slices/filmsSlice'

const FavoritesFilms = () => {

  const { favorites } = useSelector((state) => state.films)
  const dispatch = useDispatch();

  const handleDeleteFilm = (e) => {
    dispatch(deleteFilm(e.target.nextElementSibling.id))
  }

  return (
    <div className='view'>
      {favorites.length==0 ? <h1>Добавьте фильм в избранное</h1> : favorites.map(i => (
        <div key={i.imdbID}>
          <div className='favorite' onClick={handleDeleteFilm}>Удалить из избранного</div>
          <div className='card' id={i.imdbID}><Card item={i}/></div>
        </div>
      ))}
    </div>
  )
}

export default FavoritesFilms

