// react/src/components/popular.tpl.tsx

import React from 'react';

interface Show {
  // Define the properties of a show object
  id: number;
  name: string;
  // Add other properties as needed
}

interface PopularProps {
  shows: Show[];
}

const Popular: React.FC<PopularProps> = ({ shows }) => {
  return (
    <div className="trending-results">
      {shows.length === 0 ? (
        <div className="no-data">There are no popular shows available to display</div>
      ) : (
        <ul className="list-of-shows">
          {shows.map((show) => (
            <li key={show.id} className="col-xs-6 col-md-4 repeat-animation">
              <ShowComponent show={show} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

interface ShowComponentProps {
  show: Show;
}

const ShowComponent: React.FC<ShowComponentProps> = ({ show }) => {
  return (
    <div>
      {/* Render show details here */}
      <h3>{show.name}</h3>
      {/* Add other show details as needed */}
    </div>
  );
};

export default Popular;