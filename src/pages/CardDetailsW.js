import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
} from "@material-ui/core/styles";

const theme = createMuiTheme();

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    textAlign: "center",
  },
  cardImage: {
    maxWidth: "100%",
    height: "auto",
    borderRadius: theme.spacing(1),
  },
  detailContainer: {
    marginLeft: theme.spacing(2),
  },
  detailItem: {
    margin: theme.spacing(1, 0),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
  },
  bold: {
    fontWeight: "bold",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      gridTemplateColumns: "1fr 1fr",
    },
  },
}));

const CardDetailsW = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { cardId } = useParams();
  const [card, setCard] = useState(null);

  useEffect(() => {
    fetch(`/data/Whitepaper.json`)
      .then((response) => response.json())
      .then((data) => {
        const selectedCard = data.find((item) => item.ID === cardId);
        if (selectedCard) {
          setCard(selectedCard);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [cardId]);

  const renderDetailItem = (label, value) => {
    if (value) {
      return (
        <Typography variant="subtitle1" className={classes.detailItem} key={label}>
          <strong>{label}:</strong> {value}
        </Typography>
      );
    }
    return null;
  };

  const handleTagsClick = (tags) => {
    console.log("Tags Clicked:", tags);
  };

  const handleClose = () => {
    navigate("/pages/whitepapers");
  };

  return (
    <ThemeProvider theme={theme}>
      <Dialog open={true} onClose={handleClose} fullWidth maxWidth="md">
        {card && (
          <>
            <DialogTitle className={classes.title}>{card.Title}</DialogTitle>
            <DialogContent className={classes.gridContainer}>
              <img
                src={card.ImageURL}
                alt={card.Title}
                className={classes.cardImage}
              />
              <div>
                {renderDetailItem("Type", card.Type)}
                {renderDetailItem("Brief", card.Brief)}
                {renderDetailItem("Authors", card.Authors)}
                {renderDetailItem(
                  "URL",
                  <a
                    href={card.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${classes.link} ${classes.bold}`}
                  >
                    {card.url}
                  </a>
                )}
                {renderDetailItem(
                  "Tags",
                  <span
                    className={`${classes.link} ${classes.bold}`}
                    onClick={() => handleTagsClick(card.tags)}
                  >
                    {card.tags}
                  </span>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClose}
                  className={classes.detailItem}
                  style={{ textTransform: "capitalize" }}
                >
                  Close
                </Button>
              </div>
            </DialogContent>
          </>
        )}
      </Dialog>
    </ThemeProvider>
  );
};

export default CardDetailsW;
