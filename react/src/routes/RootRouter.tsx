// react/src/routes/RootRouter.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Contact from './Contact';
// SECOND AGENT: [MISSING CONTEXT] - Add other route imports here as needed

const RootRouter: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
<Route path="/services" component={Services} />
<Route path="/portfolio" component={Portfolio} />
<Route path="/blog" component={Blog} />
<Route path="/faq" component={FAQ} />
      </Switch>
    </Router>
  );
};

export default RootRouter;