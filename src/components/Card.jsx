import React from 'react'

const Card = (props) => {

  return (
    <>
      <p>{`Title: ${props.item.Title}`}</p>
      <p>{`Year: ${props.item.Year}`}</p>
      <img src={props.item.Poster} alt="Картинка Poster" />
    </>
  )
}

export default Card