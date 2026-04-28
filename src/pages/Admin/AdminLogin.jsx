import React from 'react';
import { useNavigate } from 'react-router-dom';
import './admin-pages.css'; // Will reuse some styles

const AdminLogin = () => {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Since we are just setting up the basic frontend right now without real auth
        alert("Login Successful! Welcome Admin.");
        navigate('/admin');
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#1a1a2e' }}>
            <div className="add-post-form" style={{ width: '400px', textAlign: 'center' }}>
                <h2 style={{ color: '#e94560', letterSpacing: '2px', marginBottom: '30px' }}>BLOG ADMIN</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group" style={{ textAlign: 'left' }}>
                        <label>Username</label>
                        <input type="text" placeholder="Enter Admin Username" required />
                    </div>
                    <div className="form-group" style={{ textAlign: 'left' }}>
                        <label>Password</label>
                        <input type="password" placeholder="Enter Password" required />
                    </div>
                    <button type="submit" className="submit-btn" style={{ width: '100%', marginTop: '10px' }}>LOGIN</button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
