import React, { useState, useEffect } from 'react';
import NewsCard from '../NewsCard/NewsCard';
import axios from 'axios';
import './latestnews.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const LatestNews = () => {
    const [news, setNews] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardsToShow, setCardsToShow] = useState(4); // Default to Desktop
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/posts');
                const allPosts = Array.isArray(res.data) ? res.data : [];
                
                // Strictly filter by Section OR Category 'Latest News'
                const latestNewsPosts = allPosts.filter(post => 
                    (post?.section?.toLowerCase()?.trim() === 'latest news') ||
                    (post?.category?.toLowerCase()?.trim() === 'latest news')
                );

                setNews(latestNewsPosts);
            } catch (error) {
                console.error("Error fetching news:", error);
                setNews([]);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    // SCREEN SIZE TRACKER: Slider ko responsive banane ke liye
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 576) {
                setCardsToShow(1); // Mobile: 1 card
            } else if (window.innerWidth <= 768) {
                setCardsToShow(2); // Tablet: 2 cards
            } else if (window.innerWidth <= 1024) {
                setCardsToShow(3); // Small Laptop: 3 cards
            } else {
                setCardsToShow(4); // Desktop: 4 cards
            }
        };

        handleResize(); // First time render par screen napo
        window.addEventListener('resize', handleResize); // Jab bhi window choti-badi ho, check karo
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!loading && news.length === 0) return null;

    // BOTTON LOGIC (NEXT aur PREVIOUS)
    const nextSlide = () => {
        // Agar aage aur items bache hain dikhane k liye
        if (currentIndex < news.length - cardsToShow) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    const prevSlide = () => {
        // Agar hum starting point pe nahi hain
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    return (
        <div className="latest-news-section">
            <div className="container">
                
                {/* LATEST NEWS HEADER */}
                <div className="section-header">
                    <h2 className="title">
                       <span className="dot"></span> LATEST NEWS
                    </h2>
                    <div className="line"></div>

                    {/* CONTROLS */}
                    <div className="controls">
                        <button 
                            onClick={prevSlide} 
                            disabled={currentIndex === 0}
                        >
                            <FaChevronLeft style={{ fontSize: '12px' }}/>
                        </button>
                        <button 
                            onClick={nextSlide} 
                            disabled={currentIndex >= news.length - cardsToShow}
                        >
                            <FaChevronRight style={{ fontSize: '12px' }}/>
                        </button>
                    </div>
                </div>

                {/* DYNAMIC REACT SLIDER */}
                <div className="slider-wrapper">
                    <div 
                        className="news-track"
                        style={{ 
                            width: `${(news.length / cardsToShow) * 100}%`,
                            transform: `translateX(-${(currentIndex / news.length) * 100}%)` 
                        }}
                    >
                        {news.map((item) => (
                            <div 
                                className="slider-item" 
                                key={item._id}
                                style={{ width: `${100 / news.length}%` }}
                            >
                                <NewsCard post={item} />
                            </div>
                        ))}
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default LatestNews;
