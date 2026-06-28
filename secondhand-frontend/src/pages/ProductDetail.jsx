import {useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import {prodctAPI, cartAPI, reviewAPI } from '../services/api';
import './ProductDetail.css';

function ProductDetails(){
    const { id } = useParam();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [reveiwData, setReviewData] = useState({
        reting: 5,
        comment: '',
    });

    useEffect(() =>{
        fetchProduct();
        fetchReveiws();
    }, [id]);
    
    const fetchProduct = async () => {
        try{
            const response = await productAPI.getProductById(id);
            setProduct(response.data);
        }catch(err){
            console.error('Error fetching product', err);
        }
    };

    const fetchReviews = async () => {
        try {
            const reviewsResponse = await reviewsAPI.getProductReviews(id);
            setReviews(response.data);
        }catch(err){
            console.error('Error fetching product',err);
        }
        };

        
        const handleAddToCart = async () => {
            try{
                await cartAPI.addtoCart(id,quantity);
                alert('Added to cart');
            } catch (err) {
                alert('Please login to add to cart');
            }
        };
        const handleAddReview = async () => {
        try {
      await reviewAPI.addReview({
        productId: id,
        rating: reviewData.rating,
        comment: reviewData.comment,
      });
      setReviewData({ rating: 5, comment: '' });
      fetchReviews();
    } catch (err) {
      console.error('Error adding review', err);
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-detail">
      <div className="product-image">
        <img src={product.imageUrl} alt={product.title} />
      </div>

      <div className="product-info">
        <h1>{product.title}</h1>
        <p className="description">{product.description}</p>

        <div className="pricing">
          <span className="price">₹{product.price}</span>
          <span className="original-price">₹{product.originalPrice}</span>
        </div>

        <div className="details">
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Condition:</strong> {product.conditions}</p>
          <p><strong>Size:</strong> {product.size}</p>
          <p><strong>Color:</strong> {product.color}</p>
          <p><strong>Rating:</strong> {rating.toFixed(1)} ⭐</p>
        </div>

        <div className="cart-section">
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
          <button onClick={handleAddToCart} className="add-to-cart-btn">
            Add to Cart
          </button>
        </div>

        <div className="reviews-section">
          <h3>Reviews</h3>
          {reviews.map((review) => (
            <div key={review.id} className="review">
              <span className="rating">⭐ {review.rating}</span>
              <p className="comment">{review.comment}</p>
            </div>
          ))}

          <div className="add-review">
            <h4>Add Your Review</h4>
            <select
              value={reviewData.rating}
              onChange={(e) =>
                setReviewData({ ...reviewData, rating: parseInt(e.target.value) })
              }
            >
              <option value="1">1 ⭐</option>
              <option value="2">2 ⭐</option>
              <option value="3">3 ⭐</option>
              <option value="4">4 ⭐</option>
              <option value="5">5 ⭐</option>
            </select>
            <textarea
              value={reviewData.comment}
              onChange={(e) =>
                setReviewData({ ...reviewData, comment: e.target.value })
              }
              placeholder="Write your review..."
              rows="4"
            />
            <button onClick={handleAddReview}>Submit Review</button>
          </div>
        </div>
      </div>
    </div>
  );
        
}