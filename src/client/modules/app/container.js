import { connect } from 'react-redux';

import App from './components/app';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  // actions,
  dispatch
});

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
