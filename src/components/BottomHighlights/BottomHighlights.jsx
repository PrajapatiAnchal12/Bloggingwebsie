import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './bottom-highlights.css';
import OverlayCard from '../NewsCard/OverlayCard';
import SmallListCard from '../NewsCard/SmallListCard';
import '../TechnologyNews/technology-news.css';

const BottomHighlights = () => {
    const [travelData, setTravelData] = useState({ top: null, list: [] });
    const [lifestyleData, setLifestyleData] = useState({ top: null, list: [] });
    const [healthData, setHealthData] = useState({ top: null, list: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHighlights = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/posts');
                const allPosts = Array.isArray(res.data) ? res.data : [];

                const getCategoryData = (catName) => {
                    const filtered = allPosts.filter(p => 
                        p?.category?.toLowerCase()?.includes(catName.toLowerCase()) ||
                        p?.section?.toLowerCase()?.includes(catName.toLowerCase())
                    );
                    
                    return {
                        top: filtered[0] || null,
                        list: filtered.slice(1, 4) // Strictly top 3 list posts
                    };
                };

                setTravelData(getCategoryData('Travel'));
                setLifestyleData(getCategoryData('Lifestyle'));
                setHealthData(getCategoryData('Health'));

            } catch (error) {
                console.error("Error fetching highlights:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchHighlights();
    }, []);

    if (loading) return null;

    return (
        <section className="container bottom-highlights-section">
            <div className="bh-grid">
                {/* Column 1: TRAVEL NEWS */}
                {travelData.top && (
                    <div className="bh-col">
                        <div className="section-header-block blue-theme">
                            <h2 className="sh-title">
                               <span className="dot"></span> TRAVEL NEWS
                            </h2>
                            <div className="sh-line"></div>
                        </div>
                        <div className="bh-card">
                            <OverlayCard post={travelData.top} />
                        </div>
                        <div className="bh-list">
                            {travelData.list.map(post => <SmallListCard key={post._id} post={post} />)}
                        </div>
                    </div>
                )}

                {/* Column 2: LIFESTYLE NEWS */}
                {lifestyleData.top && (
                    <div className="bh-col">
                        <div className="section-header-block teal-theme">
                            <h2 className="sh-title">
                               <span className="dot"></span> LIFESTYLE NEWS
                            </h2>
                            <div className="sh-line"></div>
                        </div>
                        <div className="bh-card">
                            <OverlayCard post={lifestyleData.top} />
                        </div>
                        <div className="bh-list">
                            {lifestyleData.list.map(post => <SmallListCard key={post._id} post={post} />)}
                        </div>
                    </div>
                )}

                {/* Column 3: HEALTH NEWS */}
                {healthData.top && (
                    <div className="bh-col">
                        <div className="section-header-block purple-theme">
                            <h2 className="sh-title">
                               <span className="dot"></span> HEALTH NEWS
                            </h2>
                            <div className="sh-line"></div>
                        </div>
                        <div className="bh-card">
                            <OverlayCard post={healthData.top} />
                        </div>
                        <div className="bh-list">
                            {healthData.list.map(post => <SmallListCard key={post._id} post={post} />)}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default BottomHighlights;
