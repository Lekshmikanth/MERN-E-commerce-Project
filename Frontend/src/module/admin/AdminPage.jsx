import React, { useState } from 'react';
import './AdminPage.css';
import ImageCompressor from 'browser-image-compression';
import {
    useAddProductMutation,
    useDeleteProductMutation,
    useGetProductsQuery,
    useUpdateProductMutation,
} from '../appSlice';
import {
    Box,
    Button,
    Grid,
    Typography,
    Paper,
} from '@mui/material';
import ProductListingTable from './ProductListingTable';
import AddEditDialoge from './AddEditDialoge';
import { notifyError, notifySuccess } from '../common/Notifications/constants';
import { productInitialState } from './constants';
import AdminUserManagement from './AdminUserManagement';
import CategoryListingTable from './CategoryListingTable';

const AdminPage = () => {
    const [product, setProduct] = useState(productInitialState);
    const [addEditOpen, setAddEditOpen] = useState(false);
    const [edit, setEdit] = useState(false);

    const { data: products = {} } = useGetProductsQuery({});
    const [addProduct] = useAddProductMutation();
    const [updateProduct] = useUpdateProductMutation();
    const [deleteProduct] = useDeleteProductMutation();

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("category", product.category);
        formData.append("name", product.name);
        formData.append("price", product.price);
        formData.append("quantity", product.quantity);
        formData.append("description", product.description);
        formData.append("image", product.image);
        formData.append("isTrending", product.isTrending);

        try {
            const result = edit
                ? await updateProduct({ id: product?._id, formData })
                : await addProduct(formData);

            if ("data" in result) {
                notifySuccess(edit ? "Product Updated Successfully" : "Product Added Successfully");
                setProduct(productInitialState);
                setAddEditOpen(false);
                setEdit(false);
            }
        } catch (error) {
            notifyError(edit ? "Failed To Update Product" : "Failed To Add Product");
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteProduct(id);
            notifySuccess("Product deleted successfully");
        } catch {
            notifyError("Failed to delete product");
        }
    };

    const handleClose = () => {
        setAddEditOpen(false);
        setProduct(productInitialState);
    };

    const handleAddNewProduct = () => {
        setEdit(false);
        setAddEditOpen(true);
    };

    const compressImage = async (file, setProduct) => {
        try {
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 800,
                useWebWorker: true,
            };
            const compressedFile = await ImageCompressor(file, options);
            setProduct((prev) => ({ ...prev, image: compressedFile }));
        } catch (error) {
            console.error("Image compression failed", error);
        }
    };

    const handleImageChange = (e, setProduct) => {
        const file = e.target.files[0];
        if (file) {
            compressImage(file, setProduct);
        }
    };

    return (
        <Box
            sx={{
                p: 3,
                backgroundColor: "#121212",
                minHeight: "100vh",
                color: "#fff",
            }}
        >
            <Paper elevation={4} sx={{ backgroundColor: "#1e1e1e", p: 3, borderRadius: 2 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: "#FF9021" }}>
                    Admin - Product Management
                </Typography>

                <Grid container justifyContent="flex-end" sx={{ mb: 2 }}>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#FF9021",
                            color: "#fff",
                            "&:hover": { backgroundColor: "#cc711a" },
                        }}
                        onClick={handleAddNewProduct}
                    >
                        Add New Product
                    </Button>
                </Grid>

                <ProductListingTable
                    products={products?.products?.length > 0 ? products?.products : ""}
                    setProduct={setProduct}
                    setAddEditOpen={setAddEditOpen}
                    handleDelete={handleDelete}
                    setEdit={setEdit}
                />

                <AddEditDialoge
                    product={product}
                    setProduct={setProduct}
                    handleClose={handleClose}
                    addEditOpen={addEditOpen}
                    handleSubmit={handleSubmit}
                    handleImageChange={handleImageChange}
                    edit={edit}
                />
            </Paper>

            {/* Additional Admin Sections */}
            <Box mt={4}>
                <AdminUserManagement />
            </Box>
            <Box mt={4}>
                <CategoryListingTable />
            </Box>
        </Box>
    );
};

export default AdminPage;
