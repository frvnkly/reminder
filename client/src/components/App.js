import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import { fetchUser } from '../actions/authActions';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Route path='/' exact component={Landing} />
          <Route path='/dashboard' component={Dashboard} />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, { fetchUser })(App);
