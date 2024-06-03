import React, { useState, useEffect } from 'react';
import ShowService from '../../services/showService'; // Adjust the import path as necessary

interface ShowProps {
  show: {
    id: number;
    backdrop_path: string;
    first_air_date: string;
    original_name: string;
    vote_average: number;
    origin_country: string[];
  };
}

interface Genre {
  name: string;
}

const Show: React.FC<ShowProps> = ({ show }) => {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    ShowService.get(show.id).then(response => {
      setGenres(response.genres);
    });
  }, [show.id]);

  return (
    <div className="show-frame">
      <ul className="genres">
        {genres.map((genre, index) => (
          <li
            key={index}
            className="animate-repeat"
            style={{ backgroundColor: `rgba(59, 185, 187, ${genres.length / (index + 1) / 5})` }}
          >
            {genre.name}
          </li>
        ))}
      </ul>
      <img
        src={`http://image.tmdb.org/t/p/w780/${show.backdrop_path}`}
        alt="Show backdrop"
        onError={(e) => {
          e.currentTarget.src = 'assets/images/fallback.jpg';
        }}
      />
      <div className="date label label-dark">
        <span className="icon icon-calendar"></span> {new Date(show.first_air_date).toLocaleDateString('en-GB')}
      </div>
      <h2>{show.original_name.length > 40 ? show.original_name.substring(0, 40) + '...' : show.original_name}</h2>
      <div className="inner">
        <ul className="info">
          <li className="col-xs-6 rating">
            <span className="icon icon-heart3"></span> {show.vote_average}
          </li>
          <li className="col-xs-6 country">
            <span className="icon icon-earth"></span>
            {show.origin_country.length > 0 ? (
              show.origin_country.map((country, index) => (
                <span key={index}>
                  {country}
                  {index < show.origin_country.length - 1 ? ', ' : ''}
                </span>
              ))
            ) : (
              <span>--</span>
            )}
          </li>
          <div className="clearfix"></div>
        </ul>
        <div className="buttons">
          <a href={`#/view/${show.id}`} className="btn btn-info">
            <span className="icon icon-arrow-right7"></span> View
          </a>
        </div>
      </div>
    </div>
  );
};

export default Show;