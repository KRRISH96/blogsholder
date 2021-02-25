import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Home from './Home/Home';
import Posts from './Posts/Posts';
import PostDetails from './PostDetails/PostDetails';
import Header from './Header/Header';

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/posts" component={Posts} />
          <Route path="/posts/:id" component={PostDetails} />
          {/* Redirect to Home Page on non-exitant routes. This can also be redirected to a /404 page */}
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
