import React from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Box,
  Link,
  Container,
  Button,
} from "@mui/material";

const Details = ({ selectedCard }) => {
  if (!selectedCard) {
    return null;
  }

  const {
    Title,
    Type,
    Summary,
    Description,
    ImageURL,
    Details,
    IconURL,
    TechTags,
    VideoURL,
    DemoURL,
  } = selectedCard;

  // Styling for the "Video" and "Demo" buttons
  const buttonStyle = {
    backgroundColor: "transparent",
    color: "#007bff",
    flex: 1,
    padding: "8px 12px", // Adjust the padding to control the width
    fontSize: "14px",
    textTransform: "capitalize",
    border: "2px solid #007bff",
    fontWeight: "bold",
    borderRadius: "12px",
    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
    margin: "8px",
  };

  return (
    <div style={{ background: "#f0f0f0", overflowY: "auto", height: "100vh" }}>
      <Container maxWidth="lg" style={{ padding: "20px" }}>
        <Typography variant="h4" align="center" gutterBottom>
          {Title}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                style={{
                  position: "relative",
                  paddingBottom: "56.25%",
                }}
                image={ImageURL}
                title={Title}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: "12px",
                    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
                  }}
                ></div>
              </CardMedia>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box marginTop={2}>
                  <Typography variant="body2" color="textSecondary">
                    <span style={{ fontWeight: "bold", color: "black" }}>
                      Type -
                    </span>{" "}
                    {Type}
                  </Typography>
                </Box>

                <Box marginTop={2}>
                  <Typography variant="body2" color="textSecondary">
                    <span style={{ fontWeight: "bold", color: "black" }}>
                      Summary -
                    </span>{" "}
                    {Summary}
                  </Typography>
                </Box>

                <Box marginTop={2}>
                  <Typography variant="body2" color="textSecondary">
                    <span style={{ fontWeight: "bold", color: "black" }}>
                      Description -
                    </span>{" "}
                    {Description}
                  </Typography>
                </Box>

                <Box marginTop={2}>
                  <Typography variant="body2" color="textSecondary">
                    <span style={{ fontWeight: "bold", color: "black" }}>
                      Details -
                    </span>{" "}
                    {Details}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center">
                  <img src={IconURL} alt={Title} style={{ maxWidth: "100%" }} />
                  <Box marginTop={2} marginLeft={2}>
                    <Typography variant="body2" color="textSecondary">
                      <span style={{ fontWeight: "bold", color: "black" }}>
                        Tags -
                      </span>{" "}
                      {TechTags.split(",").map((tag, index) => (
                        <span key={index}>
                          <Link
                            href={`#${tag.trim()}`}
                            style={{ color: "#007bff" }}
                          >
                            {tag.trim()}
                          </Link>
                          {index < TechTags.split(",").length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>

              <Box
                display="flex"
                justifyContent="space-between"
                padding="16px"
                alignItems="center"
              >
                {/* "Video" button */}
                <Button
                  size="small"
                  href={VideoURL}
                  target="_blank"
                  style={buttonStyle}
                >
                  Video
                </Button>

                {/* "Demo" button */}
                <Button
                  size="small"
                  href={DemoURL}
                  style={{
                    ...buttonStyle,
                    marginRight: "8px",
                  }}
                >
                  Demo
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Details;
