import { Box, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import Carousel from "../Carousel/Carousel";

const Banner = () => {
  return (
    <Box sx={{ backgroundImage: "url(./banner.jpg)" }}>
      <Container
        sx={{
          height: "400px",
          display: "flex",
          flexDirection: "column",
          paddingTop: "25px",
          justifyContent: "space-around",
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: "40%",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              marginBottom: "15px",
              fontFamily: "Montserrat",
            }}
          >
            Crypto Hunter
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            {" "}
            Get All The Info Regarding Your Favorite Crypto Currency{" "}
          </Typography>
        </Box>
        <Carousel />
      </Container>
    </Box>
  );
};

export default Banner;
