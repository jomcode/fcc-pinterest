import React from 'react';
import { shallow } from 'enzyme';
import { Link, IndexLink } from 'react-router';

import NavBar from './navbar';
import rootUrl from '../../../config/rooturl';

describe('<NavBar /> component', () => {
  describe('<NavBar /> component shallow rendered', () => {
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

      it('renders the expected content', () => {
        const expected = (
          <div>
            <nav className="header-navbar">
              <div>
                <a href="#">Pinterestish</a>
                <IndexLink to="/" activeClassName="active-nav">Recent</IndexLink>
              </div>

              <div>
                <a href={`${rootUrl}/login/twitter`}>
                  <button>Login via Twitter</button>
                </a>
              </div>
            </nav>
          </div>
        );

        const wrapper = shallow(
          <NavBar
            auth={fakeAuth}
            logoutHandler={fakeLogoutHandler}
            currentUser={fakeCurrentUser}
          />
        );

        expect(wrapper.contains(expected)).to.equal(true);
      });
    });

    describe('<NavBar /> while authenticated', () => {
      const fakeAuth = { isAuthenticated: true };
      const fakeLogoutHandler = {};
      const fakeCurrentUser = { userId: 'userId1' };

      it('renders the expected content', () => {
        const expected = (
          <div>
            <nav className="header-navbar">
              <div>
                <a href="#">Pinterestish</a>
                <IndexLink to="/" activeClassName="active-nav">Recent</IndexLink>
                <Link
                  to={`/posts/users/${fakeCurrentUser.userId}`}
                  activeClassName="active-nav"
                >
                  Your Posts
                </Link>
              </div>

              <div>
                <Link
                  to="/posts/create"
                  activeClassName="active-nav"
                >
                  Create Post
                </Link>

                <button onClick={fakeLogoutHandler}>Logout</button>
              </div>
            </nav>
          </div>
        );

        const wrapper = shallow(
          <NavBar
            auth={fakeAuth}
            logoutHandler={fakeLogoutHandler}
            currentUser={fakeCurrentUser}
          />
        );

        expect(wrapper.contains(expected)).to.equal(true);
      });
    });
  });
});
