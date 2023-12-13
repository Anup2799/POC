import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";
import Footer from "../components/Layout/Footer";
import Layout from "../components/Layout/Layout";
import CardDetails from "../pages/CardDetails";

function Whitepaper() {
  const navigate = useNavigate();
  const [cardsData, setCardsData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);

  function convertToDateSortableFormat(dateString) {
    if (!dateString) {
      return null;
    }
    const [day, month, year] = dateString.split("-");
    return new Date(`${year}-${month}-${day}`);
  }

  useEffect(() => {
    fetch("/data/Whitepaper.json")
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data.sort((a, b) => {
          const dateA = convertToDateSortableFormat(a.Date);
          const dateB = convertToDateSortableFormat(b.Date);
          return dateB - dateA;
        });
        setCardsData(sortedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredCards = cardsData.filter((card) =>
    card.Title.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleIconClick = (card) => {
    navigate(card.CardDetailsWURL);
  };

  const handleCloseDetails = () => {
    setSelectedCard(null);
  };

  const handleCardImageClick = (event, card) => {
    event.stopPropagation();
    navigate(card.ImageClickURL);
  };

  return (
    <Layout>
      <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
        <Grid container spacing={3} style={{ padding: "20px" }}>
          <Grid item xs={12} md={9}>
            <Typography
              variant="h2"
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                textAlign: "left",
                marginTop: "20px",
                fontFamily: "Arial, sans-serif",
              }}
            >
              Whitepapers & Blogs
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <input
              type="text"
              placeholder="Search by title"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              style={{
                marginTop: "20px",
                padding: "15px",
                width: "98%",
                fontSize: "14px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h5"
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                textAlign: "left",
              }}
            >
              <span style={{ fontWeight: "normal" }}>Whitepapers & Blogs:</span>{" "}
              <strong>{filteredCards.length}</strong>
            </Typography>
          </Grid>

          {filteredCards.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                style={{
                  borderRadius: "10px",
                  overflow: "hidden",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  border: "1px solid #ccc",
                  transition: "transform 0.2s",
                  cursor: "pointer",
                  minHeight: "400px",
                }}
                onMouseEnter={() => {
                  document.querySelector(`#card-${index}`).style.transform =
                    "scale(1.05)";
                }}
                onMouseLeave={() => {
                  document.querySelector(`#card-${index}`).style.transform =
                    "scale(1)";
                }}
                id={`card-${index}`}
                onClick={() => handleCardClick(card)}
              >
                <CardMedia
                  component="img"
                  alt={card.Title}
                  image={card.ImageURL}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  onClick={(event) => handleCardImageClick(event, card)}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    style={{
                      fontSize: "13px",
                      fontWeight: "bold",
                      margin: "10px 0",
                      textAlign: "left",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {card.Title}
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      marginTop: "20px",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={card.IconURL}
                      alt="Icon 1"
                      style={{
                        width: "40px",
                        height: "40px",
                        cursor: "pointer",
                      }}
                      onClick={() => navigate(card.PageURL1)}
                    />
                    <img
                      src={card.IconURL1}
                      alt="Icon 2"
                      style={{
                        width: "40px",
                        height: "40px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleIconClick(card)}
                    />
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}

          {selectedCard && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "#fff",
                  padding: "20px",
                  borderRadius: "10px",
                }}
              >
                <CardDetails card={selectedCard} onClose={handleCloseDetails} />
              </div>
            </div>
          )}
        </Grid>

        <Footer style={{ marginTop: "20px" }} />
      </div>
    </Layout>
  );
}

export default Whitepaper;
