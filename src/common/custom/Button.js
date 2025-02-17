import { Button as MUIButton } from "@mui/material";

const Button = (props) => {
    return (
        <MUIButton sx={{ fontSize: {xs: "14px", md: "18px"}, color: "#fff" }} variant="contained" {...props} />
    );
};

export default Button;
