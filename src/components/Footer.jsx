import React, { useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      // alert("Subscribed!");
      window.location.href = `mailto:maanpatel1811@gmail.com?subject=Subscribe&body=Please add ${email} to your newsletter list.`;
      setEmail("");
    } else {
      alert("Please enter a valid email address");
    }
  };

  return (
    <footer style={{ marginTop: "0", paddingTop: "0" }}>
      {/* Top Bar */}
      <section
        style={{
          backgroundColor: "#3b82f6",
          padding: "20px 0",
          color: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 20px",
            flexWrap: "wrap",
          }}
        >
          {/* Contact Info */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: "10px 0",
            }}
          >
            <i
              className="fa fa-phone"
              style={{ fontSize: "24px", marginRight: "10px" }}
            ></i>
            <div>
              <p style={{ margin: "0", fontWeight: "bold" }}>
                DO YOU HAVE A QUESTION?
              </p>
              <p style={{ margin: "0" }}>Email: maanpatel1811@gmail.com</p>
            </div>
          </div>

          {/* Subscribe Form */}
          <form
            onSubmit={handleSubscribe}
            style={{
              display: "flex",
              alignItems: "center",
              margin: "10px 0",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "white",
                borderRadius: "4px",
                overflow: "hidden",
              }}
            >
              <i
                className="fa fa-envelope-o"
                style={{
                  padding: "0 10px",
                  fontSize: "18px",
                  color: "#3b82f6",
                }}
              ></i>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={handleEmailChange}
                style={{
                  border: "none",
                  padding: "10px",
                  width: "200px",
                  outline: "none",
                  color: "#333",
                }}
                required
              />
            </div>
            <button
              type="submit"
              style={{
                backgroundColor: "#fff",
                color: "#3b82f6",
                border: "none",
                borderRadius: "4px",
                padding: "10px 20px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Main Footer */}
      <section
        style={{
          backgroundColor: "#1e3a8a",
          color: "white",
          padding: "40px 0 20px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 20px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {/* Mission */}
          <div
            style={{
              flex: "1 1 300px",
              margin: "0 20px 30px 0",
            }}
          >
            <h2 style={{ marginBottom: "20px", fontSize: "22px" }}>
              OUR MISSION
            </h2>
            <p style={{ lineHeight: "1.6" }}>
              Access to safe and affordable housing is a fundamental human right
              and endeavor that can significantly improve the lives of the
              community's residents. Yet many communities across Canada face
              rising rents, stagnant wages, and a lack of transparent data that
              reflects their lived realities and urgent needs.
            </p>
            <p style={{ lineHeight: "1.6" }}>
              Our mission is to address the disconnect between housing data and
              real-life experiences by building an open, free, and continuously
              maintained housing data tool that is both technically sound and
              socially aware.
            </p>
          </div>

          {/* Quick Links */}
          {/* <div
            style={{
              flex: "1 1 200px",
              margin: "0 20px 30px 80px",
            }}
          >
            <h2 style={{ marginBottom: "20px", fontSize: "22px" }}>
              QUICK LINKS
            </h2>
            <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
              {[
                ["Home", "/"],
                ["About", "/about"],
                ["National Housing ", "/national-housing-data"],
                ["Regional Affordability", "/regional-affordability"],
                ["Tenant Resources ", "/tenant-resources"],
                ["Indigenous Housing ", "/indigenous-housing"],
                ["News", "/news"],
                ["Housing Policy", "/housing-policy"],
                ["Contact", "/contact"],
              ].map(([label, path], i) => (
                <li key={i} style={{ margin: "8px 0" }}>
                  <i
                    className="fa fa-arrow-circle-right"
                    style={{ marginRight: "10px" }}
                  ></i>
                  <Link
                    to={path}
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}

  <style>
    {`
      @media (max-width: 768px) {
        .quick-links {
          margin: 0 10px 30px 10px !important;
        }
      }
    `}
  </style>

  <div
    className="quick-links"
    style={{
      flex: "1 1 200px",
      margin: "0 20px 30px 80px", // default for desktop
    }}
  >
    <h2 style={{ marginBottom: "20px", fontSize: "22px" }}>
      QUICK LINKS
    </h2>
    <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
      {[
        ["Home", "/"],
        ["About", "/about"],
        ["National Housing ", "/national-housing-data"],
        ["Regional Affordability", "/regional-affordability"],
        ["Tenant Resources ", "/tenant-resources"],
        ["Indigenous Housing ", "/indigenous-housing"],
        ["News", "/news"],
      
        ["Housing Policy", "/housing-policy"],
        ["Contact", "/contact"],
      ].map(([label, path], i) => (
        <li key={i} style={{ margin: "8px 0" }}>
          <i
            className="fa fa-arrow-circle-right"
            style={{ marginRight: "10px" }}
          ></i>
          <Link
            to={path}
            style={{ color: "white", textDecoration: "none" }}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  </div>




          {/* Contact Us */}
          <div
            style={{
              flex: "1 1 250px",
              margin: "0 0 30px 0",
            }}
          >
            <h2 style={{ marginBottom: "20px", fontSize: "22px" }}>
              CONTACT US
            </h2>
            {[
              {
                icon: "fa-map-marker",
                title: "Head Office",
                lines: ["204-78 George St, Ottawa Ontario "],
              },
              {
                icon: "fa-phone",
                title: "Phone Number",
                lines: ["123-456-7890"],
              },
              {
                icon: "fa-envelope",
                title: "Email",
                lines: ["maanpatel1811@gmail.com"],
              },
            ].map((item, idx) => (
              <div key={idx} style={{ marginBottom: "20px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    marginBottom: "10px",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      backgroundColor: "#3b82f6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: "15px",
                    }}
                  >
                    <i className={`fa ${item.icon}`} style={{ fontSize: "20px" }}></i>
                  </div>
                  <div>
                    <h3 style={{ margin: "0 0 5px 0", fontSize: "18px" }}>
                      {item.title}
                    </h3>
                    {/* {item.lines.map((line, i) => (
                      <p key={i} style={{ margin: 0 }}>
                        {line}
                      </p>
                    ))} */}

                    {item.lines.map((line, i) => (
                    <p key={i} style={{ margin: 0 }}>
                    {item.title === "Email" ? (
                    <a href={`mailto:${line}`} style={{ color: "white", textDecoration: "underline" }}>
                      {line}
                     </a>
                   ) : (
                    line
                      )}
                      </p>
                      ))}

                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Icons */}
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          {[
            ["facebook", "https://www.facebook.com/102729201906595"],
            ["twitter", "https://x.com/GLOCAL_Canada"],
            ["linkedin", "https://www.linkedin.com/company/glocal-foundation-of-canada"],
            // ["vine", "https://meta.com"],
            ["instagram", "https://www.instagram.com/youcountcanada/"],
          ].map(([icon, link], i) => (
            <a
              key={i}
              href={link}
              target="_blank"
              rel="noreferrer"
              className="text-white mx-2"
              style={{ fontSize: "18px", margin: "0 8px", display: "inline-block" }}
            >
              <i className={`fa fa-${icon}`}></i>
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div
          style={{
            textAlign: "center",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: "20px",
            marginTop: "20px",
          }}
        >
          <p style={{ margin: 0 }}>Copyright © 2025 GLOCAL Foundation of Canada. All Rights Reserved.</p>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
