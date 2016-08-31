import React, { Component } from 'react';
import { withRouter } from 'react-router';

import Header from './header';

class App extends Component {
  constructor(props) {
    super(props);

    this._handleLogout = this._handleLogout.bind(this);
  }

  componentDidMount() {}

  componentDidUpdate() {}

  _handleLogout() {}

  render() {
    const { children, isAuthenticated, userId } = this.props;

    return (
      <div>
        <Header
          isAuthenticated={isAuthenticated}
          loginHandler={this._handleLogin}
          logoutHandler={this._handleLogout}
          userId={userId}
        />

        <div>
          {children}
        </div>
      </div>
    );
  }
}

App = withRouter(App);

export default App;
