import React, { useState, useEffect } from 'react';
import { apiRequest } from '../axios'; // Your dynamic API request function
import './AdminPage.css';
import ImageCompressor from 'browser-image-compression';


const AdminPage = () => {
    // State for managing products, new product data, and product updates
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', price: '', quantity: '', description: '', image: null });
    const [editProduct, setEditProduct] = useState({ id: '', name: '', price: '', quantity: '', description: '', image: null });

    // Fetch all products when the admin page loads
    const fetchProducts = async () => {
        try {
            const data = await apiRequest('GET', '/products');
            setProducts(data.products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    // Add a new product
    const addProduct = async () => {
        if (!newProduct.name || !newProduct.price || !newProduct.quantity || !newProduct.description || !newProduct.image) return;

        const formData = new FormData();
        formData.append('name', newProduct.name);
        formData.append('price', newProduct.price);
        formData.append('quantity', newProduct.quantity);
        formData.append('description', newProduct.description);
        formData.append('image', newProduct.image);  // Ensure the image field is correct

        try {
            const data = await apiRequest('POST', '/products/add', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            setProducts((prev) => [...prev, data]);
            setNewProduct({ name: '', price: '', quantity: '', description: '', image: null });
            console.log('Product added:', data);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };


    // Update an existing product
    const updateProduct = async () => {
        if (!editProduct.id || !editProduct.name || !editProduct.price || !editProduct.quantity || !editProduct.description || !editProduct.image) return;

        const formData = new FormData();
        formData.append('name', editProduct.name);
        formData.append('price', editProduct.price);
        formData.append('quantity', editProduct.quantity);
        formData.append('description', editProduct.description);
        formData.append('image', editProduct.image);

        try {
            const data = await apiRequest('PUT', `/products/edit/${editProduct.id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            setProducts((prev) =>
                prev.map((product) => (product.id === editProduct.id ? data : product))
            );
            setEditProduct({ id: '', name: '', price: '', quantity: '', description: '', image: null });
            console.log('Product updated:', data);
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    // Delete a product
    const deleteProduct = async (id) => {
        try {
            await apiRequest('DELETE', `/products/delete/${id}`);
            setProducts((prev) => prev.filter((product) => product.id !== id));
            console.log('Product deleted');
        } catch (error) {
            console.error('Error deleting product:', error);
        }
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

    // Run fetchProducts on component mount
    useEffect(() => {
        fetchProducts();
    }, []);

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
                <button onClick={addProduct}>Add Product</button>
            </div>

            {/* Edit Product Form */}
            <div>
                <h3>Edit Product</h3>
                <input
                    type="text"
                    placeholder="Product ID"
                    value={editProduct.id}
                    onChange={(e) => setEditProduct({ ...editProduct, id: e.target.value })}
                />
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
                <button onClick={updateProduct}>Update Product</button>
            </div>

            {/* List of Products */}
            <div>
                <h3>All Products</h3>
                <ul>
                    {products?.map((product) => (
                        <li key={product?._id}>
                            <img src={`http://localhost:5000${product?.image}`} alt={product?.name} width="100" />
                            <strong>{product?.name}</strong> - ${product.price}
                            <p>{product?.description}</p>
                            <p>Quantity: {product?.quantity}</p>
                            <button onClick={() => deleteProduct(product?._id)}>Delete</button>
                            <button onClick={() => setEditProduct(product)}>Edit</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminPage;
