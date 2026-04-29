import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import axios from 'axios';
import './admin-pages.css';
import { FaTrash, FaEdit } from 'react-icons/fa';

const ManageSections = () => {
    const [name, setName] = useState('');
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchSections();
    }, []);

    const fetchSections = async () => {
        try {
            const res = await axios.get((import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/sections');
            setSections(res.data);
        } catch (error) {
            console.error("Error fetching sections:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editId) {
                await axios.put(`http://localhost:5000/api/sections/${editId}`, { name });
            } else {
                await axios.post((import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/sections', { name });
            }
            setName('');
            setEditId(null);
            fetchSections();
        } catch (error) {
            console.error("Save Error:", error);
            const msg = error.response?.data?.message || error.message;
            if (error.message === 'Network Error') {
                alert('❌ Backend server is not running! Please start the backend on port 5000.');
            } else {
                alert('❌ Error: ' + msg);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (sec) => {
        setEditId(sec._id);
        setName(sec.name);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this section?')) {
            try {
                await axios.delete(`http://localhost:5000/api/sections/${id}`);
                fetchSections();
            } catch (error) {
                alert('Error deleting section');
            }
        }
    };

    return (
        <AdminLayout>
            <div className="admin-page-container">
                <h2>{editId ? 'Edit Section' : 'Manage Sections'}</h2>
                
                {/* ADD/EDIT SECTION FORM */}
                <div className="add-post-form" style={{ marginBottom: '30px' }}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '20px', alignItems: 'flex-end' }}>
                        <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                            <label>Section Name</label>
                            <input 
                                type="text" 
                                placeholder="e.g. TRENDING" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required 
                            />
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button type="submit" className="submit-btn" style={{ padding: '12px 30px' }} disabled={loading}>
                                {loading ? 'Saving...' : (editId ? 'UPDATE' : 'ADD SECTION')}
                            </button>
                            {editId && (
                                <button type="button" onClick={() => { setEditId(null); setName(''); }} className="submit-btn" style={{ padding: '12px 30px', background: '#666' }}>
                                    CANCEL
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* SECTIONS LIST */}
                <div className="add-post-form">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Slug</th>
                                <th style={{ textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sections.map((sec) => (
                                <tr key={sec._id}>
                                    <td style={{ fontWeight: 600 }}>{sec.name}</td>
                                    <td><span className="slug-badge">{sec.slug}</span></td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                                            <button 
                                                onClick={() => handleEdit(sec)}
                                                className="action-btn edit"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(sec._id)}
                                                className="action-btn delete"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {sections.length === 0 && (
                                <tr>
                                    <td colSpan="3" style={{ textAlign: 'center', padding: '30px', color: '#999' }}>No sections found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
};

export default ManageSections;
