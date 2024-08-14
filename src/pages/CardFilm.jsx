import React from 'react'
import { useSelector } from "react-redux";

const CardFilm = () => {
  const { film } = useSelector((state) => state.films);
  return (
    <>
      <img src={film.Poster} alt={film.Title} />
      <p>{`Title: ${film.Title}`}</p>
      <p>{`Year: ${film.Year}`}</p>
      <p>{`Genre: ${film.Genre}`}</p>
      <p>{`Runtime: ${film.Runtime}`}</p>
      <p>{`Director: ${film.Director}`}</p>
      <p>{`Actors: ${film.Actors}`}</p>
      <p>{`imdbRating: ${film.imdbRating}`}</p>
    </>
  )
}


export default CardFilm