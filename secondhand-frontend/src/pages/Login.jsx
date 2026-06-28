import {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {authAPI} from '../services/api';
import './Auth.css';

function Login ({setIsLoggedIn, setUserRole}){
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const[error, setError] = useState('');
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        const {name,value} = e.target;
        setFormData({...formData, [name]:value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await authAPI.login(formData);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.userId);
            localStorage.setItem('userRole', response.data.role);
            setIsLoggedIn(true);
            setUserRole(response.data.role);
            navigate('/');
        }catch(err){
            setError(err.response?.data?.message || 'Login failed');
        }
    };
    return(
        <div className="auth-container">
            <div className="auth-card">
                <h2>Login</h2>
                {error && <div className="error">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required/>
                    <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required/>
                    <button type="submit">Login</button>
                </form>
                <p>
                    Don't have an account? <Link to="/register">Register</Link>
                </p>
            </div>

        </div>
    );
}
export default Login;