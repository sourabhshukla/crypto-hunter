import { Typography } from "@mui/material";
import { Box } from "@mui/system";

const NotFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        flexDirection: "column",
        gap: "40px",
        marginTop: "100px",
      }}
    >
      <Typography
        variant="h2"
        sx={{ fontFamily: "Montserrat", fontWeight: 800 }}
      >
        404 Not Found
      </Typography>
      <Typography sx={{ fontFamily: "Montserrat" }}>
        The Page that you are looking for does not Exist
      </Typography>
    </Box>
  );
};

export default NotFound;
