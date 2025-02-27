import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

function ProductsHome() {
    return (
        <>
            <Box sx={{ m: 2 }}>
                <Outlet />
            </Box>
        </>
    );
}

export default ProductsHome;