import { useState } from "react";
import "./menu.css";
import { FaSearch, FaAngleDown, FaBars, FaTimes } from "react-icons/fa";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="menu">
      <div className="menu-container">

        {/* Mobile Menu Toggle Button */}
        <div className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* LEFT */}
        <ul className={`menu-left ${isOpen ? "active-mobile-menu" : ""}`}>
          <li className="active">HOME <FaAngleDown /></li>
          <li>LIFESTYLE <FaAngleDown /></li>
          <li>TECHNOLOGY</li>
<li className="has-video">
  VIDEO <FaAngleDown />

  <div className="video-dropdown">
    <div className="video-card">
      <img src="https://picsum.photos/300/200" />
      <div className="play-btn">▶</div>
      <p>Zhang social media pop also known when smart innocent...</p>
    </div>

    <div className="video-card">
      <img src="https://picsum.photos/301/200" />
      <div className="play-btn">▶</div>
      <p>Zhang social media pop also known when smart innocent...</p>
    </div>

    <div className="video-card">
      <img src="https://picsum.photos/302/200" />
      <div className="play-btn">▶</div>
      <p>TG G6 will have dual 13-megapixel cameras...</p>
    </div>

    <div className="video-card">
      <img src="https://picsum.photos/303/200" />
      <div className="play-btn">▶</div>
      <p>Zhang social media pop also known when smart innocent...</p>
    </div>
  </div>
</li>


          <li>ABOUT US</li>
<li className="has-features">
  FEATURES <FaAngleDown />

  <div className="features-dropdown">
    <p>Category Layouts</p>
    <p>Post Detail Page</p>
    <p>Pages</p>
  </div>
</li>        </ul>

        {/* RIGHT */}
        <div className="menu-right">
          <FaSearch />
        </div>

      </div>
    </div>
  );
};

export default Menu;