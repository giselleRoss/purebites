import React from 'react';

const Header = () => {
  const logoStyle = {
    width: 'auto',
    height: '40px', 
    marginRight: '10px', 
  };

  const headerStyle = {
    backgroundColor: 'green', 
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    color: 'white', 
  };

  return (
    <header style={headerStyle}>
      <img
        style={logoStyle}
        src="/PureBiteslogo.png"
        alt="Logo"
      />
      <h1>Pure Bites</h1>
    </header>
  );
};

export default Header;
