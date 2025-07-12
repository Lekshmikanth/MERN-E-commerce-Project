import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Grid,
    MenuItem,
    TextField,
} from '@mui/material';
import React from 'react';
import { useGetCategoriesQuery } from '../appSlice';

const AddEditDialoge = (props) => {
    const {
        product,
        setProduct,
        handleClose,
        addEditOpen,
        handleSubmit,
        handleImageChange,
        edit
    } = props;

    const { data: categories } = useGetCategoriesQuery();

    const handleAddUpdate = () => {
        handleSubmit();
    };

    return (
        <Dialog
            open={addEditOpen}
            onClose={handleClose}
            PaperProps={{
                sx: {
                    backgroundColor: "#1e1e1e",
                    color: "#fff",
                    width: 360,
                },
            }}
        >
            <DialogTitle sx={{ color: "#FF9021" }}>
                {edit ? "Edit Product" : "Add New Product"}
            </DialogTitle>

            <DialogContent sx={{ mt: -1 }}>
                <Grid sx={{ marginTop: "10px", justifyContent: "center" }}>
                    <Grid item>
                        <TextField
                            select
                            label="Select Category"
                            value={product?.category}
                            onChange={(e) => setProduct({ ...product, category: e.target.value })}
                            sx={{
                                width: "300px",
                                mb: 2,
                                "& .MuiInputBase-root": {
                                    backgroundColor: "#2c2c2c",
                                    color: "#fff",
                                },
                                "& .MuiInputLabel-root": {
                                    color: "#aaa",
                                },
                            }}
                        >
                            {categories?.length > 0 &&
                                categories.map((option) => (
                                    <MenuItem key={option.name} value={option.name}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                        </TextField>
                    </Grid>

                    <TextField
                        label="Product Name"
                        value={product?.name}
                        onChange={(e) => setProduct({ ...product, name: e.target.value })}
                        sx={{
                            width: "300px",
                            mb: 2,
                            "& .MuiInputBase-root": { backgroundColor: "#2c2c2c", color: "#fff" },
                            "& .MuiInputLabel-root": { color: "#aaa" },
                        }}
                        variant="outlined"
                    />

                    <TextField
                        label="Price"
                        type="number"
                        value={product?.price}
                        onChange={(e) => setProduct({ ...product, price: e.target.value })}
                        sx={{
                            width: "300px",
                            mb: 2,
                            "& .MuiInputBase-root": { backgroundColor: "#2c2c2c", color: "#fff" },
                            "& .MuiInputLabel-root": { color: "#aaa" },
                        }}
                        variant="outlined"
                    />

                    <Grid sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <TextField
                            type="number"
                            label="Qty"
                            value={product?.quantity}
                            onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
                            variant="outlined"
                            size="small"
                            sx={{
                                width: "70px",
                                "& .MuiInputBase-root": { backgroundColor: "#2c2c2c", color: "#fff" },
                                "& .MuiInputLabel-root": { color: "#aaa" },
                            }}
                            InputProps={{ inputProps: { min: 1 } }}
                        />
                        <FormControlLabel
                            sx={{ ml: 2, color: "#ccc" }}
                            control={
                                <Checkbox
                                    checked={product?.isTrending}
                                    onChange={(e) =>
                                        setProduct({ ...product, isTrending: e.target.checked })
                                    }
                                    sx={{
                                        color: "#FF9021",
                                        '&.Mui-checked': { color: "#cc711a" },
                                    }}
                                />
                            }
                            label="Trending"
                        />
                    </Grid>

                    <TextField
                        label="Description"
                        multiline
                        minRows={2}
                        value={product?.description}
                        onChange={(e) => setProduct({ ...product, description: e.target.value })}
                        variant="outlined"
                        sx={{
                            width: "300px",
                            mb: 2,
                            "& .MuiInputBase-root": { backgroundColor: "#2c2c2c", color: "#fff" },
                            "& .MuiInputLabel-root": { color: "#aaa" },
                        }}
                    />

                    <Grid display="flex" alignItems="center" gap={1}>
                        <input
                            type="file"
                            onChange={(e) => handleImageChange(e, setProduct)}
                            style={{ color: "#fff", width: "200px" }}
                        />
                        {product?.image && (
                            <img
                                src={
                                    typeof product?.image === 'string'
                                        ? `http://localhost:5000/api/products/image/${product.image}`
                                        : URL.createObjectURL(product?.image)
                                }
                                alt="preview"
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    objectFit: "cover",
                                    borderRadius: 8,
                                    border: "1px solid #555",
                                }}
                            />
                        )}
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions sx={{ pr: 3, pb: 2 }}>
                <Button onClick={handleClose} sx={{ color: "#ccc" }}>
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={handleAddUpdate}
                    sx={{
                        backgroundColor: "#FF9021",
                        color: "#fff",
                        '&:hover': { backgroundColor: "#cc711a" },
                    }}
                >
                    {edit ? "Update" : "Add"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddEditDialoge;
