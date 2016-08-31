import { connect } from 'react-redux';

import CreatePost from './components/createpost';
import * as actions from './actions';

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  userId: state.currentUser.userId,
  createPost: state.createPost
});

const mapDispatchToProps = dispatch => ({
  actions,
  dispatch
});

const CreatePostContainer = connect(mapStateToProps, mapDispatchToProps)(CreatePost);

export default CreatePostContainer;
