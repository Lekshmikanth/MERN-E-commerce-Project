import React, { useState, useEffect } from 'react';
import { apiRequest } from './apiService'; // Your dynamic API request function

const AdminPage = () => {
    // State for managing products, new product data, and product updates
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '' });
    const [editProduct, setEditProduct] = useState({ id: '', name: '', price: '', description: '' });

    // Fetch all products when the admin page loads
    const fetchProducts = async () => {
        try {
            const data = await apiRequest('GET', '/products');
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    // Add a new product
    const addProduct = async () => {
        if (!newProduct.name || !newProduct.price || !newProduct.description) return;
        try {
            const data = await apiRequest('POST', '/products', newProduct);
            setProducts((prev) => [...prev, data]);
            setNewProduct({ name: '', price: '', description: '' });
            console.log('Product added:', data);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    // Update an existing product
    const updateProduct = async () => {
        if (!editProduct.id || !editProduct.name || !editProduct.price || !editProduct.description) return;
        try {
            const data = await apiRequest('PUT', `/products/${editProduct.id}`, editProduct);
            setProducts((prev) =>
                prev.map((product) => (product._id === editProduct.id ? data : product))
            );
            setEditProduct({ id: '', name: '', price: '', description: '' });
            console.log('Product updated:', data);
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    // Delete a product
    const deleteProduct = async (id) => {
        try {
            await apiRequest('DELETE', `/products/${id}`);
            setProducts((prev) => prev.filter((product) => product._id !== id));
            console.log('Product deleted');
        } catch (error) {
            console.error('Error deleting product:', error);
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
                <textarea
                    placeholder="Description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                />
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
                <textarea
                    placeholder="Description"
                    value={editProduct.description}
                    onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
                />
                <button onClick={updateProduct}>Update Product</button>
            </div>

            {/* List of Products */}
            <div>
                <h3>All Products</h3>
                <ul>
                    {products.map((product) => (
                        <li key={product._id}>
                            <strong>{product.name}</strong> - ${product.price}
                            <p>{product.description}</p>
                            <button onClick={() => deleteProduct(product._id)}>Delete</button>
                            <button onClick={() => setEditProduct(product)}>Edit</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminPage;
