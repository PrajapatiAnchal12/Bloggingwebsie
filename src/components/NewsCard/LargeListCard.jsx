import React from 'react';
import { Link } from 'react-router-dom';
import './newscard.css';
import { FaUser, FaClock } from 'react-icons/fa';

const LargeListCard = ({ post }) => {
    return (
        <Link to={`/post/${post._id}`} className="large-list-card" style={{ textDecoration: 'none' }}>
            <div className="llc-img">
                {post.badge && <span className="video-badge">{post.badge}</span>}
                <img src={post.image} alt={post.title} />
            </div>
            <div className="llc-content">
                <h3>{post.title}</h3>
                <div className="meta">
                    <span className="meta-item">
                        <span className="icon-bg"><FaUser /></span> {post.author}
                    </span>
                    <span className="meta-item sep">|</span>
                    <span className="meta-item">
                        <span className="icon-bg color-red"><FaClock /></span> {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : post.date}
                    </span>
                </div>
                <p className="news-desc">
                    {post.description || (post.content ? post.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...' : '')}
                </p>
            </div>
        </Link>
    );
};

export default LargeListCard;
