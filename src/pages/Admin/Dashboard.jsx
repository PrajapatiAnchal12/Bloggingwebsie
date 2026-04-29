import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import axios from 'axios';
import './admin-pages.css';
import { FaFileAlt, FaLayerGroup, FaThList, FaChartLine } from 'react-icons/fa';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalPosts: 0,
        totalCategories: 0,
        totalSections: 0,
        totalViews: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get((import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/posts/stats');
                setStats(res.data);
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        };
        fetchStats();
    }, []);

    return (
        <AdminLayout>
            <div className="dashboard-content">
                <div style={{ marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#333' }}>Dashboard Overview</h2>
                    <p style={{ color: '#666' }}>Welcome back! Here's what's happening with your blog today.</p>
                </div>

                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon" style={{ background: '#3498db' }}>
                            <FaFileAlt />
                        </div>
                        <div className="stat-info">
                            <h3>Total Posts</h3>
                            <p>{stats.totalPosts}</p>
                        </div>
                    </div>
                    
                    <div className="stat-card">
                        <div className="stat-icon" style={{ background: '#e67e22' }}>
                            <FaLayerGroup />
                        </div>
                        <div className="stat-info">
                            <h3>Categories</h3>
                            <p>{stats.totalCategories}</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon" style={{ background: '#9b59b6' }}>
                            <FaThList />
                        </div>
                        <div className="stat-info">
                            <h3>Sections</h3>
                            <p>{stats.totalSections}</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon" style={{ background: '#2ecc71' }}>
                            <FaChartLine />
                        </div>
                        <div className="stat-info">
                            <h3>Total Views</h3>
                            <p>{stats.totalViews}</p>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Dashboard;
