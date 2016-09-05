import React from 'react';

import NavBar from './navbar';

const Header = ({ auth, logoutHandler, currentUser }) => (
  <header>
    <NavBar
      auth={auth}
      logoutHandler={logoutHandler}
      currentUser={currentUser}
    />
  </header>
);

export default Header;
