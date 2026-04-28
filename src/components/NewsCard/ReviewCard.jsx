import React from 'react';
import './newscard.css';
import { FaStar, FaRegStar } from 'react-icons/fa';

const ReviewCard = ({ post }) => {
    return (
        <div className="small-list-card review-card">
            <div className="slc-img">
                <img src={post.image} alt={post.title} />
            </div>
            <div className="small-list-content">
                <h4>{post.title}</h4>
                <div className="review-stars">
                    {/* Render stars based on rating (default to 5) */}
                    {[...Array(5)].map((_, i) => (
                        i < (post.rating || 5) ? <FaStar key={i} /> : <FaRegStar key={i} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;
