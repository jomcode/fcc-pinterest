import React, { Component } from 'react';

class UserPosts extends Component {
  constructor(props) {
    super(props);

    this._renderLoading = this._renderLoading.bind(this);
    this._renderDone = this._renderDone.bind(this);
    this._handleRemove = this._handleRemove.bind(this);
  }

  componentDidMount() {
    const {
      params: { userId },
      actions: { getPostsByUser },
      dispatch
    } = this.props;

    dispatch(getPostsByUser(userId));
  }

  _handleRemove(postId) {
    const { actions: { removeUserPost }, dispatch } = this.props;
    dispatch(removeUserPost(postId));
  }

  _renderLoading() {
    return (
      <div>
        Loading...
      </div>
    );
  }

  _renderDone() {
    const { userPosts: { posts, isFetching }, userId } = this.props;

    if (posts.length < 1) {
      return (
        <div>
          <h1>No posts found.</h1>
        </div>
      );
    }

    return (
      <div>
        <p># of Posts: {posts.length}</p>
      </div>
    );
  }

  render() {
    const { userPosts: { isFetching } } = this.props;
    return isFetching ? this._renderLoading() : this._renderDone();
  }
}

export default UserPosts;
