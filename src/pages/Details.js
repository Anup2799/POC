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
    Tags,
    TechTags,
    VideoURL,
    DemoURL,
  } = selectedCard;

  function splitTextIntoParagraphs(text) {
    const paragraphs = text.split("\n").map((paragraph, index) => (
      <p key={index} style={{ margin: "10px 0", textAlign: "justify" }}>
        {paragraph}
      </p>
    ));
    return paragraphs;
  }

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
                  paddingBottom: "56.25%", // 16:9 aspect ratio
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
                    borderRadius: "12px", // Rounded-rectangle edge
                    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)", // Box shadow for 3D effect
                  }}
                ></div>
              </CardMedia>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box>
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
                    {splitTextIntoParagraphs(Description)}
                  </Typography>
                </Box>

                <Box marginTop={2}>
                  <Typography variant="body2" color="textSecondary">
                    <span style={{ fontWeight: "bold", color: "black" }}>
                      Details -
                    </span>{" "}
                    {splitTextIntoParagraphs(Details)}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center">
                  <img src={IconURL} alt={Title} style={{ maxWidth: "100%" }} />
                  <Box marginTop={2} marginLeft={2}>
                    <Typography variant="body2" color="textSecondary">
                      <span style={{ fontWeight: "bold", color: "black" }}>
                        Tags -
                      </span>{" "}
                      {Tags.split(",").map((tag, index) => (
                        <span key={index}>
                          <Link
                            href={`#${tag.trim()}`}
                            style={{ color: "#007bff" }}
                          >
                            {tag.trim()}
                          </Link>
                          {index < Tags.split(",").length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </Typography>
                  </Box>
                </Box>

                <Box display="flex" alignItems="center">
                  <img src={IconURL} alt={Title} style={{ maxWidth: "100%" }} />
                  <Box marginTop={2} marginLeft={2}>
                    <Typography variant="body2" color="textSecondary">
                      <span style={{ fontWeight: "bold", color: "black" }}>
                        TechTags -
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
                <Button
                  size="small"
                  href={VideoURL}
                  target="_blank"
                  style={{
                    backgroundColor: "#007bff",
                    color: "white",
                    flex: 1,
                    padding: "12px",
                    fontSize: "16px",
                    textTransform: "capitalize",
                  }}
                >
                  Video
                </Button>

                <Button
                  size="small"
                  href={DemoURL}
                  style={{
                    backgroundColor: "#007bff",
                    color: "white",
                    flex: 1,
                    marginLeft: "8px",
                    padding: "12px",
                    fontSize: "16px",
                    textTransform: "capitalize",
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
