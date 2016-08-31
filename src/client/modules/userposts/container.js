import { connect } from 'react-redux';

import UserPosts from './components/userposts';
import * as actions from './actions';

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  userPosts: state.userPosts
});

const mapDispatchToProps = dispatch => ({
  actions,
  dispatch
});

const UserPostsContainer = connect(mapStateToProps, mapDispatchToProps)(UserPosts);

export default UserPostsContainer;
