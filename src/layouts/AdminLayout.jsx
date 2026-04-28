import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaPlus, FaList, FaSignOutAlt, FaTags, FaLayerGroup } from 'react-icons/fa';
import './admin-layout.css';

const AdminLayout = ({ children }) => {
    const location = useLocation();

    return (
        <div className="admin-container">
            {/* ADMIN SIDEBAR */}
            <div className="admin-sidebar">
                <div className="admin-logo">
                    <h2>BLOG ADMIN</h2>
                </div>
                <ul className="admin-nav">
                    <li>
                        <Link to="/admin" className={location.pathname === '/admin' ? 'active' : ''}>
                            <FaTachometerAlt /> Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/add-post" className={location.pathname === '/admin/add-post' ? 'active' : ''}>
                            <FaPlus /> Add New Post
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/categories" className={location.pathname === '/admin/categories' ? 'active' : ''}>
                            <FaLayerGroup /> Categories
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/sections" className={location.pathname === '/admin/sections' ? 'active' : ''}>
                            <FaLayerGroup /> Sections
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/manage-posts" className={location.pathname === '/admin/manage-posts' ? 'active' : ''}>
                            <FaList /> Manage Posts
                        </Link>
                    </li>
                </ul>
                <div className="admin-logout">
                    <Link to="/admin/login">
                        <FaSignOutAlt /> Logout
                    </Link>
                </div>
            </div>

            {/* ADMIN MAIN CONTENT */}
            <div className="admin-main-content">
                <div className="admin-topbar">
                    <h3>Welcome, Admin!</h3>
                </div>
                <div className="admin-page-content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
