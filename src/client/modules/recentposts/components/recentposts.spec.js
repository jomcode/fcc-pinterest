import React from 'react';
import { shallow, mount } from 'enzyme';

import RecentPosts from './recentposts';
import postGrid from '../../postgrid';

const setup = () => {
  const common = {
    recentPosts: {
      posts: [],
      isFetching: false
    },
    actions: {
      getAllRecentPosts: sinon.spy()
    },
    dispatch: sinon.spy()
  };

  const getProps = () => ({
    common: () => Object.assign({}, common)
  });

  return { getProps };
};

describe('<RecentPosts /> component', () => {
  it('renders a <PostGrid /> component', () => {
    const props = setup().getProps().common();

    const wrapper = shallow(<RecentPosts {...props} />);

    expect(wrapper.find(postGrid.component)).to.have.length(1);
  });

  describe('#componentDidMount', () => {
    it('dispatches GET_RECENT_POSTS', () => {
      const props = setup().getProps().common();

      sinon.spy(RecentPosts.prototype, 'componentDidMount');

      const wrapper = mount(<RecentPosts {...props} />);

      expect(RecentPosts.prototype.componentDidMount.calledOnce).to.equal(true);
      expect(props.actions.getAllRecentPosts.calledOnce).to.equal(true);
      expect(props.dispatch.calledOnce).to.equal(true);

      RecentPosts.prototype.componentDidMount.restore();
    });
  });
});
