import React from 'react';
import Footer from '../components/Layout/Footer';
import Layout from '../components/Layout/Layout';

const ComingSoon = () => {
  const headerStyle = {
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(to right, #7BC6CC, #BE93C5)',
  };

  const h1Style = {
    color: 'white',
    fontFamily: "'Oswald', sans-serif",
    paddingRight: '1em',
  };

  const divStyle = {
    display: 'inline-block',
    textShadow: '2px 2px 3px #3D6366',
    animation: 'example 3s infinite ease-in-out',
  };

  return (
    <Layout>
      <header style={headerStyle}>
        <h1 style={h1Style}>
          <span style={{ fontFamily: "'Oswald', sans-serif" }}>Coming</span>{' '}
          <div style={divStyle}>S</div>
          <div style={divStyle}>O</div>
          <div style={divStyle}>O</div>
          <div style={divStyle}>N</div>
          <span role="img" aria-label="rocket" style={{ fontFamily: "'Oswald', sans-serif" }}>
            🚀
          </span>
        </h1>
      </header>
      <Footer />
    </Layout>
  );
};

export default ComingSoon;
