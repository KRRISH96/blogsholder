import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home/Home';
import Posts from './Posts/Posts';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/posts" component={Posts} />
          {/* TODO: Handle Non Existant Routes - redirect to /404 */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
