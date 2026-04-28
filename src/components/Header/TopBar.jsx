import "./header.css";
import { FaFacebookF, FaTwitter, FaGooglePlusG, FaLinkedinIn, FaRss, FaSkype } from "react-icons/fa";

const TopBar = () => {
  return (
    <div className="topbar">
      <div className="topbar-container">

        <button className="login-btn">Login & Signup</button>

        <div className="social-icons">
          <span><FaFacebookF /></span>
          <span><FaTwitter /></span>
          <span><FaGooglePlusG /></span>
          <span><FaLinkedinIn /></span>
          <span><FaRss /></span>
          <span><FaSkype /></span>
        </div>

      </div>
    </div>
  );
};

export default TopBar;