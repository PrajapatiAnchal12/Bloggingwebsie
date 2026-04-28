import React from 'react';
import { Link } from 'react-router-dom';
import './newscard.css';
import { FaUser, FaClock, FaEye, FaComment } from 'react-icons/fa';

const NewsCard = ({ post }) => {
    // Format Date from MongoDB createdAt
    const formattedDate = post.createdAt 
        ? new Date(post.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
        : post.date;

    return (
        <Link to={`/post/${post._id}`} className="news-card" style={{ textDecoration: 'none' }}>
            <div className="news-card-img">
                {post.category && (
                    <span className="category-badge" style={{ backgroundColor: post.categoryColor || 'red' }}>
                        {post.category}
                    </span>
                )}
                <img src={post.image} alt={post.title} />
            </div>
            <div className="news-card-content">
                <h3 className="news-card-title">{post.title.substring(0, 55)}...</h3>
                <div className="news-card-meta">
                    <span className="meta-item">
                        <FaUser className="meta-icon" /> {post.author || 'Admin'}
                    </span>
                    <span className="meta-item">
                        <FaClock className="meta-icon" /> {formattedDate}
                    </span>
                </div>
                {post.description && (
                    <p className="news-card-desc">{post.description.substring(0, 150)}...</p>
                )}
            </div>
        </Link>
    );
};

export default NewsCard;
