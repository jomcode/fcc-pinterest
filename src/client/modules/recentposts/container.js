import { connect } from 'react-redux';

import RecentPosts from './components/recentposts';
import * as actions from './actions';

const mapStateToProps = state => ({
  recentPosts: state.recentPosts
});

const mapDispatchToProps = dispatch => ({
  actions,
  dispatch
});

const Container = connect(mapStateToProps, mapDispatchToProps)(RecentPosts);

export default Container;
