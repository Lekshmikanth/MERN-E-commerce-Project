import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Grid, MenuItem, TextField } from '@mui/material'
import React from 'react'
import { categoryDropdown } from './constants';

const AddEditDialoge = (props) => {
    const { product, setProduct, handleClose, addEditOpen, handleSubmit, handleImageChange, edit } = props;

    const handleAddUpdate = () => {
        handleSubmit();
    };

    return (
        <>
            <Dialog open={addEditOpen} onClose={handleClose}>
                <DialogTitle>{edit ? "Edit Product" : "Add New Product"}</DialogTitle>
                <DialogContent sx={{ mt: -1 }}>
                    <Grid sx={{ marginTop: "10px", justifyContent: "center", }}>
                        <Grid item>
                            <TextField
                                id="outlined-select-currency"
                                select
                                label="Select Category"
                                // helperText="Please select product category"
                                value={product?.category}
                                sx={{ width: "300px", mb: 2 }}
                                onChange={(e) => setProduct({ ...product, category: e.target.value })}
                            >
                                {categoryDropdown?.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid >
                            <TextField
                                sx={{ width: "300px", mb: 2 }}
                                variant="outlined"
                                label="Product Name"
                                value={product?.name}
                                onChange={(e) => setProduct({ ...product, name: e.target.value })}
                            />
                        </Grid>

                        <TextField
                            sx={{ width: "300px", mb: 2 }}
                            variant="outlined"
                            label="Price"
                            type="number"
                            value={product?.price}
                            onChange={(e) => setProduct({ ...product, price: e.target.value })}
                        />
                        <Grid sx={{ display: "flex", mb: 2 }}>
                            <TextField
                                type="number"
                                label="Qty"
                                value={product?.quantity}
                                onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
                                variant="outlined"
                                size="small"
                                sx={{ width: "70px" }}
                                InputProps={{
                                    inputProps: { min: 1 }
                                }}
                            />
                            <FormControlLabel sx={{ ml: 2, color: "#6b6866" }}
                                control={
                                    <Checkbox
                                        name="isTrending"
                                        checked={product?.isTrending}
                                        onChange={(e) => setProduct({ ...product, isTrending: e.target.checked })}
                                    />
                                }
                                label="Trending"
                            />
                        </Grid>
                        <Grid>
                            <TextField
                                label="Description"
                                multiline
                                minRows={1}
                                value={product?.description}
                                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                                variant="outlined"
                                sx={{ width: "300px" }}
                            />
                        </Grid>
                        <Grid display={"flex"}>
                            <input
                                type="file"
                                style={{ width: "200px" }}
                                onChange={(e) => handleImageChange(e, setProduct)}
                            />
                            {product?.image && (
                                <img
                                    src={
                                        typeof product?.image === 'string'
                                            ? product?.image
                                            : URL.createObjectURL(product?.image)
                                    }
                                    alt="preview"
                                    style={{ width: '100px', height: '100px' }}
                                />
                            )}
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ mr: 2 }}>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" onClick={handleAddUpdate}>{edit ? "Update" : "Add"}</Button>
                </DialogActions>
            </Dialog >
        </>
    )
}

export default AddEditDialoge;