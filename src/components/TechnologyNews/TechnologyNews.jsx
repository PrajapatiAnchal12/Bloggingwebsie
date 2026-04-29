import React, { useState, useEffect } from 'react';
import './technology-news.css';
import NewsCard from '../NewsCard/NewsCard';
import SmallListCard from '../NewsCard/SmallListCard';

import axios from 'axios';

const TechnologyNews = () => {
    const [categories, setCategories] = useState([]);
    const [activeTab, setActiveTab] = useState("ALL");
    const [mainPost, setMainPost] = useState(null);
    const [listPosts, setListPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get((import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/categories');
                const fetchedCategories = res.data.slice(0, 4);
                setCategories(fetchedCategories);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchTechNews = async () => {
            setLoading(true);
            try {
                const res = await axios.get((import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/posts');
                const allPosts = Array.isArray(res.data) ? res.data : [];

                if (allPosts.length === 0) {
                    setMainPost(null);
                    setListPosts([]);
                    return;
                }

                // 1. Filter by Section 'Technology News'
                let techPosts = allPosts.filter(post => 
                    post?.section?.toLowerCase()?.trim() === 'technology news'
                );

                // 2. Further filter by Category if tab selected
                if (activeTab && activeTab !== "ALL") {
                    techPosts = techPosts.filter(post => 
                        post?.category?.toLowerCase()?.trim() === activeTab.toLowerCase().trim()
                    );
                }

                // Set main post safely
                const primaryPost = techPosts[0] || allPosts[0];
                setMainPost(primaryPost);

                // Set list posts (4 items)
                let listItems = techPosts.slice(1, 5);
                
                if (listItems.length < 4) {
                    const remainingNeeded = 4 - listItems.length;
                    const latestFallbacks = allPosts
                        .filter(p => p?._id !== primaryPost?._id) 
                        .slice(0, remainingNeeded);
                    listItems = [...listItems, ...latestFallbacks];
                }

                setListPosts(listItems);
            } catch (error) {
                console.error("Error fetching tech news:", error);
                setMainPost(null);
                setListPosts([]);
            } finally {
                setLoading(false);
            }
        };
        fetchTechNews();
    }, [activeTab]);

    return (
        <section className="technology-news-section">
            <div className="section-header-block blue-theme">
                <h2 className="sh-title">
                   <span className="dot"></span> TECHNOLOGY NEWS
                </h2>
                <div className="sh-line"></div>
                <div className="sh-tabs">
                    <span 
                        className={`sh-tab ${activeTab === "ALL" ? "active" : ""}`}
                        onClick={() => setActiveTab("ALL")}
                    >
                        ALL
                    </span>
                    {categories.map((cat) => (
                        <span 
                            key={cat._id} 
                            className={`sh-tab ${activeTab === cat.name ? "active" : ""}`}
                            onClick={() => setActiveTab(cat.name)}
                        >
                            {cat.name}
                        </span>
                    ))}
                </div>
            </div>

            <div className="tech-grid">
                <div className="tech-main-post">
                    {mainPost && <NewsCard post={mainPost} />}
                </div>
                <div className="tech-list-posts">
                    {listPosts.map((post) => (
                        <SmallListCard key={post._id} post={post} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechnologyNews;
