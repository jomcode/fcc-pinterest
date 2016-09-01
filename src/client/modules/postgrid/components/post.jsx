import React, { Component } from 'react';
import { Link } from 'react-router';

import Image from './image';

class Post extends Component {
  constructor(props) {
    super(props);

    this._handleRemove = this._handleRemove.bind(this);
  }

  _handleRemove() {
    const { postId, removeHandler } = this.props;
    removeHandler(postId);
  }

  render() {
    const { imageUrl, title, userId, username, isOwner, isFetching } = this.props;

    return (
      <div>
        <Image imageUrl={imageUrl} />
        <h4>{title}</h4>
        <span>
          by:
          <Link to={`/posts/users/${userId}`}>{username}</Link>
        </span>

        {
          isOwner ?
            <button
              onClick={this._handleRemove}
              disabled={isFetching}
            >
              Remove
            </button> :
            null
        }
      </div>
    );
  }
}

export default Post;
