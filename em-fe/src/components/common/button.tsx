import React from "react";
import Button from "@mui/material/Button";

interface ButtonProps {
  text: string;
  onClick?: () => void; 
  type: 'submit'; 
  sx?:any;
}

const MyButton: React.FC<ButtonProps> = ({ type, text, onClick,sx }) => {
  return (
    <Button
      // sx={{
      //   mx: "auto",
      //   marginX: "120px",
      //   fontWeight: "fontWeightRegular",
      // }}
      // variant="text"
      
      sx={sx}
      onClick={onClick}
      type={type}
      
    >
      {text}
    </Button>
  );
};

export default MyButton;
