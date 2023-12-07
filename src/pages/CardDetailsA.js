import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";

const theme = createTheme();

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    textAlign: "center",
  },
  cardImageContainer: {
    maxWidth: "100%",
    overflow: "hidden",
    borderRadius: theme.spacing(1),
  },
  cardImage: {
    width: "100%",
    height: "auto",
    borderRadius: theme.spacing(1),
  },
  detailContainer: {
    marginLeft: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
  },
  detailItem: {
    margin: theme.spacing(1, 0),
    textAlign: "justify",
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
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(2),
  },
  button: {
    width: "calc(33.33% - 8px)",
    margin: theme.spacing(1),
  },
  videoDemoButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: theme.spacing(1),
    justifyContent: "space-between",
  },
  videoDemoButtonItem: {
    width: "calc(49% - 4px)",
    margin: theme.spacing(1),
    textTransform: "none",
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
          setDetailedCard(selectedCard);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [cardId]);

  const renderDetailItem = (label, value, additionalClass) => {
    if (label === "Video" || label === "Demo") {
      return (
        <Button
          variant="contained"
          color="primary"
          className={`${classes.detailItem} ${classes.videoDemoButtonItem} ${additionalClass}`}
          onClick={() => window.open(value, "_blank")}
        >
          {`${label.charAt(0).toUpperCase()}${label.slice(1).toLowerCase()}`}
        </Button>
      );
    }

    if (label === "Tags" || label === "TechTags") {
      const tagList = value ? value.split(',') : [];
      const iconURL = detailedCard.IconURL || "";

      if (iconURL) {
        return (
          <div className={classes.detailItem} key={label}>
            <img
              src={iconURL}
              alt={`${label} Icon`}
              style={{ width: '20px', height: '20px', marginRight: '4px' }}
            />
            <strong>{label}:</strong>
            {tagList.map((tag, index) => (
              <Button
                key={index}
                variant="text"
                style={{ color: '#0276aa', textTransform: 'none', marginRight: '4px' }}
                onClick={() => window.open(`/tag/${tag}`, "_blank")}
              >
                {tag}
              </Button>
            ))}
          </div>
        );
      } else {
        return (
          <div className={classes.detailItem} key={label}>
            <strong>{label}:</strong>
            {tagList.map((tag, index) => (
              <Button
                key={index}
                variant="text"
                style={{ color: '#0276aa', textTransform: 'none', marginRight: '4px' }}
                onClick={() => window.open(`/tag/${tag}`, "_blank")}
              >
                {tag}
              </Button>
            ))}
          </div>
        );
      }
    }

    if (label === "IconURL") {
      return null;
    }

    if (label === "Type" || label === "Summary" || label === "Tags" || label === "TechTags") {
      return (
        <div className={classes.detailItem} key={label}>
          <strong>{label}:</strong>
          <Typography
            variant="body1"
            className={classes.detailItem}
            style={{ whiteSpace: 'pre-line' }}
          >
            {value}
          </Typography>
        </div>
      );
    }

    if (label === "Description" || label === "Details") {
      if (value) {
        const paragraphs = value.split('\n').map((paragraph, index) => (
          <Typography
            key={index}
            variant="body1"
            className={classes.detailItem}
            style={{ whiteSpace: 'pre-line' }}
          >
            {paragraph}
          </Typography>
        ));

        return (
          <div key={label} className={classes.detailItem}>
            <strong>{label}:</strong>
            {paragraphs}
          </div>
        );
      }

      return null;
    }

    if (value) {
      return (
        <Typography
          variant="subtitle1"
          className={classes.detailItem}
          key={label}
        >
          <strong>{label}:</strong> {value}
        </Typography>
      );
    }

    return null;
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
    <ThemeProvider theme={theme}>
      <Dialog open={true} onClose={handleClose} fullWidth maxWidth="md">
        {detailedCard && (
          <>
            <DialogTitle className={classes.title}>
              {detailedCard.Title}
            </DialogTitle>
            <DialogContent className={classes.gridContainer}>
              <div className={classes.cardImageContainer}>
                <img
                  src={detailedCard.ImageURL}
                  alt={detailedCard.Title}
                  className={classes.cardImage}
                />
              </div>
              <div className={classes.detailContainer}>
                {renderDetailItem("Type", detailedCard.Type)}
                {renderDetailItem("Summary", detailedCard.Summary)}
                {renderDetailItem("Description", detailedCard.Description)}
                {renderDetailItem("Details", detailedCard.Details)}
                {renderDetailItem("Tags", detailedCard.Tags)}
                {renderDetailItem("TechTags", detailedCard.TechTags)}
                <div className={classes.buttonContainer}>
                  <div className={classes.videoDemoButton}>
                    {renderDetailItem("Video", detailedCard.VideoURL, classes.videoDemoButtonItem)}
                    {renderDetailItem("Demo", detailedCard.DemoURL, classes.videoDemoButtonItem)}
                  </div>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleClose}
                    className={classes.button}
                  >
                    {`Close`.split("").map((char, i) => (
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
              </div>
            </DialogContent>
          </>
        )}
      </Dialog>
    </ThemeProvider>
  );
};

export default CardDetailsA;
