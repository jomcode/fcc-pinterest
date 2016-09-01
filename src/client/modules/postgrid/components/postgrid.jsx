import React, { Component } from 'react';

import './postgrid.scss';
import Post from './post';

class PostGrid extends Component {
  constructor(props) {
    super(props);

    this._renderLoading = this._renderLoading.bind(this);
    this._renderUserPosts = this._renderUserPosts.bind(this);
    this._renderRecentPosts = this._renderRecentPosts.bind(this);
  }

  _renderLoading() {
    return (
      <div>
        Loading posts...
      </div>
    );
  }

  _renderUserPosts() {
    const { posts, isFetching, currentUser, removeHandler } = this.props;

    return posts.map(p =>
      <Post
        key={p.postId}
        postId={p.postId}
        imageUrl={p.imageUrl}
        title={p.title}
        userId={p.userId}
        username={p.username}
        isOwner={currentUser.userId === p.userId}
        removeHandler={removeHandler}
        isFetching={isFetching}
      />
    );
  }

  _renderRecentPosts() {
    const { posts, isFetching } = this.props;

    return posts.map(p =>
      <Post
        key={p.postId}
        postId={p.postId}
        imageUrl={p.imageUrl}
        title={p.title}
        userId={p.userId}
        username={p.username}
        isFetching={isFetching}
      />
    );
  }

  render() {
    const { currentUser, isFetching } = this.props;

    return (
      <div className="post-grid">
        {isFetching ? this._renderLoading() : null}
        {currentUser ? this._renderUserPosts() : this._renderRecentPosts()}
      </div>
    );
  }
}

export default PostGrid;
