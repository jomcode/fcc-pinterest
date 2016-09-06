import React from 'react';
import { shallow } from 'enzyme';

import Header from './header';
import NavBar from './navbar';

const fakeAuth = {};
const fakeLogoutHandler = {};
const fakeCurrentUser = {};

describe('<Header /> component', () => {
  it('renders a <header>', () => {
    const wrapper = shallow(
      <Header
        auth={fakeAuth}
        logoutHandler={fakeLogoutHandler}
        currentUser={fakeCurrentUser}
      />
    );

    expect(wrapper.find('header')).to.have.length(1);
  });

  it('renders a <NavBar> component', () => {
    const wrapper = shallow(
      <Header
        auth={fakeAuth}
        logoutHandler={fakeLogoutHandler}
        currentUser={fakeCurrentUser}
      />
    );

    expect(wrapper.find(NavBar)).to.have.length(1);
  });
});
