import {useState} from 'raect';
import {useNavigate, Link} from 'raect-router-dom';
import {authAPI} from '../services/api';
import './Auth.css';

function Register({ setIsLoggedIn, setUserRole}){
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        passwaord:'',
        role:'USER',    
    });
    const[error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const{name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await authAPI.register(formData);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.userId);
            localStorage.setItem('userRole', response.data.role);
            setIsLoggedIn(true);
            setUserRole(response.data.role);
            navigate('/');
        }catch(err){
            setError(err.response?.data?.message || 'Registration failed');
        }
    };
    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Register</h2>
                {error && <div className="error">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required/>
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
                    required
                    />
                    <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    >   
                    <option value="USER">Buyer</option>
                    <option value="SELLER">Seller</option>
                    </select>
                    <button type="submit">Register</button>
                </form>
                <p>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}
export default Register;