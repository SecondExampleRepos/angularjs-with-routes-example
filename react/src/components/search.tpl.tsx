import React, { useState, useEffect } from 'react';

interface Show {
  // Define the properties of a show object
  id: number;
  name: string;
  // Add other properties as needed
}

const SearchComponent: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean | null>(null);
  const [shows, setShows] = useState<Show[]>([]);

  const setSearch = () => {
    if (!query) return;
    setLoading(true);
fetch(`https://api.example.com/shows?query=${query}`)
  .then(response => response.json())
  .then(fetchedShows => {
    setShows(fetchedShows);
    setLoading(false);
  })
  .catch(error => {
    console.error('Error fetching shows:', error);
    setLoading(false);
  });
    // Example: fetchShows(query).then(fetchedShows => { setShows(fetchedShows); setLoading(false); });
  };

  return (
    <div className="search-top">
      <div className="input-group">
        <input
          type="text"
          className="form-control input-lg"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && setSearch()}
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
            {shows.map((show) => (
              <li key={show.id} className="col-xs-6 col-md-4 repeat-animation">
                <ShowComponent show={show} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

interface ShowComponentProps {
  show: Show;
}

const ShowComponent: React.FC<ShowComponentProps> = ({ show }) => {
  return (
    <div>
      {/* Render the show details here */}
      <h3>{show.name}</h3>
      {/* Add other show details as needed */}
    </div>
  );
};

export default SearchComponent;