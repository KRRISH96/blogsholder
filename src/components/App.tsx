import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home/Home';
import Posts from './Posts/Posts';
import PostDetails from './PostDetails/PostDetails';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/posts" component={Posts} />
          <Route path="/posts/:id" component={PostDetails} />
          {/* TODO: Handle Non Existant Routes - redirect to /404 */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
