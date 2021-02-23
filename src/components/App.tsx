import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home/Home';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          {/* TODO: Handle Non Existant Routes - redirect to /404 */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
