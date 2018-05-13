import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Ranking from './containers/Ranking';
import Nav from './containers/Nav';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />

        <Switch>
          <Route path="/all" component={Ranking} />
          <Route path="/category/1" render={() => <Redirect to="/all" />} />
          <Route
            path="/category/:id"
            render={({ match }) => <Ranking categoryId={match.params.id} />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
