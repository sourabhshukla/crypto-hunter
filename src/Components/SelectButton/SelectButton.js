import { Box } from "@mui/material";

const SelectButton = ({ children, selected, handleClick }) => {
  const spanStyle = {
    border: "1px solid gold",
    borderRadius: "5px",
    padding: "10px",
    paddingLeft: "20px",
    paddingRight: "20px",
    fontFamily: "Montserrat",
    cursor: "pointer",
    backgroundColor: selected ? "gold" : "",
    color: selected ? "black" : "",
    fontWeight: selected ? 700 : 500,
    "&:hover": {
      backgroundColor: "gold",
      transition: "all 0.3s ease",
      color: "black",
    },
    width: "22%",
  };
  return (
    <Box component="span" sx={spanStyle} onClick={handleClick}>
      {children}
    </Box>
  );
};

export default SelectButton;
