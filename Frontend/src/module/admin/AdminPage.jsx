import React, { useState } from 'react';
// import { apiRequest } from '../axios'; // Your dynamic API request function
import './AdminPage.css';
import ImageCompressor from 'browser-image-compression';
import { useAddProductMutation, useDeleteProductMutation, useGetProductsQuery, useUpdateProductMutation } from '../apiSlice';


const AdminPage = () => {
    // State for managing products, new product data, and product updates
    // const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', price: '', quantity: '', description: '', image: null });
    const [editProduct, setEditProduct] = useState({ _id: '', name: '', price: '', quantity: '', description: '', image: null });
    console.log("first", editProduct);
    // const data = [{ _id: 1, name: 'Laptop', price: '1200', quantity: '3', description: 'Good condition', image: null }]
    // const { data: products, error, isLoading } = useGetProductsQuery();
    const { data: products } = useGetProductsQuery();
    const [addProduct] = useAddProductMutation();
    const [updateProduct] = useUpdateProductMutation();
    const [deleteProduct] = useDeleteProductMutation();

    const handleAddProduct = async () => {
        await addProduct(newProduct);
    };

    const handleUpdate = async () => {
        await updateProduct(editProduct);
    };

    const handleDelete = async (id) => {
        await deleteProduct(id);
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
        <div>
            <h2>Admin - Product Management</h2>

            {/* Add Product Form */}
            <div>
                <h3>Add New Product</h3>
                <input
                    type="text"
                    placeholder="Product Name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Price"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Quantity"
                    value={newProduct.quantity}
                    onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                />
                <textarea
                    placeholder="Description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                />
                <input
                    type="file"
                    onChange={(e) => handleImageChange(e, setNewProduct)}
                />
                {newProduct?.image && (
                    <img
                        src={URL.createObjectURL(newProduct?.image)}
                        alt="preview"
                        style={{ width: '100px', height: '100px' }}
                    />
                )}
                <button onClick={handleAddProduct}>Add Product</button>
            </div>

            {/* Edit Product Form */}
            <div>
                <h3>Edit Product</h3>
                <input
                    type="text"
                    placeholder="Product Name"
                    value={editProduct.name}
                    onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Price"
                    value={editProduct.price}
                    onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Quantity"
                    value={editProduct.quantity}
                    onChange={(e) => setEditProduct({ ...editProduct, quantity: e.target.value })}
                />
                <textarea
                    placeholder="Description"
                    value={editProduct.description}
                    onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
                />
                <input
                    type="file"
                    onChange={(e) => handleImageChange(e, setEditProduct)}
                />
                {editProduct.image && (
                    <img
                        src={URL.createObjectURL(editProduct.image)}
                        alt="preview"
                        style={{ width: '100px', height: '100px' }}
                    />
                )}
                <button onClick={handleUpdate}>Update Product</button>
            </div>

            {/* List of Products */}
            <div>
                <h3>All Products</h3>
                <ul>
                    {products?.map((product) => (
                        <li key={product?._id}>
                            <img src={`http://localhost:5000${product?.image}`} alt={product?.name} width="100" />
                            <strong>{product?.name}</strong> - ${product?.price}
                            <p>{product?.description}</p>
                            <p>Quantity: {product?.quantity}</p>
                            <button onClick={() => handleDelete(product?._id)}>Delete</button>
                            <button onClick={() => setEditProduct(product)}>Edit</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminPage;
