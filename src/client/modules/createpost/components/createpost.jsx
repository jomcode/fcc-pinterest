import React, { Component } from 'react';
import { withRouter } from 'react-router';

import CreatePostForm from './createpostform';

class CreatePost extends Component {
  constructor(props) {
    super(props);

    this._handleSubmit = this._handleSubmit.bind(this);
  }

  componentDidUpdate() {
    const {
      actions: { resetCreatePost },
      router,
      dispatch,
      createPost,
      userId
    } = this.props;
    if (createPost.isSuccessful) {
      router.push(`/posts/users/${userId}`);
      dispatch(resetCreatePost());
    }
  }

  _handleSubmit(data) {
    const { actions: { createNewPost }, dispatch, userId } = this.props;
    if (!data.title || !data.imageUrl) return;
    const post = Object.assign({}, data, { userId });
    dispatch(createNewPost(post));
  }

  render() {
    const { createPost: { isFetching } } = this.props;

    return (
      <div>
        <h1>Create Post</h1>
        <CreatePostForm
          onSubmit={this._handleSubmit}
          isFetching={isFetching}
        />
      </div>
    );
  }
}

export { CreatePost };

const WrappedCreatePost = withRouter(CreatePost);
export default WrappedCreatePost;
