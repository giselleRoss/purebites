import React from 'react';

const Footer = () => {
  const logoStyle = {
    width: 'auto',
    height: '50px', 
  };

  const footerStyle = {
    backgroundColor: 'green', 
    width: '100vw', 
  };

  return (
    <section className="py-10 sm:pt-16 lg:pt-24 flex-grow" style={footerStyle}>
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl flex flex-col justify-between h-full">
        <div className="col-span-2 md:col-span-3 lg:col-span-2 lg:pr-8">
          <img
            style={logoStyle}
            src="/PureBiteslogo.png"
            alt=""
          />
        </div>
      </div>

      <hr className="mt-16 mb-10 border-gray-200" />

      <p className="text-sm text-center text-gray-600">
        © Copyright 2021, All Rights Reserved by PureBites
      </p>
    </section>
  );
};

export default Footer;
