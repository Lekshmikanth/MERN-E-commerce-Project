import { Box } from "@mui/material";
import { PacmanLoader as CustomLoader } from "react-spinners";

const Loader = (props) => {
    return (<Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" >
        <CustomLoader {...props} color="#36d7b7" />
    </Box>);
};

export default Loader;
