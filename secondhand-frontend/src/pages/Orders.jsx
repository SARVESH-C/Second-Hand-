import React, { useState, useEffect } from 'react';
import { orderAPI } from '../services/api';
import '../styles/Order.css';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, [page]);

  const fetchOrders = async () => {
    try {
      const response = await orderAPI.getOrders(page);
      setOrders(response.data.content);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching orders', err);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      await orderAPI.cancelOrder(orderId);
      fetchOrders();
    } catch (err) {
      console.error('Error cancelling order', err);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="orders">
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <h3>Order #{order.orderNumber}</h3>
                <span className={`status ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </div>
              <div className="order-details">
                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                <p>Total: ₹{order.totalPrice.toFixed(2)}</p>
                <p>Shipping Address: {order.shippingAddress}</p>
              </div>
              <div className="order-items">
                <h4>Items:</h4>
                {order.items.map((item) => (
                  <div key={item.id} className="order-item">
                    <p>{item.product.title} x{item.quantity}</p>
                    <p>₹{item.price}</p>
                  </div>
                ))}
              </div>
              {order.status === 'PENDING' && (
                <button
                  onClick={() => handleCancelOrder(order.id)}
                  className="cancel-btn"
                >
                  Cancel Order
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="pagination">
        <button onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0}>
          Previous
        </button>
        <span>Page {page + 1}</span>
        <button onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Orders;