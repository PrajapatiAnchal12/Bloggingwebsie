import React from 'react';
import { Link } from 'react-router-dom';
import './newscard.css';
import { FaUser, FaClock } from 'react-icons/fa';

const SmallListCard = ({ post }) => {
    return (
        <Link to={`/post/${post._id}`} className="small-list-card" style={{ textDecoration: 'none' }}>
            <div className="slc-img">
                {post.category && (
                    <span 
                        className="slc-category" 
                        style={{ backgroundColor: post.categoryColor || 'red' }}
                    >
                        {post.category}
                    </span>
                )}
                <img src={post.image} alt={post.title} />
            </div>
            <div className="small-list-content">
                <h4>{post.title}</h4>
                <div className="meta">
                    <span><FaUser /> {post.author}</span>
                    <span><FaClock /> {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : post.date}</span>
                </div>
            </div>
        </Link>
    );
};

export default SmallListCard;
