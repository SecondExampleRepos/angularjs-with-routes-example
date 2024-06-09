// react/src/components/index.tsx

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { BarController } from './bar.ctrl';
import { Home } from './home.ctrl';
import { Premieres } from './premieres.ctrl';
import { Popular } from './popular.ctrl';
import { Search } from './search.ctrl';
import { View } from './view.ctrl';

const App: React.FC = () => {
  const [barData, setBarData] = useState({ title: '', description: '', loading: false });

  useEffect(() => {
    const fetchBarData = async () => {
      try {
        const response = await fetch('/api/bar-data');
        const data = await response.json();
        setBarData(data);
      } catch (error) {
        console.error('Error fetching bar data:', error);
      }
    };
    fetchBarData();
  }, []);

  return (
    <Router>
      <div>
        <header id="site-header">
          <div className="container">
            <div className="pull-left logo">ANGULARJS <span className="alt">BY</span> EXAMPLE</div>
            <ul className="pull-right menu">
              <li><Link to="/">HOME</Link></li>
              <li><Link to="/premieres">PREMIERES</Link></li>
              <li><Link to="/popular">POPULAR</Link></li>
              <li><Link to="/search">SEARCH</Link></li>
            </ul>
          </div>
        </header>

        <section id="site-bar">
          <div className="container">
            <h1>{barData.title}</h1>
            <p>{barData.description}</p>
          </div>
          {barData.loading && <div className="page-loader"><div className="throbber"></div></div>}
        </section>

        <section id="main">
          <div className="container">
            <Route path="/" exact component={Home} />
            <Route path="/premieres" component={Premieres} />
            <Route path="/popular" component={Popular} />
            <Route path="/search" component={Search} />
            <Route path="/view" component={View} />
          </div>
        </section>
      </div>
    </Router>
  );
};

export default App;