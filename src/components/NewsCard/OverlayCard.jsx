import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaClock } from 'react-icons/fa';
import './newscard.css';

const OverlayCard = ({ post }) => {
    return (
        <Link to={`/post/${post._id}`} className="overlay-card">
            {post.category && <span className="category-badge" style={{backgroundColor: post.categoryColor || 'red'}}>{post.category}</span>}
            <img src={post.image} alt={post.title} />
            <div className="overlay-content">
                <h3>{post.title}</h3>
                <div className="meta">
                    <span><FaUser /> {post.author}</span>
                    <span><FaClock /> {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : post.date}</span>
                </div>
            </div>
        </Link>
    );
};

export default OverlayCard;
