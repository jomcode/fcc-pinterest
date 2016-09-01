import React, { Component } from 'react';

import postGrid from '../../postgrid';

class RecentPosts extends Component {
  componentDidMount() {
    const { actions: { getAllRecentPosts }, dispatch } = this.props;
    dispatch(getAllRecentPosts());
  }

  render() {
    const { recentPosts: { posts, isFetching } } = this.props;
    return (
      <div>
        <postGrid.component posts={posts} isFetching={isFetching} />
      </div>
    );
  }
}

export default RecentPosts;
