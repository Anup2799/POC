import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  makeStyles,
  ThemeProvider,
  Grid,
  CircularProgress,
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
  title: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
    margin: 0,
  },
  subtitle: {
    fontSize: "1.3rem",
    fontWeight: "bold",
    color: "black",
    margin: theme.spacing(1, 0),
  },
  detailContainer: {
    marginTop: theme.spacing(1),
  },
  detailItem: {
    margin: theme.spacing(1, 0),
    color: "black",
  },
  image: {
    width: "100%",
    maxWidth: "600px",
    height: "auto",
    borderRadius: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  iconImage: {
    width: "30px",
    height: "30px",
    marginRight: theme.spacing(1),
  },
  fixedFooter: {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    zIndex: 1000,
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "50vh",
  },
  button: {
    background: "#1769aa",
    color: "white",
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    cursor: "pointer",
    textTransform: "capitalize",
  },
  tagsContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
  },
  tagsHeading: {
    marginRight: theme.spacing(1),
    fontSize: "1.1rem",
    fontWeight: "bold",
  },
  tagsData: {
    marginLeft: theme.spacing(1),
    fontSize: "1rem",
  },
  linkText: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    cursor: "pointer",
  },
}));

const CardDetailsA = ({ onClose }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { cardId } = useParams();
  const [detailedCard, setDetailedCard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
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
      })
      .finally(() => {
        setLoading(false);
      });
  }, [cardId]);

  const handleVideoClick = () => {
    if (detailedCard && detailedCard.VideoURL) {
      window.open(detailedCard.VideoURL, "_blank");
    } else {
      console.error("VideoURL not available");
    }
  };

  const handleDemoClick = () => {
    if (detailedCard && detailedCard.DemoURL) {
      window.open(detailedCard.DemoURL, "_blank");
    } else {
      console.error("DemoURL not available");
    }
  };

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
        {loading ? (
          <div className={classes.loadingContainer}>
            <CircularProgress />
          </div>
        ) : (
          <div className={classes.container}>
            {detailedCard && (
              <>
                <Typography className={classes.title} variant="h3">
                  {detailedCard.Title}
                </Typography>
                <Grid container className={classes.detailContainer} spacing={2}>
                  <Grid item xs={12} md={6}>
                    <img
                      src={detailedCard.ImageURL}
                      alt={detailedCard.Title}
                      className={classes.image}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <div>
                      <Typography variant="h3" className={classes.subtitle}>
                        Type:
                      </Typography>
                      <Typography variant="body1" className={classes.detailItem}>
                        {detailedCard.Type}
                      </Typography>

                      <Typography variant="h3" className={classes.subtitle}>
                        Summary:
                      </Typography>
                      <Typography variant="body1" className={classes.detailItem}>
                        {detailedCard.Summary}
                      </Typography>

                      <Typography variant="h3" className={classes.subtitle}>
                        Description:
                      </Typography>
                      {detailedCard.Description && (
                        <div className={classes.detailItem}>
                          {detailedCard.Description.map((paragraph, index) => (
                            <React.Fragment key={index}>
                              <Typography variant="body1">{paragraph}</Typography>
                              {index < detailedCard.Description.length - 1 && <div style={{ height: "10px" }} />}
                            </React.Fragment>
                          ))}
                        </div>
                      )}

                      <Typography variant="h3" className={classes.subtitle}>
                        Details:
                      </Typography>
                      {detailedCard.Details && (
                        <div className={classes.detailItem}>
                          {detailedCard.Details.map((paragraph, index) => (
                            <React.Fragment key={index}>
                              <Typography variant="body1">{paragraph}</Typography>
                              {index < detailedCard.Details.length - 1 && <div style={{ height: "10px" }} />}
                            </React.Fragment>
                          ))}
                        </div>
                      )}

                      {detailedCard.IconURL && (
                        <div className={classes.tagsContainer}>
                          <img
                            src={detailedCard.IconURL}
                            alt="Icon"
                            className={classes.iconImage}
                          />
                          <Typography variant="h3" className={classes.tagsHeading}>
                            Tags:
                          </Typography>
                        </div>
                      )}

                      {detailedCard.Tags && (
                        <div className={classes.tagsData}>
                          <Typography variant="body1" className={classes.detailItem}>
                            <span className={classes.linkText}>{detailedCard.Tags}</span>
                          </Typography>
                        </div>
                      )}

                      {detailedCard.IconURL && (
                        <div className={classes.tagsContainer}>
                          <img
                            src={detailedCard.IconURL}
                            alt="Icon"
                            className={classes.iconImage}
                          />
                          <Typography variant="h3" className={classes.tagsHeading}>
                            TechTags:
                          </Typography>
                        </div>
                      )}

                      {detailedCard.TechTags && (
                        <div className={classes.tagsData}>
                          <Typography variant="body1" className={classes.detailItem}>
                            <span className={classes.linkText}>{detailedCard.TechTags}</span>
                          </Typography>
                        </div>
                      )}

                      <Grid container spacing={2} className={classes.detailItem}>
                        <Grid item>
                          <button className={classes.button} onClick={handleVideoClick}>
                            Video
                          </button>
                        </Grid>
                        <Grid item>
                          <button className={classes.button} onClick={handleDemoClick}>
                            Demo
                          </button>
                        </Grid>
                        <Grid item>
                          <button className={classes.button} onClick={handleClose}>
                            Close
                          </button>
                        </Grid>
                      </Grid>
                    </div>
                  </Grid>
                </Grid>
              </>
            )}
          </div>
        )}
      </ThemeProvider>

      <Footer className={classes.fixedFooter} style={{ width: "100%" }} />
    </Layout>
  );
};

export default CardDetailsA;
