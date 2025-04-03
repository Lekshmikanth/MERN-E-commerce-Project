import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { PacmanLoader as CustomLoader } from "react-spinners";

const useStyles = makeStyles({
    loaderContainer: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(255, 255, 255, 0.5)", // Transparent white background
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
    },
});

const Loader = (props) => {
    const classes = useStyles();
    return (<Box className={classes.loaderContainer} >
        <CustomLoader {...props} color="#36d7b7" />
    </Box>);
};

export default Loader;
