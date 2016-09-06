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
    const wrapper = setup().getWrapper(props).shallow.shallow();

    expect(wrapper.find(Header)).to.have.length(1);
  });

  it('renders div with .app-content class', () => {
    const props = setup().getProps().authenticated;
    const wrapper = setup().getWrapper(props).shallow.shallow();

    expect(wrapper.find('.app-content')).to.have.length(1);
  });

  describe('#componentDidMount', () => {
    it('dispatches LOGIN', () => {
      const props = setup().getProps().unauthenticated;

      sinon.spy(App.prototype, 'componentDidMount');

      const wrapper = setup().getWrapper(props).full;

      expect(App.prototype.componentDidMount.calledOnce).to.equal(true);
      expect(props.dispatch.calledOnce).to.equal(true);
      expect(props.actions.loginUser.calledOnce).to.equal(true);

      App.prototype.componentDidMount.restore();
    });
  });

  describe('#componentDidUpdate', () => {
    it('calls router.push(\'/\') on logout', () => {
      const initialProps = setup().getProps().authenticated;
      const updatedProps = setup().getProps().unauthenticated;

      sinon.spy(App.prototype, 'componentDidUpdate');

      const wrapper = setup().getWrapper(initialProps).full;

      wrapper.setProps(updatedProps);

      expect(App.prototype.componentDidUpdate.calledOnce).to.equal(true);
      expect(updatedProps.router.push.calledOnce).to.equal(true);
      expect(updatedProps.router.push.calledWith('/')).to.equal(true);

      App.prototype.componentDidUpdate.restore();
    });
  });

  describe('#_handleLogout', () => {
    it('dispatches LOGOUT', () => {
      const props = setup().getProps().authenticated;

      sinon.spy(App.prototype, '_handleLogout');

      const wrapper = setup().getWrapper(props).full;

      const logoutButton = wrapper.find('button')
        .filterWhere(n => n.html() !== '<button onClick=[Function]>Logout</button>');

      logoutButton.simulate('click');

      expect(App.prototype._handleLogout.calledOnce).to.equal(true);
      expect(props.actions.logoutUser.calledOnce).to.equal(true);
      expect(props.dispatch.calledTwice).to.equal(true); // 1 in componentDidMount

      App.prototype._handleLogout.restore();
    });
  });
});
