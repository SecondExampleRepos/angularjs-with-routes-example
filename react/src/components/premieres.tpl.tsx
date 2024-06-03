import React from 'react';

interface Show {
  // Define the properties of a show here
  // Example:
  // id: number;
  // name: string;
  // etc.
}

interface PremieresProps {
  shows: Show[];
}

const Premieres: React.FC<PremieresProps> = ({ shows }) => {
  return (
    <ul className="list-of-shows">
      {shows.map((show, index) => (
        <li className="col-xs-6 col-md-4" key={index}>
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
      {/* Render the show details here */}
      {/* Example: <h2>{show.name}</h2> */}
<h2>{show.name}</h2>
<p>{show.description}</p>
    </div>
  );
};

export default Premieres;