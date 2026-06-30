import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {productAPI} from '../services/api';
import '../styles/Home.css';

function Home() {
    const [products,setProducts] = useState([]);
    const [category, setCategory] = useState('');
    const [page, setPage] = useState(0);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, [category,page]);
    const fetchProducts = async () => {
        try{
            setLoading(true);
            let response;
            if(category){
                response = await productAPI.filterByCategory(category, page, 10);

            } else{
                response = await productAPI.getAllProducts(page, 10);
            }
            setProducts(response.data.content);
        }catch(err){
            console.error('Error fetching products', err);
        }finally{
            setLoading(false);
        }
    };
    if(loading) return <div>Loading...</div>;
    return (
        <div className="home">
            <h2>Browse Products</h2>
            <div className="filters">
                <select value={category} onChange={(e) => {
                    setCategory(e.target.value);
                    setPage(0);
                }}>
                    <option value="">All Categories</option>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Kids">kids</option>
                </select>
            </div>
            <div className="products-grid"> 
                {products.map((product) => (
                    <Link key={product.id} to={`/product/${product.id}`}className="product-card">
                        <img src={product.imageUrl} alt={product.title}/>
                        <h3>{product.title}</h3>
                        <p className="price">₹{product.price}</p>
                        <p className="original-price">₹{product.originalPrice}</p>
                        <p className="condition">{product.conditions}</p>
                    </Link>
                ))}
            </div>

            <div className="pagination">
                <button onClick={() => setPage(Math.max(0,page-1))} disabled={page === 0}>
                    Previous
                </button>
                <span>Page{page+1}</span>
                <button onClick={() => setPage(page+1)}>Next</button>
            </div>
        </div>
    );
}
export default Home;