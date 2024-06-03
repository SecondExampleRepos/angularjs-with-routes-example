import React from 'react';
import useRootScope from '../../hooks/useRootScope';

const Home: React.FC = () => {
  const { someState, setSomeState, someFunction } = useRootScope();

  return (
    <div className="home-frame">
      <div className="home-banner">
        <div className="container inner">
          <img className="hidden-sm hidden-xs" src="assets/images/angular.png" width="400" height="400" alt="AngularJS Logo" />
          <h1>LEARN ANGULARJS <span>THE EASY WAY</span>.</h1>
          <h2>Learn how to build superb AngularJS web applications using real world best practice examples coupled with in-depth tutorials from <a href="#">revillweb.com</a>.</h2>
          <p>This website is a living and breathing AngularJS web application built using recommended best practices. <strong>AngularJS by example</strong> provides you with a complete application demonstrating recommended best practices from app structure all the way through to production deployment.</p>
          <div className="home-buttons">
            <a href="https://github.com/RevillWeb/angularjs-by-example" target="_blank" className="btn btn-lg btn-primary" rel="noopener noreferrer">
              <span className="icon icon-github2"></span> GitHub
            </a>
            <a href="http://www.revillweb.com" target="_blank" className="btn btn-lg btn-default" rel="noopener noreferrer">
              <span className="icon icon-home"></span> RevillWeb
            </a>
          </div>
        </div>
      </div>
      <div className="clearbanner"></div>
      <div className="tutorials-title">
        <div className="container">
          ARTICLES & TUTORIALS
          <div className="hidden-xs share-buttons">
            <div className='shareaholic-canvas' data-app='share_buttons' data-app-id='15135403'></div>
          </div>
        </div>
      </div>
      <div className="container">
        <ul className="tutorials">
          {someState && someState.map((tutorial: any, index: number) => (
            <li key={index} className={tutorial.link === '#' ? 'offline' : ''}>
              <div className="number">#{index + 1}</div>
              <h3>{tutorial.title}</h3>
              <p>{tutorial.description}</p>
              <a href={tutorial.link} className={`btn btn-lg btn-primary ${tutorial.link === '#' ? 'disabled' : ''}`}>
                <span className="icon icon-arrow-up-right5"></span> View
              </a>
              <div className="clearfix"></div>
            </li>
          ))}
        </ul>
        <p className="no-data tuts">More tutorials coming soon...</p>
      </div>
    </div>
  );
};

export default Home;