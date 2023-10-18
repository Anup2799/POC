import React, { useState, useEffect } from "react";
import Footer from "../components/Layout/Footer";
import Layout from "../components/Layout/Layout";

function Squarecard() {
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    // Fetch data from data.json file
    fetch("/data/blogs_wp.json") // This path is relative to the root of your app
      .then((response) => response.json())
      .then((data) => setCardsData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const pageStyles = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  };

  const headerStyles = {
    padding: "20px",
    textAlign: "center",
    color: "black",
    fontSize: "20px", // Increased font size for the title
  };

  const cardContainerStyles = {
    flex: "1",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around", // Center the cards with space around them
    maxWidth: "1200px",
    width: "100%",
    margin: "0 auto",
  };

  const customCardStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "260px",
    height: "auto", // Adjusted the height to be auto
    borderRadius: "10px",
    padding: "20px",
    margin: "10px", // Added more vertical spacing to the left and right sides
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    border: "1px solid #ccc",
    transition: "transform 0.2s",
  };

  const cardImageStyles = {
    width: "100%",
    objectFit: "cover",
    height: "100%", // Adjusted the height to match the card's height
  };

  const cardTitleStyles = {
    fontSize: "18px", // Adjusted font size for the title
    fontWeight: "bold",
    margin: "10px 0",
    textAlign: "center",
  };

  const cardTextStyles = {
    fontSize: "16px",
    fontFamily: "Arial, sans-serif", // Adjusted the font family
    color: "#333",
    margin: "10px 5px", // Reduced right-side margin
    textAlign: "left",
  };

  const cardActionsStyles = {
    display: "flex",
    justifyContent: "center",
    marginTop: "10px", // Added spacing above the link
  };

  const learnMoreLinkStyles = {
    textDecoration: "underline",
    color: "#007bff",
  };

  const footerStyles = {
    marginTop: "20px", // Increased top margin for the footer
  };

  return (
    <Layout>
      <div style={pageStyles}>
        <header style={headerStyles}>
          <h4>Whitepapers & Blogs</h4>
        </header>
        <div style={cardContainerStyles}>
          {cardsData.map((card, index) => (
            <div
              key={index}
              style={customCardStyles}
              onMouseEnter={() => {
                document.querySelector(`#card-${index}`).style.transform = "scale(1.05)";
              }}
              onMouseLeave={() => {
                document.querySelector(`#card-${index}`).style.transform = "scale(1)";
              }}
              id={`card-${index}`}
            >
              <img src={card.ImageURL} alt={card.title} style={cardImageStyles} />
              <div>
                <div style={cardTitleStyles}>{card.title}</div>
                <div style={cardTextStyles}>{card.text}</div>
              </div>
              <div style={cardActionsStyles}>
                <a
                  href={card.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={learnMoreLinkStyles}
                >
                  Learn More
                </a>
              </div>
            </div>
          ))}
        </div>
        <Footer style={footerStyles} />
      </div>
    </Layout>
  );
}

export default Squarecard;
