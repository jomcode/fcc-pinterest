import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router';

import NavBar from './navbar';

describe('<NavBar /> component', () => {
  describe('<NavBar /> while auth.isFetching is true', () => {
    const fakeAuth = { isFetching: true };
    const fakeLogoutHandler = {};
    const fakeCurrentUser = {};

    it('renders a loading message', () => {
      const wrapper = shallow(
        <NavBar
          auth={fakeAuth}
          logoutHandler={fakeLogoutHandler}
          currentUser={fakeCurrentUser}
        />
      );

      expect(wrapper.contains(<span>Loading...</span>)).to.equal(true);
    });
  });

  describe('<NavBar /> while unauthenticated', () => {
    const fakeAuth = { isAuthenticated: false };
    const fakeLogoutHandler = {};
    const fakeCurrentUser = {};
    const logoutButton = (<button>Logout</button>);

    it('renders the expected content', () => {
      const expected = (
        <button>Login via Twitter</button>
      );

      const wrapper = shallow(
        <NavBar
          auth={fakeAuth}
          logoutHandler={fakeLogoutHandler}
          currentUser={fakeCurrentUser}
        />
      );

      expect(wrapper.contains(expected)).to.equal(true);
      expect(wrapper.contains(logoutButton)).to.equal(false);
    });
  });

  describe('<NavBar /> while authenticated', () => {
    const fakeAuth = { isAuthenticated: true };
    const fakeLogoutHandler = {};
    const fakeCurrentUser = { userId: 'userId1' };
    const loginButton = (<button>Login via Twitter</button>);
    const logoutButton = (<button onClick={fakeLogoutHandler}>Logout</button>);

    it('renders the expected content', () => {
      const expected = (
        <Link
          to={`/posts/users/${fakeCurrentUser.userId}`}
          activeClassName="active-nav"
        >
          Your Posts
        </Link>
      );

      const wrapper = shallow(
        <NavBar
          auth={fakeAuth}
          logoutHandler={fakeLogoutHandler}
          currentUser={fakeCurrentUser}
        />
      );

      expect(wrapper.contains(expected)).to.equal(true);
      expect(wrapper.contains(loginButton)).to.equal(false);
      expect(wrapper.contains(logoutButton)).to.equal(true);
    });
  });
});
