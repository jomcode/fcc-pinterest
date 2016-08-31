import { connect } from 'react-redux';

import App from './components/app';
import auth from '../auth';

const { actions } = auth;

const mapStateToProps = state => ({
  auth: state.auth,
  currentUser: state.currentUser
});

const mapDispatchToProps = dispatch => ({
  actions,
  dispatch
});

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
