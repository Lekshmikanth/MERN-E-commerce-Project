import { useNavigate } from "react-router-dom";
import {
    Card,
    CardContent,
    CardMedia,
    Grid,
    Typography,
    CircularProgress,
    Box,
} from "@mui/material";
import { useGetCategoriesQuery } from "../appSlice";

const CategoryListing = () => {
    const { data: categories = [], isLoading } = useGetCategoriesQuery();
    const navigate = useNavigate();

    if (isLoading)
        return (
            <Box display="flex" justifyContent="center" mt={5}>
                <CircularProgress />
            </Box>
        );

    return (
        <Box sx={{ backgroundColor: "#121212", minHeight: "calc(100vh - 64px)", py: 4 }}>
            <Grid
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    mb: 3,
                }}
            >
                <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{ color: "#FF9021" }}
                    gutterBottom
                >
                    Categories
                </Typography>
            </Grid>

            <Grid
                container
                spacing={3}
                sx={{ display: "flex", justifyContent: "center" }}
            >
                {categories?.map((cat) => (
                    <Grid key={cat._id}>
                        <Card
                            onClick={() => navigate(`/products/${cat?.name}`)}
                            sx={{
                                cursor: "pointer",
                                width: "150px",
                                backgroundColor: "#1e1e1e",
                                transition: "0.3s",
                                borderRadius: 2,
                                color: "#fff",
                                "&:hover": {
                                    backgroundColor: "#2c2c2c",
                                },
                            }}
                            elevation={4}
                        >
                            <CardMedia
                                component="img"
                                height="100"
                                image={`http://localhost:5000/api/products/image/${cat?.image}`}
                                alt={cat?.name}
                                sx={{ objectFit: "contain", p: 1 }}
                            />
                            <CardContent sx={{ textAlign: "center" }}>
                                <Typography variant="subtitle1" fontWeight="bold" sx={{ color: "#FF9021" }}>
                                    {cat?.name}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default CategoryListing;
