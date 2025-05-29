
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = ({ path, User }) => {
  const [Toggle, setToggle] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const linkStyle = (route) => ({
    color: path === route ? "#0d6efd" : "#000",
    // fontWeight: path === route ? "bold" : "normal",
    fontWeight: path === route ? "bold" : "600",
    whiteSpace: "nowrap",
    textDecoration: "none",
    display: "block",
    padding: "8px 0"
  });

  return (
    <header
      style={{
        backgroundColor: "#fff",
        borderBottom: "1px solid #ccc",
        padding: "10px 20px",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div className="d-flex justify-content-between align-items-center">
        {/* Logo */}
        <div className="d-flex align-items-center gap-2">
          <Link to="/">
            <img
              src="assets/logo.png"
              className="logo"
              alt="Glocal Foundation"
              style={{ width: "60px", height: "60px" }}
            />
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
            <div>
              <h1
                style={{
                  color: "#0d6efd",
                  fontSize: "24px",
                  margin: 0,
                  fontWeight: "bold",
                }}
              >
                Glocal
              </h1>
              <h3 style={{ margin: 0, color: "#000", fontSize: "14px", fontWeight: "600px"}}>
                Foundation of Canada
              </h3>
            </div>
          </Link>
        </div>

        {/* Hamburger Button - Only on mobile */}
        <div className="d-lg-none">
          {Toggle === "active" ? (
            <i
              className="fa fa-times"
              onClick={() => setToggle("")}
              style={{ fontSize: "24px", cursor: "pointer" }}
            />
          ) : (
            <i
              className="fa fa-bars"
              onClick={() => setToggle("active")}
              style={{ fontSize: "24px", cursor: "pointer" }}
            />
          )}
        </div>

        {/* Desktop Nav */}
        <div className="d-none d-lg-flex gap-3 align-items-center">
          <Link to="/" style={linkStyle("/")}>Home</Link>
          <Link to="/about" style={linkStyle("/about")}>About</Link>

          {/* Dropdown */}
          <div
            className="position-relative"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <span style={{ ...linkStyle(""), cursor: "pointer" }}>
              House Data ▾
            </span>
            {showDropdown && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  padding: "10px",
                  minWidth: "200px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  zIndex: 999,
                }}
              >
                <Link to="/national-housing-data" style={linkStyle("/national-housing-data")}>
                  National Housing
                </Link>
                <Link to="/regional-affordability" style={linkStyle("/regional-affordability")}>
                  Regional Affordability
                </Link>
                <Link to="/tenant-resources" style={linkStyle("/tenant-resources")}>
                  Tenant Resources
                </Link>
                <Link to="/indigenous-housing" style={linkStyle("/indigenous-housing")}>
                  Indigenous Housing
                </Link>
              </div>
            )}
          </div>

          <Link to="/news" style={linkStyle("/news")}>News</Link>
          
          <Link to="/housing-policy" style={linkStyle("/housing-policy")}>Housing Policy</Link>
          <Link to="/contact" style={linkStyle("/contact")}>Contact</Link>
        </div>
      </div>

      {/* Mobile Nav */}
      {Toggle === "active" && (
        <div className="d-lg-none mt-3">
          <Link to="/" style={linkStyle("/")}>Home</Link>
          <Link to="/about" style={linkStyle("/about")}>About</Link>
          <Link to="/national-housing-data" style={linkStyle("/national-housing-data")}>
            National Housing
          </Link>
          <Link to="/regional-affordability" style={linkStyle("/regional-affordability")}>
            Regional Affordability
          </Link>
          <Link to="/tenant-resources" style={linkStyle("/tenant-resources")}>
            Tenant Resources
          </Link>
          <Link to="/indigenous-housing" style={linkStyle("/indigenous-housing")}>
            Indigenous Housing
          </Link>
          <Link to="/news" style={linkStyle("/news")}>News</Link>
         
          <Link to="/housing-policy" style={linkStyle("/housing-policy")}>Housing Policy</Link>
          <Link to="/contact" style={linkStyle("/contact")}>Contact</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
