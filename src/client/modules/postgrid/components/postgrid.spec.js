import React from 'react';
import { shallow } from 'enzyme';

import PostGrid from './postgrid';
import Post from './post';

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
      postId: 'postId1',
      imageUrl: 'fake url1',
      title: 'fake title1',
      userId: 'userId2',
      username: 'fake username1'
    }
  ];

  const common = {
    posts: fakePosts.slice(),
    currentUser: {},
    removeHandler: sinon.spy(),
    isFetching: false
  };

  const getProps = props => ({
    common: () => Object.assign({}, common),
    loading: () => Object.assign({}, common, {
      isFetching: true
    }),
    owner: () => Object.assign({}, common, {
      currentUser: {
        userId: 'userId1'
      }
    })
  });

  return { getProps };
};

describe('<PostGrid /> component', () => {
  it('renders a <Masonry /> component', () => {
    const props = setup().getProps().common();

    const wrapper = shallow(<PostGrid {...props} />);

    expect(wrapper.find('MasonryComponent')).to.have.length(1);
  });

  it('renders the proper amount of <Post /> components', () => {
    const props = setup().getProps().common();

    const wrapper = shallow(<PostGrid {...props} />);

    expect(wrapper.find(Post)).to.have.length(2);
  });

  it('renders a loading message', () => {
    const expectedMessage = (<div>Loading posts...</div>);
    const props = setup().getProps().loading();

    const wrapper = shallow(<PostGrid {...props} />);

    expect(wrapper.contains(expectedMessage)).to.equal(true);
  });
});
