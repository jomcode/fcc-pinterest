import React, { Component } from 'react';
import { withRouter } from 'react-router';

class App extends Component {
  componentDidMount() {}
  componentDidUpdate() {}

  render() {
    const { children } = this.props;

    return (
      <div>
        <h1>app.jsx</h1>
        {children}
      </div>
    );
  }
}

App = withRouter(App);

export default App;
