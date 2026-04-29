import React, { useState, useRef, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../../layouts/AdminLayout';
import JoditEditor from 'jodit-react';
import axios from 'axios';
import './admin-pages.css';
import { FaPlus, FaTimes } from 'react-icons/fa';

const AddPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const editor = useRef(null);
    
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [section, setSection] = useState('');
    const [author, setAuthor] = useState('');
    const [image, setImage] = useState('');
    const [content, setContent] = useState('');
    const [quote, setQuote] = useState('');
    const [points, setPoints] = useState([]);
    const [newPoint, setNewPoint] = useState('');
    const [loading, setLoading] = useState(false);
    const [categoriesList, setCategoriesList] = useState([]);
    const [sectionsList, setSectionsList] = useState([]);

    // MODAL STATE
    const [showCatModal, setShowCatModal] = useState(false);
    const [showSecModal, setShowSecModal] = useState(false);
    const [newCatName, setNewCatName] = useState('');
    const [newCatColor, setNewCatColor] = useState('#e74c3c');
    const [newSecName, setNewSecName] = useState('');

    const fetchCategories = async () => {
        try {
            const res = await axios.get((import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/categories');
            setCategoriesList(res.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const fetchSections = async () => {
        try {
            const res = await axios.get((import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/sections');
            setSectionsList(res.data);
        } catch (error) {
            console.error("Error fetching sections:", error);
        }
    };



    const handleAddSectionModal = async (e) => {
        e.preventDefault();
        try {
            await axios.post((import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/sections', { name: newSecName });
            setNewSecName('');
            await fetchSections();
            setShowSecModal(false);
        } catch (error) {
            alert(error.response?.data?.message || 'Error adding section');
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            await fetchCategories();
            await fetchSections();
            try {
                if (id) {
                    const postRes = await axios.get(`http://localhost:5000/api/posts/${id}`);
                    const post = postRes.data;
                    setTitle(post.title);
                    setCategory(post.category);
                    setSection(post.section || '');
                    setAuthor(post.author);
                    setImage(post.image);
                    setContent(post.content);
                    setQuote(post.quote || '');
                    setPoints(post.points || []);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [id]);

    const handleAddCategory = async (e) => {
        e.preventDefault();
        try {
            await axios.post((import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/categories', { name: newCatName, color: newCatColor });
            setNewCatName('');
            await fetchCategories();
            setShowCatModal(false);
        } catch (error) {
            alert(error.response?.data?.message || 'Error adding category');
        }
    };


    const config = useMemo(() => ({
        readonly: false,
        placeholder: 'Write your content here...',
        height: 450,
        toolbarButtonSize: 'middle',
        buttons: [
            'source', '|',
            'bold', 'italic', 'underline', 'strikethrough', '|',
            'superscript', 'subscript', '|',
            'ul', 'ol', '|',
            'outdent', 'indent', '|',
            'font', 'fontsize', 'brush', 'paragraph', '|',
            'image', 'table', 'link', '|',
            'align', 'undo', 'redo', '|',
            'hr', 'eraser', 'copyformat', '|',
            'fullsize', 'print', 'about'
        ],
        askBeforePasteHTML: false,
        askBeforePasteFromWord: false,
        defaultActionOnPaste: 'insert_clear_html'
    }), []);

    const fillDemoContent = () => {
        const demo = `
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
            <blockquote>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </blockquote>
            <ul>
                <li>Lorem Ipsum is simply dummy text of the printing.</li>
                <li>Lorem Ipsum is simply dummy text of the printing.</li>
                <li>Lorem Ipsum is simply dummy text of the printing.</li>
            </ul>
            <p>It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        `;
        setContent(demo);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content) {
            alert('Please write some content');
            return;
        }
        setLoading(true);
        try {
            const selectedCat = categoriesList.find(cat => cat.name === category);
            const categoryColor = selectedCat ? selectedCat.color : 'red';

            const postData = { title, category, author, image, content, quote, points, categoryColor, section };
            
            if (id) {
                await axios.put(`http://localhost:5000/api/posts/${id}`, postData);
                navigate('/admin/manage-posts');
            } else {
                await axios.post((import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/posts', postData);
                setTitle('');
                setCategory('');
                setSection('');
                setAuthor('');
                setImage('');
                setContent('');
                setQuote('');
                setPoints([]);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const [uploading, setUploading] = useState(false);

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        setUploading(true);
        try {
            const res = await axios.post((import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setImage(`http://localhost:5000${res.data.image}`);
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Failed to upload image");
        } finally {
            setUploading(false);
        }
    };

    return (
        <AdminLayout>
            <div className="add-post-container">
                <h2>{id ? 'Edit Post' : 'Create New Post'}</h2>
                <form className="add-post-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Post Title</label>
                        <input 
                            type="text" 
                            placeholder="Enter title here..." 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required 
                        />
                    </div>
                    
                    <div className="form-row">
                        <div className="form-group">
                            <label>Category</label>
                            <div className="select-with-plus">
                                <select 
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    required
                                    style={{ flex: 1 }}
                                >
                                    <option value="">Select Category</option>
                                    {categoriesList.map(cat => (
                                        <option key={cat._id} value={cat.name}>{cat.name}</option>
                                    ))}
                                </select>
                                <div className="add-btn-icon" onClick={() => setShowCatModal(true)} title="Add New Category">
                                    <FaPlus />
                                </div>
                            </div>
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Author</label>
                            <input 
                                type="text" 
                                placeholder="Author name" 
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                required 
                            />
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                            <label>Home Section</label>
                            <div className="select-with-plus">
                                <select 
                                    value={section}
                                    onChange={(e) => setSection(e.target.value)}
                                    style={{ flex: 1 }}
                                >
                                    <option value="">No Section</option>
                                    {sectionsList.map(sec => (
                                        <option key={sec._id} value={sec.name}>{sec.name}</option>
                                    ))}
                                </select>
                                <div className="add-btn-icon" onClick={() => setShowSecModal(true)} title="Add New Section">
                                    <FaPlus />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group" style={{ width: '100%' }}>
                            <label>Featured Image</label>
                            <div className="file-upload-wrapper">
                                <input 
                                    type="file" 
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                />
                                {uploading && <span style={{ marginLeft: '10px', fontSize: '12px', color: '#3498db' }}>Uploading...</span>}
                            </div>
                            
                            {image && (
                                <div className="image-preview" style={{ marginTop: '10px' }}>
                                    <img src={image} alt="Preview" style={{ width: '150px', height: '100px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ddd' }} />
                                    <p style={{ fontSize: '11px', color: '#666', marginTop: '5px' }}>{image}</p>
                                </div>
                            )}
                            
                            <div style={{ marginTop: '10px' }}>
                                <label style={{ fontSize: '12px', color: '#666' }}>Or paste Image URL:</label>
                                <input 
                                    type="url" 
                                    placeholder="https://..." 
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>


                    {/* MAIN CONTENT EDITOR */}
                    <div className="form-group">
                        <label>Post Content</label>
                        <JoditEditor
                            ref={editor}
                            value={content}
                            config={config}
                            onBlur={newContent => setContent(newContent)}
                        />
                    </div>

                    {/* QUOTE SECTION */}
                    <div className="form-group" style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', border: '1px solid #eee', marginTop: '20px' }}>
                        <label style={{ color: '#222', fontWeight: 'bold' }}>Highlight Quote</label>
                        <textarea 
                            placeholder="Enter the quote here..." 
                            value={quote}
                            onChange={(e) => setQuote(e.target.value)}
                            style={{ height: '80px', marginTop: '10px' }}
                        />
                    </div>

                    {/* BULLET POINTS SECTION */}
                    <div className="form-group" style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', border: '1px solid #eee', marginTop: '20px' }}>
                        <label style={{ color: '#222', fontWeight: 'bold' }}>Bullet Points (List)</label>
                        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                            <input 
                                type="text" 
                                placeholder="Add a point..." 
                                value={newPoint}
                                onChange={(e) => setNewPoint(e.target.value)}
                            />
                            <button 
                                type="button" 
                                onClick={() => { if(newPoint) { setPoints([...points, newPoint]); setNewPoint(''); } }}
                                style={{ background: '#222', color: 'white', padding: '0 20px', borderRadius: '4px' }}
                            >
                                ADD
                            </button>
                        </div>
                        <ul style={{ marginTop: '15px', listStyle: 'none', padding: 0 }}>
                            {points.map((p, idx) => (
                                <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', background: 'white', padding: '10px', marginBottom: '5px', borderRadius: '4px', border: '1px solid #ddd' }}>
                                    <span>➔ {p}</span>
                                    <FaTimes style={{ color: 'red', cursor: 'pointer' }} onClick={() => setPoints(points.filter((_, i) => i !== idx))} />
                                </li>
                            ))}
                        </ul>
                    </div>

                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? 'Saving...' : (id ? 'UPDATE POST' : 'PUBLISH POST')}
                    </button>
                </form>
            </div>

            {/* CATEGORY MODAL */}
            {showCatModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-close" onClick={() => setShowCatModal(false)}>&times;</div>
                        <h3>Add New Category</h3>
                        <form onSubmit={handleAddCategory}>
                            <div className="form-group">
                                <label>Category Name</label>
                                <input 
                                    type="text" 
                                    value={newCatName}
                                    onChange={(e) => setNewCatName(e.target.value)}
                                    placeholder="e.g. LIFESTYLE"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Theme Color</label>
                                <input 
                                    type="color" 
                                    value={newCatColor}
                                    onChange={(e) => setNewCatColor(e.target.value)}
                                    style={{ height: '45px', padding: '5px' }}
                                />
                            </div>
                            <button type="submit" className="submit-btn">ADD CATEGORY</button>
                        </form>
                    </div>
                </div>
            )}
            {/* SECTION MODAL */}
            {showSecModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-close" onClick={() => setShowSecModal(false)}>&times;</div>
                        <h3>Add New Section</h3>
                        <form onSubmit={handleAddSectionModal}>
                            <div className="form-group">
                                <label>Section Name</label>
                                <input 
                                    type="text" 
                                    value={newSecName}
                                    onChange={(e) => setNewSecName(e.target.value)}
                                    placeholder="e.g. TRENDING"
                                    required
                                />
                            </div>
                            <button type="submit" className="submit-btn">ADD SECTION</button>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};


export default AddPost;
