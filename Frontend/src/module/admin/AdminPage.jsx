import React, { useState } from 'react';
import './AdminPage.css';
import ImageCompressor from 'browser-image-compression';
import { useAddProductMutation, useDeleteProductMutation, useGetProductsQuery, useUpdateProductMutation } from '../appSlice';
import { Button, Grid } from '@mui/material';
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

        if (edit) {
            try {
                const result = await updateProduct({ id: product?._id, formData });
                if ("data" in result) {
                    setAddEditOpen(false);
                    notifySuccess("Product Updated Successfully");
                    setProduct(productInitialState);
                }
            } catch (error) {
                notifyError("Failed To Update Product");
            }
        } else {
            try {
                const result = await addProduct(formData);
                if ("data" in result) {
                    notifySuccess("Product Added Successfully");
                    setProduct(productInitialState);
                    setAddEditOpen(false);
                }
            } catch {
                notifyError("Failed To Add Product");
            }
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteProduct(id);
            notifySuccess("Product deleted successfully");
        } catch (error) {
            notifyError("Failed to delete product");
        }
    };

    const handleClose = () => {
        setAddEditOpen(!addEditOpen);
        setProduct(productInitialState);
    }

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
            setProduct((prevProduct) => ({ ...prevProduct, image: compressedFile }));
        } catch (error) {
            console.error("Image compression failed", error);
        }
    };
    // Handle image file selection
    const handleImageChange = (e, setProduct) => {
        const file = e.target.files[0];
        if (file) {
            compressImage(file, setProduct);
        }
    };


    return (
        <div style={{ margin: "0px 20px" }}>
            <h2 style={{ marginTop: "10px" }}>Admin - Product Management</h2>
            <Grid container sx={{ display: "flex", justifyContent: "end", margin: "15px 0px" }}>
                <Button sx={{ backgroundColor: "#1976D2", color: "white", "&:hover": { backgroundColor: "#318eeb" } }} onClick={() => handleAddNewProduct()}>Add New Product</Button>
            </Grid>
            <ProductListingTable products={products?.products?.length > 0 ? products?.products : ""} setProduct={setProduct} setAddEditOpen={setAddEditOpen} handleDelete={handleDelete} setEdit={setEdit} />
            <AddEditDialoge product={product} setProduct={setProduct} handleClose={handleClose} addEditOpen={addEditOpen} handleSubmit={handleSubmit} handleImageChange={handleImageChange} edit={edit} />
            <AdminUserManagement />
            <CategoryListingTable />
        </div>
    );
};

export default AdminPage;
