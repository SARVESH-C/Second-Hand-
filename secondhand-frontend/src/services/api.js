import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_URL,
    headers:{
        'Content-Type' : 'application/json',
    },
});

api.interceptors.request.use((config)=> {
    const token = localStorage.getItem('token');
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

//Auth API
export const authAPI ={
    register : (data) => api.post('auth/register', data),
    login: (data) => api.post('auth/login',data),
};

//Product API

export const productAPI = {
    getAllProducts: (page = 0, size = 10) =>
        api.get('/products', {params:{page, size} }),
    getProductsById: (id) => api.get(`/products/${id}`),
    seachProducts: (keyword, page = 0, size = 10) =>
        api.get('/products/search',{params:{keyword,page, size} }),
    filterByCategory:(category, page = 0, size = 10) =>
        api.get(`/products/category/${category}`,{params:{page,size} }),
    create:(data) => api.post('/products',data),
    update:(id,data) => api.put(`/products/${id}`,data),
    delete: (id) => api.delete(`/products/${id}`),
    getSellerProducts: (sellerId) => api.get(`/products/seller/${sellerId}`),
};

//Cart API

export const cartAPI = {
    getCart: () => api.get('/cart'),
    getTotal: () => api.get('/cart/total'),
    addtoCart: (producrId, quantity = 1) =>
        api.post('/cart',null, {params:{productId, quantity} }),
    removeFromCart: (cartId) => api.delete(`/cart/${cartId}`),
    clearCrt:() => api.delete('/cart'),
};

//OrderAPI 
export const orderAPI = {
    create : (data) => api.post('/orders', data),
    getOrders: (page = 0, size = 10) =>
        api.get('/orders', {params: {page, size} }),
    getOrderById: (id) => api.get(`/orders/${id}`),
    updateStatus: (id,status) => 
        api.put(`/orders/${id}/status`,{status}),
    cancelOrder: (id) => api.put(`/orders/${id}/cancel`),
};

// Review API
export const reviewAPI = {
    addReview : (data) => api.post('/reviews', data),
    getProductReviews: (productId) =>
        api.get(`/reviews/product/${prodcutId}/rating`),
    getMyReviews:() => api.get('/reviews/my-reviews'),
};

export default api;