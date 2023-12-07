import React, { useState, useEffect } from 'react';
import Footer from '../components/Layout/Footer';
import Layout from '../components/Layout/Layout';
import { Link } from 'react-router-dom';

const Home = () => {
  const [data, setData] = useState(null);
  const [isButtonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    fetch('/data/Home.json')
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData[0]);
      });
  }, []);

  const handleButtonClick = () => {
    setButtonClicked(true);
  };

  const styles = {
    home: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f4f4f4',
    },
    card: {
      background: 'white',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      maxWidth: '600px',
      width: '100%',
      boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.2)',
      textAlign: 'center',
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      margin: '10px 0',
    },
    summary: {
      fontSize: '18px',
      margin: '10px 0',
    },
    paragraph: {
      fontSize: '16px',
      margin: '10px 0',
      textAlign: 'left',
    },
    button: {
      backgroundColor: isButtonClicked ? '#007bff' : 'transparent',
      color: 'black',
      padding: '10px 20px',
      border: '2px solid #007bff',
      borderRadius: '5px',
      cursor: 'pointer',
      boxShadow: '2px 2px 4px #888888', // Added shadow to the button border
      textShadow: '2px 2px 4px #888888',
      transition: 'background-color 0.3s',
    },
    buttonText: {
      fontWeight: 'bold',
    },
    buttonHover: {
      backgroundColor: '#007bff',
      color: '#fff',
    },
    footer: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      backgroundColor: '#f4f4f4',
      borderTop: '1px solid #ccc',
      textAlign: 'center',
    },
  };

  return (
    <Layout style={styles.home}>
      <div style={styles.card}>
        <h1 style={styles.title}>{data?.title}</h1>
        <p style={styles.summary}>{data?.summary}</p>
        <p style={styles.paragraph}>{data?.details}</p>
        <p style={styles.paragraph}>{data?.description}</p>
        <Link to="/assets">
          <button
            style={isButtonClicked ? { ...styles.button, ...styles.buttonHover } : styles.button}
            onClick={handleButtonClick}
          >
            <span style={styles.buttonText}>Asset Showcase</span>
          </button>
        </Link>
      </div>
      <div style={styles.footer}>
        <Footer />
      </div>
    </Layout>
  );
};

export default Home;
