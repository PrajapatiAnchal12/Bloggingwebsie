import "./header.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-container">
        
        {/* Logo */}
        <div className="logo">
          <img src="/images/logo.png" alt="logo" />
        </div>

        {/* Banner */}
        <div className="banner">
          <img src="/images/banner.jpg" alt="banner" />
        </div>

      </div>
    </div>
  );
};

export default Navbar;