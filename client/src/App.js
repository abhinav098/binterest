import "./App.css";
import IPostListing from "./components/IPostListing";
import NewPost from "./components/NewPost";
import { Delete } from "@material-ui/icons";
import {
  Switch,
  NavLink,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "http://localhost:4000",
  }),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <header className="App-header">
            <Delete fontSize="large" />
            <span>Binterest</span>
          </header>
          <div className="App-body">
            <div className="navLinks">
              <NavLink
                className="App-link1"
                activeClassName="active"
                to="/my-bin"
              >
                my bin
              </NavLink>
              <span>|</span>
              <NavLink
                className="App-link1"
                exact
                activeClassName="active"
                to="/"
              >
                images
              </NavLink>
              <span>|</span>
              <NavLink
                className="App-link1"
                activeClassName="active"
                to="/my-posts"
              >
                my posts
              </NavLink>
            </div>
            <Switch>
              <Route
                exact
                path="/my-bin"
                render={(props) => (
                  <IPostListing {...props} queryFor="binnedImages" />
                )}
              />
              <Route
                exact
                path="/"
                render={(props) => (
                  <IPostListing {...props} queryFor="unsplashImages" />
                )}
              />
              <Route
                exact
                path="/my-posts"
                render={(props) => (
                  <IPostListing {...props} queryFor="userPostedImages" />
                )}
              />
              <Route exact path="/new-post" component={NewPost} />

              <Route exact path="/404" component={IPostListing} />
              <Route component={IPostListing}></Route>
            </Switch>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
