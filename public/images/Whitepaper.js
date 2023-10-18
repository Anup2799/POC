import React, { useState, useEffect } from 'react';
import Footer from '../../src/components/Layout/Footer';
import Layout from '../../src/components/Layout/Layout';

function Squarecard() {
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    // Fetch data from data.json file
    fetch('/data/blogs_wp.json') // This path is relative to the root of your app
      .then((response) => response.json())
      .then((data) => setCardsData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const pageStyles = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  };

  const headerStyles = {
    padding: '20px',
    textAlign: 'center',
    color: 'black',
    fontSize: '18px', // Updated font size to make it smaller
  };

  const cardContainerStyles = {
    flex: '1',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: '1200px',
    width: '100%',
    margin: '0 auto',
  };

  const customCardStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '260px',
    height: '400px',
    borderRadius: '10px',
    padding: '20px',
    margin: '10px',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const cardImageStyles = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  };

  const cardTitleStyles = {
    fontSize: '20px',
    margin: '10px 0',
    textAlign: 'left',
  };

  const cardTextStyles = {
    fontSize: '16px',
    color: '#333',
    margin: '10px 0',
    textAlign: 'left',
  };

  const cardActionsStyles = {
    display: 'flex',
    justifyContent: 'center',
  };

  const learnMoreLinkStyles = {
    textDecoration: 'underline',
    color: '#007bff',
  };

  return (
    <Layout>
      <div style={pageStyles}>
        <header style={headerStyles}>
          <h1>Whitepapers & Blogs</h1>
        </header>
        <div style={cardContainerStyles}>
          {cardsData.map((card, index) => (
            <div key={index} style={customCardStyles}>
              <img src={card.ImageURL} alt={card.title} style={cardImageStyles} />
              <div>
                <div style={cardTitleStyles}>{card.title}</div>
                <div style={cardTextStyles}>{card.text}</div>
              </div>
              <div style={cardActionsStyles}>
                <a href={card.link} target="_blank" rel="noopener noreferrer" style={learnMoreLinkStyles}>
                  Learn More
                </a>
              </div>
            </div>
          ))}
        </div>
        <Footer />
      </div>
    </Layout>
  );
}

export default Squarecard;
