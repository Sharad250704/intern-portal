import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

const Login = ({ setCurrentUser }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.login(formData.email, formData.password);
      if (response.success) {
        setCurrentUser(response.data);
        localStorage.setItem('currentUser', JSON.stringify(response.data));
        navigate('/dashboard');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setFormData({
      email: 'sharad@example.com',
      password: 'demo123'
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login to Intern Portal</h2>
        
        <div className="demo-info">
          <p><strong>Demo Credentials:</strong></p>
          <p>Email: sharad@example.com | Password: any password</p>
          <button type="button" className="demo-btn" onClick={handleDemoLogin}>
            Use Demo Account
          </button>
          <p style={{ fontSize: '14px', marginTop: '10px', color: '#666' }}>
            Other demo emails: priya@example.com, rahul@example.com, anita@example.com, vikram@example.com
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="auth-link">
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
