import { Typography } from "@mui/material";

const TextErrorDate = (props) =>
    <Typography sx={{ color: "red", position: "absolute", bottom: { xs: "-18px", md: "-22px" }, left: "4px", fontSize: { xs: "12px", md: "12px" } }} color="common.red" variant="p" >
        {props.children}
    </Typography>;

export default TextErrorDate;
