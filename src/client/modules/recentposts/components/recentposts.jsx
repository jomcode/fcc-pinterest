import React, { Component } from 'react';

class RecentPosts extends Component {
  componentDidMount() {
    const { actions: { getAllRecentPosts }, dispatch } = this.props;
    dispatch(getAllRecentPosts());
  }

  render() {
    const { recentPosts: { posts, isFetching } } = this.props;
    return (
      <div>
        <p># of Posts: {posts.length}</p>
      </div>
    );
  }
}

export default RecentPosts;
