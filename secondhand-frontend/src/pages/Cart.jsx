import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cartAPI, orderAPI } from '../services/api';
import '../styles/Cart.css';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [shippingAddress, setShippingAddress] = useState('');
  const [shippingPhone, setShippingPhone] = useState('');
  const [showCheckout, setShowCheckout] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const [itemsResponse, totalResponse] = await Promise.all([
        cartAPI.getCart(),
        cartAPI.getTotal()
      ]);
      setCartItems(itemsResponse.data);
      setTotal(totalResponse.data);
    } catch (err) {
      console.error('Error fetching cart', err);
    }
  };

  const handleRemoveItem = async (cartId) => {
    try {
      await cartAPI.removeFromCart(cartId);
      fetchCart();
    } catch (err) {
      console.error('Error removing item', err);
    }
  };

  const handleCheckout = async () => {
    if (!shippingAddress || !shippingPhone) {
      alert('Please fill in shipping details');
      return;
    }

    try {
      await orderAPI.create({
        shippingAddress,
        shippingPhone
      });
      alert('Order placed successfully!');
      navigate('/orders');
    } catch (err) {
      console.error('Error placing order', err);
    }
  };

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.product.imageUrl} alt={item.product.title} />
                <div className="item-details">
                  <h3>{item.product.title}</h3>
                  <p>Price: ₹{item.product.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p className="subtotal">
                    Subtotal: ₹{item.product.price * item.quantity}
                  </p>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>
            <p className="total">Total: ₹{total.toFixed(2)}</p>

            {!showCheckout ? (
              <button
                onClick={() => setShowCheckout(true)}
                className="checkout-btn"
              >
                Proceed to Checkout
              </button>
            ) : (
              <div className="checkout-form">
                <h4>Shipping Details</h4>
                <textarea
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="Enter your shipping address"
                  rows="4"
                />
                <input
                  type="tel"
                  value={shippingPhone}
                  onChange={(e) => setShippingPhone(e.target.value)}
                  placeholder="Enter your phone number"
                />
                <button onClick={handleCheckout} className="place-order-btn">
                  Place Order
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;