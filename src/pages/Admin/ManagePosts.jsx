import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../layouts/AdminLayout';
import axios from 'axios';
import './admin-pages.css';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';

const ManagePosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPosts, setSelectedPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchPosts();
        fetchCategories();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await axios.get((import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/posts');
            setPosts(res.data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await axios.get((import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/categories');
            setCategories(res.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                await axios.delete(`http://localhost:5000/api/posts/${id}`);
                fetchPosts();
                alert('Post deleted successfully');
            } catch (error) {
                alert('Error deleting post');
            }
        }
    };

    const handleBulkDelete = async () => {
        if (selectedPosts.length === 0) return;
        if (window.confirm(`Are you sure you want to delete ${selectedPosts.length} posts?`)) {
            try {
                await axios.post((import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/posts/bulk-delete', { ids: selectedPosts });
                setSelectedPosts([]);
                fetchPosts();
                alert('Posts deleted successfully');
            } catch (error) {
                alert('Error in bulk deletion');
            }
        }
    };

    const toggleSelect = (id) => {
        if (selectedPosts.includes(id)) {
            setSelectedPosts(selectedPosts.filter(item => item !== id));
        } else {
            setSelectedPosts([...selectedPosts, id]);
        }
    };

    const toggleSelectAll = () => {
        if (selectedPosts.length === filteredPosts.length) {
            setSelectedPosts([]);
        } else {
            setSelectedPosts(filteredPosts.map(p => p._id));
        }
    };

    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === '' || post.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <AdminLayout>
            <div className="admin-page-container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                    <h2>Manage Posts ({filteredPosts.length})</h2>
                    <Link to="/admin/add-post" className="submit-btn" style={{ textDecoration: 'none' }}>ADD NEW POST</Link>
                </div>

                {/* FILTERS & TOOLS */}
                <div className="add-post-form" style={{ marginBottom: '20px', padding: '20px', display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                        <input 
                            type="text" 
                            placeholder="Search by title..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ width: '100%', marginBottom: 0 }}
                        />
                    </div>
                    <div style={{ width: '200px' }}>
                        <select 
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            style={{ width: '100%', marginBottom: 0 }}
                        >
                            <option value="">All Categories</option>
                            {categories.map(cat => (
                                <option key={cat._id} value={cat.name}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                    {selectedPosts.length > 0 && (
                        <button 
                            onClick={handleBulkDelete}
                            className="submit-btn" 
                            style={{ background: '#e74c3c', padding: '10px 20px', fontSize: '13px' }}
                        >
                            DELETE SELECTED ({selectedPosts.length})
                        </button>
                    )}
                </div>

                <div className="add-post-form" style={{ overflowX: 'auto' }}>
                    {loading ? (
                        <p>Loading posts...</p>
                    ) : (
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th style={{ width: '40px' }}>
                                        <input 
                                            type="checkbox" 
                                            onChange={toggleSelectAll} 
                                            checked={filteredPosts.length > 0 && selectedPosts.length === filteredPosts.length}
                                        />
                                    </th>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Author</th>
                                    <th>Section</th>
                                    <th>Quote</th>
                                    <th>Points</th>
                                    <th>Snippet</th>
                                    <th>Date</th>
                                    <th style={{ textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPosts.map((post) => (
                                    <tr key={post._id} className={selectedPosts.includes(post._id) ? 'selected-row' : ''}>
                                        <td>
                                            <input 
                                                type="checkbox" 
                                                checked={selectedPosts.includes(post._id)}
                                                onChange={() => toggleSelect(post._id)}
                                            />
                                        </td>
                                        <td>
                                            <img src={post.image} alt="" style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                                        </td>
                                        <td style={{ fontWeight: 500 }}>{post.title.substring(0, 40)}...</td>
                                        <td>
                                            <span style={{ backgroundColor: post.categoryColor || '#eee', color: 'white', padding: '3px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>
                                                {post.category}
                                            </span>
                                        </td>
                                        <td style={{ fontSize: '13px' }}>{post.author}</td>
                                        <td style={{ fontSize: '13px' }}>{post.section || 'N/A'}</td>
                                        <td style={{ fontSize: '13px', color: '#666', fontStyle: 'italic' }}>
                                            {post.quote ? `"${post.quote.substring(0, 30)}..."` : 'No Quote'}
                                        </td>
                                        <td style={{ fontSize: '13px', textAlign: 'center' }}>
                                            {post.points ? post.points.length : 0}
                                        </td>
                                        <td style={{ fontSize: '12px', color: '#888' }}>
                                            {post.content ? post.content.replace(/<[^>]*>/g, '').substring(0, 30) + '...' : 'No Content'}
                                        </td>
                                        <td style={{ fontSize: '13px', color: '#666' }}>{new Date(post.createdAt).toLocaleDateString()}</td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '15px', alignItems: 'center', justifyContent: 'flex-end' }}>
                                                <Link to={`/post/${post._id}`} target="_blank" style={{ color: '#444' }} title="View Post">
                                                    <FaEye />
                                                </Link>
                                                <Link to={`/admin/edit-post/${post._id}`} style={{ color: '#3498db' }} title="Edit Post">
                                                    <FaEdit />
                                                </Link>
                                                <button 
                                                    onClick={() => handleDelete(post._id)}
                                                    style={{ background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer', padding: 0 }}
                                                    title="Delete Post"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredPosts.length === 0 && (
                                    <tr>
                                        <td colSpan="11" style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
                                            {searchTerm ? 'No matches found for your search.' : 'No posts found in this category.'}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default ManagePosts;
