import React, { useState, useEffect } from 'react';
import { productAPI } from '../services/api';
import '../styles/sellerDashboard.css';

function SellerDashboard() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    originalPrice: '',
    category: 'Men',
    conditions: 'Good',
    size: 'M',
    color: '',
    imageUrl: ''
  });

  useEffect(() => {
    fetchSellerProducts();
  }, []);

  const fetchSellerProducts = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await productAPI.getSellerProducts(userId);
      setProducts(response.data);
    } catch (err) {
      console.error('Error fetching products', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddProduct = async () => {
    try {
      await productAPI.create(formData);
      setFormData({
        title: '',
        description: '',
        price: '',
        originalPrice: '',
        category: 'Men',
        conditions: 'Good',
        size: 'M',
        color: '',
        imageUrl: ''
      });
      setShowForm(false);
      fetchSellerProducts();
    } catch (err) {
      console.error('Error adding product', err);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await productAPI.delete(productId);
      fetchSellerProducts();
    } catch (err) {
      console.error('Error deleting product', err);
    }
  };

  return (
    <div className="seller-dashboard">
      <h2>Seller Dashboard</h2>

      <button
        onClick={() => setShowForm(!showForm)}
        className="add-product-btn"
      >
        {showForm ? 'Cancel' : 'Add New Product'}
      </button>

      {showForm && (
        <div className="product-form">
          <h3>Add New Product</h3>
          <input
            type="text"
            name="title"
            placeholder="Product Title"
            value={formData.title}
            onChange={handleInputChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            rows="4"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="originalPrice"
            placeholder="Original Price"
            value={formData.originalPrice}
            onChange={handleInputChange}
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
          <select
            name="conditions"
            value={formData.conditions}
            onChange={handleInputChange}
          >
            <option value="Like New">Like New</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
          </select>
          <input
            type="text"
            name="size"
            placeholder="Size (S, M, L, XL)"
            value={formData.size}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="color"
            placeholder="Color"
            value={formData.color}
            onChange={handleInputChange}
          />
          <input
            type="url"
            name="imageUrl"
            placeholder="Image URL"
            value={formData.imageUrl}
            onChange={handleInputChange}
          />
          <button onClick={handleAddProduct} className="submit-btn">
            Add Product
          </button>
        </div>
      )}

      <div className="seller-products">
        <h3>My Products</h3>
        {products.length === 0 ? (
          <p>No products yet</p>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="seller-product-card">
                <img src={product.imageUrl} alt={product.title} />
                <h4>{product.title}</h4>
                <p>Price: ₹{product.price}</p>
                <p>Status: {product.status}</p>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SellerDashboard;