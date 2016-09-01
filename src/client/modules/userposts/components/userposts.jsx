import React, { Component } from 'react';

import postGrid from '../../postgrid';

class UserPosts extends Component {
  constructor(props) {
    super(props);

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

  render() {
    const { userPosts: { posts, isFetching }, currentUser } = this.props;
    if (posts.length < 1) {
      return (
        <div>
          <h1>No posts found.</h1>
        </div>
      );
    }

    return (
      <div>
        <postGrid.component
          posts={posts}
          isFetching={isFetching}
          currentUser={currentUser}
          removeHandler={this._handleRemove}
        />
      </div>
    );
  }
}

export default UserPosts;
