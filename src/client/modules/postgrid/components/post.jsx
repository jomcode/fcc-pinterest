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
      <div className="post-grid-item">
        <div>
          <Image imageUrl={imageUrl} />
        </div>

        <div>
          <h4>{title}</h4>
        </div>

        <div className="posted-by">
          <span>
            by:
            <Link to={`/posts/users/${userId}`}>{username}</Link>
          </span>
        </div>

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
