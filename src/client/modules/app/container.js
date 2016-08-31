import { connect } from 'react-redux';

import App from './components/app';
import auth from '../auth';

const { actions } = auth;

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  // userId: state.auth.user !== null ? state.auth.user.id : null
});

const mapDispatchToProps = dispatch => ({
  actions,
  dispatch
});

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
