import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Typography,
  Button,
  makeStyles,
  ThemeProvider,
  Grid,
} from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";

import Footer from "../components/Layout/Footer";
import Layout from "../components/Layout/Layout";

const theme = createTheme();

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
    position: "relative",
    marginTop: theme.spacing(0.5),
  },
  closeButton: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    cursor: "pointer",
    color: "white",
    background: "rgba(255, 0, 0, 0.7)",
    borderRadius: "50%",
    padding: theme.spacing(0.5),
    zIndex: 1,
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
    margin: 0,
  },
  detailContainer: {
    marginTop: theme.spacing(1),
  },
  detailItem: {
    margin: theme.spacing(1, 0),
    color: "black",
    "& p": {
      marginBottom: theme.spacing(1),
    },
  },
  clickableText: {
    color: "#2196f3",
    textDecoration: "none",
    cursor: "pointer",
  },
  image: {
    width: "100%",
    maxWidth: "600px",
    height: "auto",
    borderRadius: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  button: {
    width: "90%",
    margin: theme.spacing(1, 0.5),
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(1, 0),
  },
  fixedFooter: {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    zIndex: 1000,
  },
}));

const CardDetailsA = ({ onClose }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { cardId } = useParams();
  const [detailedCard, setDetailedCard] = useState(null);

  useEffect(() => {
    fetch("/data/Assets.json")
      .then((response) => response.json())
      .then((data) => {
        const selectedCard = data.find((item) => item.ID === cardId);
        if (selectedCard) {
          selectedCard.Description = selectedCard.Description
            ? selectedCard.Description.split("\n").map((para, index) => (
              <p key={index}>{para}</p>
            ))
            : null;

          selectedCard.Details = selectedCard.Details
            ? selectedCard.Details.split("\n").map((para, index) => (
              <p key={index}>{para}</p>
            ))
            : null;

          setDetailedCard(selectedCard);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [cardId]);

  const handleClose = () => {
    if (typeof onClose === "function") {
      onClose();
    } else {
      console.error("onClose is not a function");
    }
    navigate("/Assets");
  };

  return (
    <Layout>
      <ThemeProvider theme={theme}>
        <div className={classes.container}>
          {detailedCard && (
            <>
              <Typography className={classes.title} variant="h6">
                {detailedCard.Title}
              </Typography>
              <div className={classes.closeButton} onClick={handleClose}>
                X
              </div>
              <Grid container className={classes.detailContainer} spacing={2}>
                <Grid item xs={12} md={6}>
                  <img
                    src={detailedCard.ImageURL}
                    alt={detailedCard.Title}
                    className={classes.image}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" className={classes.detailItem}>
                    Type:
                  </Typography>
                  <Typography variant="body1" className={classes.detailItem}>
                    {detailedCard.Type}
                  </Typography>
                  <Typography variant="h6" className={classes.detailItem}>
                    Summary:
                  </Typography>
                  <Typography variant="body1" className={classes.detailItem}>
                    {detailedCard.Summary}
                  </Typography>
                  <Typography variant="h6" className={classes.detailItem}>
                    Description:
                  </Typography>
                  <div className={classes.detailItem}>
                    {detailedCard.Description}
                  </div>
                  <Typography variant="h6" className={classes.detailItem}>
                    Details:
                  </Typography>
                  <div className={classes.detailItem}>
                    {detailedCard.Details}
                  </div>
                  <Typography variant="h6" className={classes.detailItem}>
                    <span style={{ marginRight: '8px' }}>
                      <img
                        src={detailedCard.IconURL}
                        alt="Icon"
                        style={{ width: '20px', height: '20px', marginRight: '4px' }}
                      />
                    </span>
                    Tags:
                  </Typography>
                  <Typography variant="body1" className={classes.detailItem}>
                    <Link
                      to={`/tags/${detailedCard.Tags}`}
                      className={classes.clickableText}
                    >
                      {detailedCard.Tags}
                    </Link>
                  </Typography>
                  <Typography variant="h6" className={classes.detailItem}>
                    <span style={{ marginRight: '8px' }}>
                      <img
                        src={detailedCard.IconURL}
                        alt="Icon"
                        style={{ width: '20px', height: '20px', marginRight: '4px' }}
                      />
                    </span>
                    Tech Tags:
                  </Typography>
                  <Typography variant="body1" className={classes.detailItem}>
                    <Link
                      to={`/techtags/${detailedCard.TechTags}`}
                      className={classes.clickableText}
                    >
                      {detailedCard.TechTags}
                    </Link>
                  </Typography>
                  <div className={classes.buttonContainer}>
                    <Grid item xs={12} md={4}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          window.open(detailedCard.VideoURL, "_blank")
                        }
                        className={classes.button}
                      >
                        Video
                      </Button>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          window.open(detailedCard.DemoURL, "_blank")
                        }
                        className={classes.button}
                      >
                        Demo
                      </Button>
                    </Grid>
                  </div>
                </Grid>
              </Grid>
            </>
          )}
        </div>
      </ThemeProvider>

      <Footer className={classes.fixedFooter} style={{ width: "100%" }} />
    </Layout>
  );
};

export default CardDetailsA;