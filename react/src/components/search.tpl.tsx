import React, { useState } from 'react';
import useRootScope from '../../hooks/useRootScope';

interface Show {
  // Define the properties of a show here
  // Example:
  // id: number;
  // name: string;
}

const SearchComponent: React.FC = () => {
  const { state } = useRootScope();
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean | null>(null);
  const [shows, setShows] = useState<Show[]>([]);

  const setSearch = () => {
    setLoading(true);
    fetch(`https://api.example.com/shows?query=${query}`)
      .then(response => response.json())
      .then(fetchedShows => {
        setShows(fetchedShows);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
    // Example:
    // fetchShows(query).then(fetchedShows => {
    //   setShows(fetchedShows);
    //   setLoading(false);
    // }).catch(() => {
    //   setLoading(false);
    // });
  };

  return (
    <div className="search-top">
      <div className="input-group">
        <input
          type="text"
          className="form-control input-lg"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              setSearch();
            }
          }}
        />
        <span className="input-group-btn">
          <button
            className="btn btn-info btn-lg search-btn"
            type="button"
            disabled={!query}
            onClick={setSearch}
          >
            <span className="glyphicon glyphicon-search"></span> Search
          </button>
        </span>
      </div>
      <div className="search-results">
        {loading === null && (
          <div className="no-data">
            Use the search box above to find your favorite TV shows
          </div>
        )}
        {shows.length === 0 && loading === false && (
          <div className="no-data">
            Your search did not return any results
          </div>
        )}
        {loading && <div className="throbber"></div>}
        {!loading && (
          <ul className="list-of-shows">
            {shows.map((show, index) => (
              <li key={index} className="col-xs-6 col-md-4 repeat-animation">
                <ShowComponent show={show} />
              </li>
            ))}
          </ul>
        )}
      </div>
return <div>{show.name}</div>;
  );
};

const ShowComponent: React.FC<{ show: Show }> = ({ show }) => {
  // Render the show details here
  // Example:
  // return <div>{show.name}</div>;
return (
  <div>
    <h3>{show.name}</h3>
    <p>{show.description}</p>
    <img src={show.image} alt={show.name} />
  </div>
);
};

export default SearchComponent;