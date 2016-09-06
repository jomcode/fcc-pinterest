import React from 'react';
import { shallow, mount } from 'enzyme';

import UserPosts from './userposts';
import postGrid from '../../postgrid';

const setup = () => {
  const fakePosts = [
    {
      postId: 'postId1',
      imageUrl: 'fake url1',
      title: 'fake title1',
      userId: 'userId1',
      username: 'fake username1'
    },
    {
      postId: 'postId2',
      imageUrl: 'fake url2',
      title: 'fake title2',
      userId: 'userId2',
      username: 'fake username2'
    }
  ];

  const common = {
    userPosts: {
      posts: [],
      isFetching: false
    },
    currentUser: {
      userId: 'userId1'
    },
    params: {
      userId: 'userId1'
    },
    actions: {
      getPostsByUser: sinon.spy(),
      removeUserPost: sinon.spy()
    },
    dispatch: sinon.spy()
  };

  const getProps = () => ({
    common: () => Object.assign({}, common),
    withPosts: () => Object.assign({}, common, {
      userPosts: {
        posts: fakePosts.slice(),
        isFetching: false
      }
    })
  });

  return { getProps };
};

describe('<UserPosts /> component', () => {
  it('renders a <PostGrid /> component', () => {
    const props = setup().getProps().withPosts();

    const wrapper = shallow(<UserPosts {...props} />);

    expect(wrapper.find(postGrid.component)).to.have.length(1);
  });

  it('renders a message if no posts found', () => {
    const expectedMessage = (
      <div>
        <h1>No posts found.</h1>
      </div>
    );

    const props = setup().getProps().common();

    const wrapper = shallow(<UserPosts {...props} />);

    expect(wrapper.contains(expectedMessage)).to.equal(true);
  });

  describe('#_handleRemove', () => {
    it('dispatches REMOVE_POST', () => {
      const props = setup().getProps().withPosts();

      sinon.spy(UserPosts.prototype, '_handleRemove');

      const wrapper = mount(<UserPosts {...props} />);

      const removeButton = wrapper.find('button');
      removeButton.simulate('click');

      expect(UserPosts.prototype._handleRemove.calledOnce).to.equal(true);
      expect(UserPosts.prototype._handleRemove.calledWith('postId1')).to.equal(true);
      expect(props.dispatch.calledTwice).to.equal(true); // once by componentDidMount
      expect(props.actions.removeUserPost.calledOnce).to.equal(true);
      expect(props.actions.removeUserPost.calledWith('postId1')).to.equal(true);

      UserPosts.prototype._handleRemove.restore();
    });
  });

  describe('#componentDidMount', () => {
    it('dispatches GET_USER_POSTS', () => {
      const props = setup().getProps().common();
      const expectedId = props.params.userId;

      sinon.spy(UserPosts.prototype, 'componentDidMount');

      const wrapper = mount(<UserPosts {...props} />);

      expect(UserPosts.prototype.componentDidMount.calledOnce).to.equal(true);
      expect(props.actions.getPostsByUser.calledOnce).to.equal(true);
      expect(props.actions.getPostsByUser.calledWith(expectedId)).to.equal(true);
      expect(props.dispatch.calledOnce).to.equal(true);

      UserPosts.prototype.componentDidMount.restore();
    });
  });
});
