import React, { useState, useEffect } from "react";

import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Modal,
  TextField,
  IconButton,
  Button, // Import Button component
  CardActions, // Import CardActions component
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import { useNavigate } from "react-router-dom";

import Footer from "../components/Layout/Footer";

import Layout from "../components/Layout/Layout";

import Details from "./Details";

const SearchBox = ({
  searchInput,
  handleSearchInputChange,
  filteredMenuList,
}) => {
  return (
    <Grid container alignItems="center" justifyContent="space-between">
      <Grid item>
        <Typography
          variant="h5"
          style={{
            fontWeight: "bold",

            paddingBottom: "10px",

            textAlign: "center",

            padding: "5px",

            margin: "0",
          }}
        >
          Proof Of Concept
        </Typography>
      </Grid>

      <Grid item>
        <TextField
          type="text"
          placeholder="Search..."
          variant="outlined"
          fullWidth
          inputProps={{
            style: {
              color: "black",

              padding: "8px 12px",

              background: "transparent",

              textAlign: "center",
            },
          }}
          value={searchInput}
          onChange={handleSearchInputChange}
          style={{ marginBottom: "10px" }}
        />
      </Grid>
    </Grid>
  );
};

const Home = () => {
  const [menuList, setMenuList] = useState([]);

  const [selectedCard, setSelectedCard] = useState(null);

  const [detailsVisible, setDetailsVisible] = useState(false);

  const [searchInput, setSearchInput] = useState("");

  const navigate = useNavigate();

  const fetchMenuData = () => {
    fetch("data/Assets.json")
      .then((response) => response.json())

      .then((data) => {
        setMenuList(data);
      })

      .catch((error) => {
        console.error("Error fetching local JSON:", error);
      });
  };

  useEffect(() => {
    fetchMenuData();
  }, []);

  const handleSearchInputChange = (event) => {
    const inputValue = event.target.value;

    setSearchInput(inputValue);
  };

  const handleCardHover = (event) => {
    event.currentTarget.style.transform = "scale(1.05)";
  };

  const handleCardLeave = (event) => {
    event.currentTarget.style.transform = "scale(1)";
  };

  const handleDetailsClick = (menu) => {
    setSelectedCard(menu);

    setDetailsVisible(true);
  };

  const handleCloseModal = () => {
    setDetailsVisible(false);

    setSelectedCard(null);

    navigate("/home");
  };

  const filteredMenuList = menuList.filter((menu) => {
    return menu.Title.toLowerCase().includes(searchInput.toLowerCase());
  });

  return (
    <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Layout>
        <Container style={{ paddingTop: "25px", paddingBottom: "10px" }}>
          <SearchBox
            searchInput={searchInput}
            handleSearchInputChange={handleSearchInputChange}
            filteredMenuList={filteredMenuList}
          />
        </Container>

        <Container style={{ paddingTop: "20px", paddingBottom: "20px" }}>
          <Grid container spacing={2}>
            {filteredMenuList.map((menu) => (
              <Grid
                item
                key={menu.ID}
                xs={12}
                sm={6}
                md={6}
                style={{ marginBottom: "10px" }}
              >
                <Card
                  style={{
                    borderRadius: "15px",

                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",

                    margin: "10px",
                  }}
                  onMouseEnter={handleCardHover}
                  onMouseLeave={handleCardLeave}
                >
                  <CardMedia
                    style={{ paddingTop: "56.25%" }}
                    image={menu.ImageURL}
                    title={menu.Title}
                  />

                  <CardContent style={{ padding: "10px", marginBottom: "0" }}>
                    <Typography
                      gutterBottom
                      variant="body2"
                      component="div"
                      style={{
                        fontWeight: "bold",

                        color: "black",

                        whiteSpace: "nowrap",

                        overflow: "hidden",

                        textOverflow: "ellipsis",
                      }}
                    >
                      {menu.Title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      style={{ margin: "5px 0" }}
                    >
                      {menu.Type}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      style={{ margin: "5px 0" }}
                    >
                      Summary - {menu.Summary}
                    </Typography>
                  </CardContent>

                  <CardActions style={{ padding: "5px", marginTop: "5px" }}>
                    <Button
                      size="small"
                      onClick={() => handleDetailsClick(menu)}
                      style={{
                        backgroundColor: "transparent",

                        color: "#007bff",

                        borderRadius: "20px",

                        margin: "5px",

                        textTransform: "none",

                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",

                        border: "2px solid #007bff",

                        fontWeight: "bold",
                      }}
                    >
                      Details
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Layout>

      <Modal open={detailsVisible} onClose={handleCloseModal}>
        <div style={{ paddingLeft: "0px" }}>
          <IconButton
            sx={{ position: "absolute", top: 8, right: 8 }}
            onClick={handleCloseModal}
          >
            <CloseIcon sx={{ color: "grey.greyColorFive" }} />
          </IconButton>

          {selectedCard && (
            <Details
              selectedCard={selectedCard}
              onCloseDetails={handleCloseModal}
            />
          )}
        </div>
      </Modal>

      <Footer style={{ marginTop: "20px", width: "100%" }} />
    </div>
  );
};

export default Home;
