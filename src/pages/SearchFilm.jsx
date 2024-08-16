import React, { useState } from 'react'
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { filmsState/*, filmsList */} from '../slices/filmsSlice'
import { fetchFilms, fetchFilm, favoriteFilm } from '../slices/filmsSlice'
import Card from '../components/Card/';


const searchFilm = () => {
  const [ form, setForm ] = useState({
    name: '',
    text: ''
  })
  const { text } = form
  const { films, loading, error } = useSelector((state) => state.films);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchFilms(text))
    setForm(preForm => ({...preForm, text: ''}))
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(preForm => ({...preForm, [name]: value}))
  }

  const handleChooseFilm = (e) => {
    dispatch(fetchFilm(e))
  }

  const handleFavoiteFilm = (e) => {
    dispatch(favoriteFilm(e))
  }

  return (
    <>
      <form className='search-main' onSubmit={handleSubmit}>
        <input name='text' className='input' type="text" placeholder={'введите название фильма'} value={text} onChange={handleChange}/>
        <button>Найти</button>
      </form>
      <NavLink to={'/favorite'}>
        <button>ИЗБРАННОЕ</button>
      </NavLink>
      <div className='view'>
        {loading && <h1>Loading...</h1>}
        {error && <h1>{error}</h1>}
        {films==undefined ? <h1>Не найдено</h1> : films.map(i => (
          <div key={i.imdbID}>
            <div className='favorite' onClick={() => handleFavoiteFilm(i.imdbID)}>Добавить в избранное</div>
            <NavLink to={'/film'} id={i.imdbID}>
              <div className='card' id={i.imdbID} onClick={() => handleChooseFilm(i.imdbID)}><Card item={i}/></div>
            </NavLink>
          </div>
        ))}
      </div>
    </>
  )
}

export default searchFilm