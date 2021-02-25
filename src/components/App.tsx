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
import Footer from './Footer';

function App() {
  return (
    <Router>
      <Header />
      <main className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/posts" component={Posts} />
          <Route path="/posts/:id" component={PostDetails} />
          {/* Redirect to Home Page on non-exitant routes. This can also be redirected to a /404 page */}
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
