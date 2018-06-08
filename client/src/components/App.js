import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './Header';
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
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, { fetchUser })(App);
