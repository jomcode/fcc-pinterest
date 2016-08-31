import React, { Component } from 'react';
import { withRouter } from 'react-router';

import Header from './header';

class App extends Component {
  constructor(props) {
    super(props);

    this._handleLogout = this._handleLogout.bind(this);
  }

  componentDidMount() {
    const { actions: { loginUser }, dispatch } = this.props;
    dispatch(loginUser());
  }

  componentDidUpdate() {}

  _handleLogout() {
    const { actions: { logoutUser }, dispatch } = this.props;
    dispatch(logoutUser());
  }

  render() {
    const { children, auth, currentUser } = this.props;

    return (
      <div>
        <Header
          auth={auth}
          logoutHandler={this._handleLogout}
          currentUser={currentUser}
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
