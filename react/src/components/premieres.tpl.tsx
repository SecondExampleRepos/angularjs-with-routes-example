// react/src/components/premieres.tpl.tsx

import React from 'react';

interface Show {
  // Define the properties of a show here
  // Example: id: number, name: string, etc.
  id: number;
  name: string;
}

interface PremieresProps {
  shows: Show[];
}

const Premieres: React.FC<PremieresProps> = ({ shows }) => {
  return (
    <ul className="list-of-shows">
      {shows.map((show) => (
        <li key={show.id} className="col-xs-6 col-md-4">
          <ShowComponent show={show} />
        </li>
      ))}
    </ul>
  );
};

interface ShowComponentProps {
  show: Show;
}

const ShowComponent: React.FC<ShowComponentProps> = ({ show }) => {
  return (
    <div>
      {/* Render show details here */}
      <h2>{show.name}</h2>
<p>ID: {show.id}</p>
<p>Additional details about the show can be added here.</p>
    </div>
  );
};

export default Premieres;