import { Typography } from "@mui/material";

const TextError = (props) =>
  <Typography sx={{ color: "red", fontSize: "12px" }} color="common.red" variant="p" >
    {props.children}
  </Typography>;

export default TextError;
