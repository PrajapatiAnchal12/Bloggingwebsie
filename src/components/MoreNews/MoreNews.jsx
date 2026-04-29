import React, { useState, useEffect } from 'react';
import LargeListCard from '../NewsCard/LargeListCard';
import ReviewCard from '../NewsCard/ReviewCard';
// Reusing some existing CSS themes
import '../TechnologyNews/technology-news.css'; 
import './more-news.css'; // Newsletter CSS

import axios from 'axios';

const MoreNews = () => {
    const [currentSlide, setCurrentSlide] = useState(0); 
    const [paginatedPosts, setPaginatedPosts] = useState([[], [], []]);
    const [reviewPosts, setReviewPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMoreNews = async () => {
            try {
                const res = await axios.get((import.meta.env.VITE_API_URL || 'https://blog-backend-i5u0.onrender.com') + '/api/posts');
                const allPosts = Array.isArray(res.data) ? res.data : [];

                // Pagination logic for 3 slides
                const postsPerSlide = 4;
                const page0 = allPosts.slice(0, postsPerSlide);
                const page1 = allPosts.slice(postsPerSlide, postsPerSlide * 2);
                const page2 = allPosts.slice(postsPerSlide * 2, postsPerSlide * 3);

                setPaginatedPosts([page0, page1, page2]);

                // Reviews: Filter by category OR section 'Reviews'
                const reviews = allPosts.filter(p => 
                    p?.category?.toLowerCase()?.includes('review') ||
                    p?.section?.toLowerCase()?.includes('review')
                ).slice(0, 4);
                setReviewPosts(reviews.length > 0 ? reviews : allPosts.slice(0, 4));

            } catch (error) {
                console.error("Error fetching more news:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMoreNews();
    }, []);

    // Get current cards safely
    const currentCards = paginatedPosts[currentSlide] || [];

    // Newsletter submit dummy function
    const handleSubscribe = (e) => {
        e.preventDefault();
        alert("Thanks for subscribing! Development in progress.");
    };

    return (
        <section className="container home-content-area" style={{ marginBottom: '60px' }}>
            {/* VIEW MORE NEWS (Left Column) */}
            <div className="home-main-col">
                <div className="section-header-block black-theme">
                    <span className="sh-title">VIEW MORE NEWS</span>
                    <div className="sh-line"></div>
                    {/* Paginated Dots */}
                    <div style={{ display: 'flex', gap: '5px', marginLeft: '10px' }}>
                        {[0, 1, 2].map((index) => (
                            <span 
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                style={{ 
                                    width: '6px', 
                                    height: '6px', 
                                    background: currentSlide === index ? 'red' : '#999', 
                                    borderRadius: '50%',
                                    cursor: 'pointer'
                                }}
                            ></span>
                        ))}
                    </div>
                </div>

                <div className="more-news-feed">
                    {currentCards.map(post => (
                        <LargeListCard key={post._id} post={post} />
                    ))}
                </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="home-sidebar-col">
                {/* 1. LATEST REVIEWS */}
                <div className="section-header-block black-theme">
                    <span className="sh-title">LATEST REVIEWS</span>
                    <div className="sh-line"></div>
                </div>

                <div className="latest-reviews-feed" style={{ marginBottom: '40px' }}>
                    {reviewPosts.map(post => (
                        <ReviewCard key={post._id} post={post} />
                    ))}
                </div>

                {/* 2. NEWSLETTER */}
                <div className="section-header-block black-theme">
                    <span className="sh-title">NEWSLETTER</span>
                    <div className="sh-line"></div>
                </div>

                <div className="newsletter-box">
                    <h3 className="nl-title">Subscribe Newsletter!</h3>
                    <div className="nl-div-line"></div>
                    <p className="nl-text">
                        Lorem ipsum dolor sit consectetur adipiscing elit Maecenas in pulvinar neque Nulla finibus lobortis pulvinar.
                    </p>
                    <form className="nl-form" onSubmit={handleSubscribe}>
                        <input type="email" placeholder="E-Mail Address" required />
                        <button type="submit">SUBSCRIBE</button>
                    </form>
                </div>

            </div>
        </section>
    );
};

export default MoreNews;
