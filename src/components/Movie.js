import React from 'react';

import classes from './Movie.module.css';

const Movie = (props) => {
  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.director}</h3>
      <h4>{props.releaseDate}</h4>
      <p>{props.openingText}</p>
    </li>
  );
};

export default Movie;
