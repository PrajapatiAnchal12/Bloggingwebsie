import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './lifestyle-news.css';
import OverlayCard from '../NewsCard/OverlayCard';
import SmallListCard from '../NewsCard/SmallListCard';

const LifestyleNews = () => {
    const [leftColData, setLeftColData] = useState({ top: null, list: [] });
    const [rightColData, setRightColData] = useState({ top: null, list: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLifestyleNews = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/posts');
                const allPosts = Array.isArray(res.data) ? res.data : [];

                // Filter by Category 'Lifestyle'
                let lifestylePosts = allPosts.filter(post => 
                    post?.category?.toLowerCase()?.trim() === 'lifestyle' ||
                    post?.section?.toLowerCase()?.trim() === 'lifestyle news'
                );

                if (lifestylePosts.length === 0) {
                    setLeftColData({ top: null, list: [] });
                    setRightColData({ top: null, list: [] });
                    return;
                }

                // Split only available lifestyle posts into Left and Right columns
                // Column 1: Top (0), List (index 2,3,4)
                // Column 2: Top (1), List (index 5,6,7)
                setLeftColData({
                    top: lifestylePosts[0] || null,
                    list: lifestylePosts.slice(2, 5)
                });
                setRightColData({
                    top: lifestylePosts[1] || null,
                    list: lifestylePosts.slice(5, 8)
                });

            } catch (error) {
                console.error("Error fetching lifestyle news:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchLifestyleNews();
    }, []);

    if (loading || (!leftColData.top && !rightColData.top)) return null;

    return (
        <section className="lifestyle-news-section">
            <div className="section-header-block orange-theme">
                <h2 className="sh-title">
                   <span className="dot"></span> LIFESTYLE NEWS
                </h2>
                <div className="sh-line"></div>
            </div>

            <div className="lifestyle-columns">
                {/* LEFT COLUMN */}
                <div className="ls-column">
                    <div className="ls-top-card">
                        {leftColData.top && <OverlayCard post={leftColData.top} />}
                    </div>
                    <div className="ls-list">
                        {leftColData.list.map(post => (
                            <SmallListCard key={post._id} post={post} />
                        ))}
                    </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="ls-column">
                    <div className="ls-top-card">
                        {rightColData.top && <OverlayCard post={rightColData.top} />}
                    </div>
                    <div className="ls-list">
                        {rightColData.list.map(post => (
                            <SmallListCard key={post._id} post={post} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LifestyleNews;
