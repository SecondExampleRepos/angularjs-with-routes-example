import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Import all the route components
import Home from '../components/Home';
import About from '../components/About';
import Contact from '../components/Contact';
// SECOND AGENT: [MISSING CONTEXT] - Add other route imports here

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