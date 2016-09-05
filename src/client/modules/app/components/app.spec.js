import React from 'react';
import { shallow, mount } from 'enzyme';

import { App } from './app';
import Header from './header';

const setup = () => {
  const common = {
    dispatch: sinon.spy(),
    actions: {
      loginUser: sinon.spy(),
      logoutUser: sinon.spy()
    },
    router: {
      push: sinon.spy(),
      replace: sinon.spy(),
      go: sinon.spy(),
      goBack: sinon.spy(),
      goForward: sinon.spy(),
      setRouteLeaveHook: sinon.spy(),
      isActive: sinon.spy()
    }
  };

  const getProps = () => ({
    authenticated: Object.assign({}, common, {
      auth: { isAuthenticated: true, isFetching: false },
      currentUser: {
        userId: 'userId1',
        username: 'testuser',
        twitterId: 'twitterId1'
      }
    }),

    unauthenticated: Object.assign({}, common, {
      auth: { isAuthenticated: false, isFetching: false },
      currentUser: {}
    }),

    loading: Object.assign({}, common, {
      auth: { isAuthenticated: false, isFetching: true },
      currentUser: {}
    })
  });

  const getWrapper = (props) => ({
    shallow: shallow(<App {...props} />),
    full: mount(<App {...props} />)
  });

  return { getProps, getWrapper };
};

describe('<App /> component', () => {
  it('renders a <Header /> component', () => {
    const props = setup().getProps().authenticated;
    const wrapper = setup().getWrapper(props).full;

    expect(wrapper.find(Header)).to.have.length(1);
  });

  it('renders div with .app-content class', () => {
    const props = setup().getProps().authenticated;
    const wrapper = setup().getWrapper(props).shallow.render();

    expect(wrapper.find('.app-content')).to.have.length(1);
  });
});
