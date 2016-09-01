import React, { Component } from 'react';

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

  _renderUserPosts() {}

  _renderRecentPosts() {
    const { posts, isFetching } = this.props;

    return (
      <div>
        {
          posts.map(p =>
            <Post
              key={p.postId}
              postId={p.postId}
              imageUrl={p.imageUrl}
              title={p.title}
              userId={p.userId}
              username={p.username}
              isFetching={isFetching}
            />
          )
        }
      </div>
    );
  }

  render() {
    const { isFetching } = this.props;

    if (isFetching) return this._renderLoading();

    return this._renderRecentPosts();
  }
}

export default PostGrid;