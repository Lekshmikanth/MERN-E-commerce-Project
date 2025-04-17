import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardMedia, Grid, Typography, CircularProgress } from "@mui/material";
import { useGetCategoriesQuery } from "../appSlice";

const CategoryListing = () => {
    const { data: categories = [], isLoading } = useGetCategoriesQuery();
    const navigate = useNavigate();

    if (isLoading) return <CircularProgress />;

    return (
        <>
            <Grid sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>Categories</Typography>
            </Grid>
            <Grid container spacing={3} sx={{ display: "flex", justifyContent: "center" }}>
                {categories?.map((cat) => (
                    <Grid item xs={12} sm={6} md={4} key={cat._id}>
                        <Card onClick={() => navigate(`/products/${cat?.name}`)} sx={{ cursor: "pointer", width: "150px", backgroundColor: "#F0F7FF", transition: "0.4s", "&:hover": { backgroundColor: "#BBDEFB"} }}>
                            <CardMedia
                                component="img"
                                height="100"
                                image={`http://localhost:5000/api/products/image/${cat?.image}`}
                                alt={cat?.name}
                                sx={{ objectFit: "contain", p: 1 }}
                            />
                            <CardContent>
                                <Typography variant="h6">{cat?.name}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default CategoryListing;
