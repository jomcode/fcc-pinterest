import React from 'react';
import Masonry from 'react-masonry-component';

import './postgrid.scss';
import Post from './post';

const masonryOptions = {
  columnWidth: 250,
  gutter: 10,
  fitWidth: true
};

const PostGrid = ({ posts, isFetching, currentUser, removeHandler }) => {
  if (isFetching) {
    return (
      <div>
        Loading posts...
      </div>
    );
  }

  return (
    <div>
      <Masonry
        className="post-grid"
        elementType="div"
        options={masonryOptions}
        disableImagesLoaded={false}
        updateOnEachImageLoad={false}
      >
        {
          posts.map(p =>
            <Post
              key={p.postId}
              postId={p.postId}
              imageUrl={p.imageUrl}
              title={p.title}
              userId={p.userId}
              username={p.username}
              isOwner={currentUser ? currentUser.userId === p.userId : false}
              removeHandler={removeHandler}
              isFetching={isFetching}
            />
          )
        }
      </Masonry>
    </div>
  );
};

export default PostGrid;
