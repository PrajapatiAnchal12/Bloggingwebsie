import React from "react";
import { Link } from "react-router-dom";
import "./banner.css";
import { FaUser, FaClock } from "react-icons/fa";

const Banner = () => {
  return (
    <div className="banner-section">
      <div className="banner-container">
        
        {/* Main Post (Left) */}
        <Link to="/post/1" className="banner-item banner-main">
          <img src="https://picsum.photos/800/600?random=1" alt="main post" />
          <div className="banner-overlay">
            <span className="category-badge">HEALTH</span>
            <h2>Zhang social media pop also known when smart innocent...</h2>
            <div className="meta">
              <span><FaUser /> John Wick</span>
              <span><FaClock /> 20 Jan, 2022</span>
            </div>
          </div>
        </Link>

        {/* Right Top */}
        <Link to="/post/2" className="banner-item banner-right-top">
          <img src="https://picsum.photos/800/400?random=2" alt="top post" />
          <div className="banner-overlay">
             <span className="category-badge" style={{background: '#9900cc'}}>GADGET</span>
             <h2>Why The iPhone X Will Force Apple To Choose Between Good Or Evil</h2>
              <div className="meta">
              <span><FaUser /> John Wick</span>
              <span><FaClock /> 20 Jan, 2022</span>
            </div>
          </div>
        </Link>

        {/* Right Bottom Left */}
        <Link to="/post/3" className="banner-item banner-right-bottom-left">
           <img src="https://picsum.photos/400/300?random=3" alt="bottom left post" />
           <div className="banner-overlay">
             <span className="category-badge" style={{background: '#ff8c00'}}>TRAVEL</span>
             <h3>Early tourists choices to the sea of Maldiv...</h3>
              <div className="meta">
              <span><FaUser /> John Wick</span>
            </div>
           </div>
        </Link>

        {/* Right Bottom Right */}
        <Link to="/post/4" className="banner-item banner-right-bottom-right">
           <img src="https://picsum.photos/400/300?random=4" alt="bottom right post" />
           <div className="banner-overlay">
             <span className="category-badge" style={{background: '#00c4cc'}}>LIFESTYLE</span>
             <h3>That wearable on your wrist could soon...</h3>
              <div className="meta">
              <span><FaUser /> John Wick</span>
            </div>
           </div>
        </Link>

      </div>
    </div>
  );
};

export default Banner;
