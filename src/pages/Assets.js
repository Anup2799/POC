import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import Footer from "../components/Layout/Footer";
import Layout from "../components/Layout/Layout";
import CardDetailsA from "../pages/CardDetailsA";

function Assets() {
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
    fetch("/data/Assets.json")
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.filter((item) => item.HideItem.toLowerCase() === "false");
        const sortedData = filteredData.sort((a, b) => {
          const dateA = convertToDateSortableFormat(a.Date);
          const dateB = convertToDateSortableFormat(b.Date);
          return dateB - dateA;
        });
        const extractedData = sortedData.map((item) => ({
          ImageURL: item.ImageURL,
          Title: item.Title,
          Type: item.Type,
          Summary: item.Summary,
          ID: item.ID,
        }));
        setCardsData(extractedData);
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
    navigate(`/CardDetailsURLA/${card.ID}`);
  };

  const handleCloseDetails = () => {
    setSelectedCard(null);
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
                marginTop: "20px",
                fontFamily: "Arial, sans-serif",
              }}
            >
              Available Assets: PoCs, Case Studies and more -
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
                width: "100%",
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
              <span style={{ fontWeight: "normal" }}>Assets:</span>{" "}
              <strong>{filteredCards.length}</strong>
            </Typography>
          </Grid>

          {filteredCards.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                id={`card-${index}`}
                style={{
                  borderRadius: "10px",
                  overflow: "hidden",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  border: "1px solid #ccc",
                  cursor: "pointer",
                  marginBottom: "20px",
                  transition: "transform 0.3s",
                  transformStyle: "preserve-3d",
                  transform: "perspective(600px)",
                }}
                onMouseEnter={() => {
                  document.getElementById(`card-${index}`).style.transform = "translateY(-10px)";
                }}
                onMouseLeave={() => {
                  document.getElementById(`card-${index}`).style.transform = "translateY(0)";
                }}
                onClick={() => handleCardClick(card)}
              >
                <CardMedia
                  component="img"
                  alt={card.Title}
                  image={card.ImageURL}
                  style={{
                    width: "100%",
                    height: "250px",
                    objectFit: "cover",
                  }}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    style={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      margin: "10px 0",
                      color: "#0276aa",
                    }}
                  >
                    {card.Title}
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{
                      fontSize: "12px",
                      color: "textSecondary",
                      component: "p",
                    }}
                  >
                    {card.Type}
                  </Typography>
                  <div style={{ margin: "8px 0" }} />
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Summary: {card.Summary}
                  </Typography>
                  <div style={{ marginTop: "10px" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleIconClick(card)}
                    >
                      {`Details`.split("").map((char, i) => (
                        <span
                          key={i}
                          style={{
                            fontSize: i === 0 ? "16px" : "12px",
                            textTransform: i === 0 ? "uppercase" : "lowercase",
                          }}
                        >
                          {char}
                        </span>
                      ))}
                    </Button>
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
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  backgroundColor: "#fff",
                  padding: "20px",
                  borderRadius: "10px",
                  width: "80%",
                }}
              >
                <CardDetailsA card={selectedCard} onClose={handleCloseDetails} />
              </div>
            </div>
          )}
        </Grid>

        <Footer style={{ marginTop: "20px" }} />
      </div>
    </Layout>
  );
}

export default Assets;
