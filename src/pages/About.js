import React from "react";
// import HousingStats from "../components/HousingStats";
import "../App.css";

const About = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* Banner */}
      {/* <div
        style={{
          backgroundImage: "url('/assets/main-banner.png')",
          backgroundSize: "cover",
          backgroundPosition: "center right",
          color: "white",
          padding: "60px 20px",
          minHeight: "320px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "900px" }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "20px" }}>
            About Us — Bridging Data and Housing Solutions
          </h1>
          <p style={{ fontSize: "1.1rem", lineHeight: "1.7" }}>
            Our mission is to provide transparency, accessibility, and actionable insights into Canada's housing market.
            We collect, analyze, and visualize data from trusted sources such as CMHC, Statistics Canada, and provincial open data.
            Our platform empowers residents, advocates, and researchers to act with informed confidence.
          </p>
        </div>
      </div> */}

<div className="w-full text-white px-4 py-20 relative" style={{
  backgroundImage: "url('/assets/about-us.png')",
  backgroundSize: "cover",
  backgroundPosition: "center",
}}>
  {/* Overlay */}
  <div style={{
    position: "absolute",
    inset: 0,
    backgroundColor: "#1a365d",
    opacity: 0.7,
    zIndex: 0
  }}></div>

  {/* Content */}
  <div className="relative z-10 max-w-4xl mx-auto text-center">
    <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "20px" }}>
      About Us — Bridging Data and Housing Solutions
    </h1>
    <p style={{ fontSize: "1.25rem", lineHeight: "1.7" }}>
      Our mission is to provide transparency, accessibility, and actionable insights into Canada's housing market.
      We collect, analyze, and visualize data from trusted sources such as CMHC, Statistics Canada, and provincial open data.
      Our platform empowers residents, advocates, and researchers to act with informed confidence.
    </p>
  </div>
</div>



      {/* Vision Section */}
      <div style={{ backgroundColor: "#dc2626", color: "white", padding: "60px 20px" }}>
        <h2 style={{ textAlign: "center", fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>
          Our Vision for Housing in Canada
        </h2>
        <p style={{
          maxWidth: "900px",
          margin: "0 auto",
          textAlign: "center",
          fontSize: "1.1rem",
          lineHeight: "1.8"
        }}>
          Our vision is simple: to bring clarity and data-driven solutions to one of Canada’s most urgent issues — the housing crisis.
          Using CMHC and StatCan datasets, we offer an up-to-date view of trends in affordability, construction, rental markets, and vacancy rates.
          This platform supports policymakers, researchers, tenants, and activists alike — with zero cost and zero technical barrier.
        </p>

        {/* Chart container (commented properly) */}
        {/*
        <div style={{
          marginTop: "40px",
          marginBottom: "0px",
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "12px",
          maxWidth: "900px",
          marginLeft: "auto",
          marginRight: "auto",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
        }}>
          <HousingStats />
        </div>
        */}
      </div>

      {/* Why Housing Data Matters */}
      <div style={{ backgroundColor: "#f3f4f6", padding: "60px 20px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "25px" }}>
            Why Housing Data Matters
          </h2>
          <p style={{ fontSize: "1.1rem", color: "#444", marginBottom: "30px", lineHeight: "1.8" }}>
            Housing is about more than shelter — it reflects access, security, and fairness.
            With affordability ratios above 30% in most provinces and vacancy rates below 2.5%, the housing system is under stress.
            Our project demystifies the data behind zoning laws, building permits, homelessness trends, and affordability gaps — connecting
            evidence to lived experience and civic action.
          </p>

          <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "15px" }}>
            Join Us in Solving the Housing Crisis
          </h3>
          <p style={{ fontSize: "1.1rem", color: "#555" }}>
            Whether you’re a researcher, organizer, or student — your role matters.
            Explore our open tools, learn about your region, and share insights that push for fairness and better public policy.
            Every chart and dataset can lead to civic impact.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div style={{ backgroundColor: "white", padding: "60px 20px", textAlign: "center" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "40px" }}>
          Meet Our Team
        </h2>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "40px",
          maxWidth: "900px",
          margin: "0 auto"
        }}>
          {/* Maan */}
          <div style={{
            width: "220px",
            border: "1px solid #eee",
            borderRadius: "12px",
            padding: "20px",
            textAlign: "center",
            backgroundColor: "#f9f9f9"
          }}>
            <img src="/assets/maan.jpg" alt="Maan Patel" style={{
              width: "100px",
              height: "100px",
              marginLeft: "40px",
              borderRadius: "50%",
              marginBottom: "10px",
              objectFit: "cover"
            }} />
            <h3 style={{ fontSize: "1.2rem", fontWeight: "bold" }}>Maan Patel</h3>
            <p style={{ fontSize: "0.95rem", color: "#666" }}>CSJ Data Analyst</p>
          </div>

          {/* Daniel */}
          <div style={{
            width: "220px",
            border: "1px solid #eee",
            borderRadius: "12px",
            padding: "20px",
            textAlign: "center",
            backgroundColor: "#f9f9f9"
          }}>
            <img src="/assets/daniel.jpg" alt="Daniel" style={{
              width: "100px",
              height: "100px",
             marginLeft: "40px",
              borderRadius: "50%",
              marginBottom: "10px",
              objectFit: "cover"
            }} />
            <h3 style={{ fontSize: "1.2rem", fontWeight: "bold" }}>Daniel</h3>
            <p style={{ fontSize: "0.95rem", color: "#666" }}>CSJ Data Analyst</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
