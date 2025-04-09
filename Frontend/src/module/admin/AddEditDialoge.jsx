import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Grid, MenuItem, TextField } from '@mui/material'
import React from 'react'
import { categoryDropdown } from './constants';

const AddEditDialoge = (props) => {
    const { product, setProduct, handleClose, addEditOpen, handleUpdate, handleImageChange, edit, handleAddProduct } = props;

    const handleAddUpdate = () => {
        if (edit) {
            handleUpdate()
        } else {
            handleAddProduct()
        }
    };

    return (
        <>
            <Dialog open={addEditOpen} onClose={handleClose}>
                <DialogTitle>{edit ? "Edit Product" : "Add New Product"}</DialogTitle>
                <DialogContent sx={{ mt: -1 }}>
                    <div style={{ marginTop: "10px" }}>
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Select Category"
                            // helperText="Please select product category"
                            value={product?.category}
                            sx={{ width: "300px" }}
                            onChange={(e) => setProduct({ ...product, category: e.target.value })}
                        >
                            {categoryDropdown?.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <input
                            type="text"
                            placeholder="Product Name"
                            value={product?.name}
                            onChange={(e) => setProduct({ ...product, name: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Price"
                            value={product?.price}
                            onChange={(e) => setProduct({ ...product, price: e.target.value })}
                        />
                        <Grid display={"flex"}>
                            <input
                                width={"30px"}
                                type="number"
                                placeholder="Quantity"
                                value={product?.quantity}
                                onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
                            />
                            <FormControlLabel
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
                        <textarea
                            placeholder="Description"
                            value={product?.description}
                            onChange={(e) => setProduct({ ...product, description: e.target.value })}
                        />
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
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" onClick={handleAddUpdate}>{edit ? "Update" : "Add"}</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddEditDialoge;