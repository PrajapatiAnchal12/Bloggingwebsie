import React, { useState, useEffect } from 'react';
import './sidebar.css';
import { FaRss, FaFacebookF, FaTwitter, FaGooglePlusG, FaVimeoV, FaYoutube, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import OverlayCard from '../NewsCard/OverlayCard';
import SmallListCard from '../NewsCard/SmallListCard';
import axios from 'axios';

const Sidebar = () => {
    const [popularPosts, setPopularPosts] = useState([]);
    const [trendingPost, setTrendingPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSidebarData = async () => {
            try {
                const res = await axios.get((import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/posts');
                const allPosts = Array.isArray(res.data) ? res.data : [];
                
                // Popular: Top 5 by views (since backend has views field)
                const popular = [...allPosts].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5);
                setPopularPosts(popular);

                // Trending: Post tagged with 'Trending News' or latest
                const trending = allPosts.find(p => p?.section?.toLowerCase()?.includes('trending')) || allPosts[0];
                setTrendingPost(trending);

            } catch (error) {
                console.error("Sidebar Error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSidebarData();
    }, []);

    if (loading) return <div className="sidebar-loading">Loading Sidebar...</div>;

    return (
        <aside className="sidebar-section">
            
            {/* FOLLOW US BLOCK */}
            <div className="sidebar-block">
                <div className="section-header-block black-theme">
                    <span className="sh-title">FOLLOW US</span>
                    <div className="sh-line"></div>
                </div>
                <div className="social-followers">
                    <div className="sf-icon rss"><FaRss /></div>
                    <div className="sf-icon facebook"><FaFacebookF /></div>
                    <div className="sf-icon twitter"><FaTwitter /></div>
                    <div className="sf-icon google"><FaGooglePlusG /></div>
                    <div className="sf-icon vimeo"><FaVimeoV /></div>
                    <div className="sf-icon youtube"><FaYoutube /></div>
                </div>
            </div>

            {/* POPULAR NEWS BLOCK */}
            <div className="sidebar-block">
                <div className="section-header-block black-theme">
                    <span className="sh-title">POPULAR NEWS</span>
                    <div className="sh-line"></div>
                </div>
                <div className="popular-news-content">
                    {popularPosts.length > 0 && (
                        <>
                            <div className="pn-large-card">
                                <OverlayCard post={popularPosts[0]} />
                            </div>
                            <div className="pn-small-cards">
                                {popularPosts.slice(1).map(post => (
                                    <SmallListCard key={post._id} post={post} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* TRENDING NEWS BLOCK */}
            <div className="sidebar-block">
                <div className="section-header-block black-theme">
                    <span className="sh-title">TRENDING NEWS</span>
                    <div className="sh-line"></div>
                    <div className="sh-controls">
                        <button><FaAngleLeft /></button>
                        <button><FaAngleRight /></button>
                    </div>
                </div>
                <div className="trending-news-content">
                    {trendingPost && (
                        <div className="tn-large-card">
                            <OverlayCard post={trendingPost} />
                        </div>
                    )}
                </div>
            </div>

        </aside>
    );
};

export default Sidebar;
