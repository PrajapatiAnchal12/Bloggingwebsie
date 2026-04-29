import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import axios from 'axios';
import './admin-pages.css';
import { FaTrash, FaEdit } from 'react-icons/fa';

const Categories = () => {
    const [name, setName] = useState('');
    const [color, setColor] = useState('red');
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editId, setEditId] = useState(null); // To track which category is being edited

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await axios.get((import.meta.env.VITE_API_URL || 'https://blog-backend-i5u0.onrender.com') + '/api/categories');
            setCategories(res.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editId) {
                // Update Category
                await axios.put(`https://blog-backend-i5u0.onrender.com/api/categories/${editId}`, { name, color });
            } else {
                // Add Category
                await axios.post((import.meta.env.VITE_API_URL || 'https://blog-backend-i5u0.onrender.com') + '/api/categories', { name, color });
            }
            setName('');
            setColor('red');
            setEditId(null);
            fetchCategories();
        } catch (error) {
            console.error('Error saving category:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (cat) => {
        setEditId(cat._id);
        setName(cat.name);
        setColor(cat.color);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancel = () => {
        setEditId(null);
        setName('');
        setColor('red');
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                await axios.delete(`https://blog-backend-i5u0.onrender.com/api/categories/${id}`);
                fetchCategories();
            } catch (error) {
                alert('Error deleting category');
            }
        }
    };

    return (
        <AdminLayout>
            <div className="admin-page-container">
                <h2>{editId ? 'Edit Category' : 'Manage Categories'}</h2>
                
                {/* ADD/EDIT CATEGORY FORM */}
                <div className="add-post-form" style={{ marginBottom: '30px' }}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '20px', alignItems: 'flex-end' }}>
                        <div className="form-group" style={{ flex: 2, marginBottom: 0 }}>
                            <label>Category Name</label>
                            <input 
                                type="text" 
                                placeholder="e.g. TECHNOLOGY" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required 
                            />
                        </div>
                        <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                            <label>Theme Color</label>
                            <input 
                                type="color" 
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                                style={{ height: '45px', padding: '5px' }}
                            />
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button type="submit" className="submit-btn" style={{ padding: '12px 30px' }} disabled={loading}>
                                {loading ? 'Saving...' : (editId ? 'UPDATE' : 'ADD CATEGORY')}
                            </button>
                            {editId && (
                                <button type="button" onClick={handleCancel} className="submit-btn" style={{ padding: '12px 30px', background: '#666' }}>
                                    CANCEL
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* CATEGORIES LIST */}
                <div className="add-post-form">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Slug</th>
                                <th>Color</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                                {categories.map((cat) => (
                                    <tr key={cat._id}>
                                        <td style={{ fontWeight: 600 }}>{cat.name}</td>
                                        <td><span className="slug-badge">{cat.slug}</span></td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <div className="color-preview" style={{ backgroundColor: cat.color }}></div>
                                                <span style={{ fontSize: '12px', color: '#888' }}>{cat.color}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                                                <button 
                                                    onClick={() => handleEdit(cat)}
                                                    className="action-btn edit"
                                                    title="Edit Category"
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(cat._id)}
                                                    className="action-btn delete"
                                                    title="Delete Category"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            {categories.length === 0 && (
                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center', padding: '30px', color: '#999' }}>No categories found</td>
                                    </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Categories;
