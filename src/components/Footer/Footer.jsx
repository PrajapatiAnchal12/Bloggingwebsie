import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './footer.css';
import {
    FaHome, FaPhoneAlt, FaEnvelope, FaAngleDoubleRight, FaClock,
    FaFacebookF, FaTwitter, FaGooglePlusG, FaLinkedinIn, FaSkype, FaInstagram, FaAngleUp
} from 'react-icons/fa';
import axios from 'axios';

const Footer = () => {
    const [categories, setCategories] = useState([]);
    const [popularPosts, setPopularPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Real Categories
                const catRes = await axios.get('http://localhost:5000/api/categories');
                setCategories(catRes.data);

                // Fetch Popular Posts (Top 3 by views)
                const postRes = await axios.get('http://localhost:5000/api/posts?sort=popular');
                setPopularPosts(postRes.data.slice(0, 3));
            } catch (error) {
                console.error("Error fetching footer data:", error);
            }
        };

        fetchData();
    }, []);

    // Arrow par click krne se website Smooth tarike se top par chali jayegi
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="footer-section">
            <div className="footer-overlay"></div>

            <div className="container footer-container">
                {/* COLUMN 1: ABOUT US */}
                <div className="footer-col about-us">
                    <h3 className="footer-title"><span></span>ABOUT US</h3>
                    <p className="footer-text">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text since has five...
                    </p>
                    <ul className="contact-info">
                        <li><FaHome className="icon" /> 15 Cliff St, New York NY 10038, USA</li>
                        <li><FaPhoneAlt className="icon" /> +91 234 567 8765</li>
                        <li><FaEnvelope className="icon" /> mail@example.com</li>
                    </ul>
                    <div className="social-links">
                        <span className="social-icon"><FaFacebookF /></span>
                        <span className="social-icon"><FaTwitter /></span>
                        <span className="social-icon"><FaGooglePlusG /></span>
                        <span className="social-icon"><FaLinkedinIn /></span>
                        <span className="social-icon"><FaSkype /></span>
                        <span className="social-icon"><FaInstagram /></span>
                    </div>
                </div>

                {/* COLUMN 2: POPULAR CATEGORIES */}
                <div className="footer-col popular-categories">
                    <h3 className="footer-title"><span></span>POPULAR CATEGORIES</h3>
                    <ul className="category-list">
                        {/* Map se Category Data loop chal rha hai */}
                        {categories.map((cat) => (
                            <li key={cat._id}>
                                <div className="cat-name">
                                    <FaAngleDoubleRight className="icon" /> {cat.name}
                                </div>
                                <span className="cat-count">({cat.count})</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* COLUMN 3: POPULAR POSTS */}
                <div className="footer-col popular-posts">
                    <h3 className="footer-title"><span></span>POPULAR POST</h3>
                    <div className="post-list">
                        {/* Map se Post Data loop chal rha hai */}
                        {popularPosts.map((post) => (
                            <Link to={`/post/${post._id}`} key={post._id} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className="footer-post-card">
                                    <img src={post.image} alt="post" className="post-img" />
                                    <div className="post-info">
                                        <h4>{post.title}</h4>
                                        <span className="post-date">
                                            <FaClock className="icon" /> 
                                            {new Date(post.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* BOTTOM BAR AREA (Copyright Wala Hissa) */}
            <div className="footer-bottom">
                <div className="container bottom-container">
                    <p className="copyright">Copyright © 2022 All Rights Reserved.</p>
                </div>

                {/* SCROLL TO TOP BUTTON NOW INSIDE BOTTOM BAR FOR PERFECT CENTERING */}
                <button className="scroll-top-btn" onClick={scrollToTop}>
                    <FaAngleUp />
                </button>
            </div>

        </footer>
    );
};

export default Footer;
