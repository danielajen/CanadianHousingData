import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Home = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* Hero Section */}
      <div
        style={{
          width: "100%",
          backgroundColor: "#1a365d",
          color: "white",
          padding: "80px 20px",
          backgroundImage: `url(${process.env.PUBLIC_URL}/assets/main-banner.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", inset: 0, backgroundColor: "#1a365d", opacity: 0.7 }}></div>
        <div style={{ position: "relative", zIndex: 1, maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "20px" }}>
            Canada's Housing Crisis – By The Numbers
          </h1>
          <p style={{ fontSize: "1.25rem", marginBottom: "30px" }}>
            A data-driven platform bringing transparency to Canada's housing market. Explore real statistics, understand local impacts, and take action for change.
          </p>
          <button
            onClick={() => navigate("/national-housing-data")}
            style={{
              backgroundColor: "white",
              color: "#1a365d",
              padding: "12px 24px",
              borderRadius: "8px",
              fontWeight: "bold",
              border: "none",
              cursor: "pointer",
            }}
          >
            Explore Housing Data
          </button>
        </div>
      </div>

      {/* Three Pillars Section */}
      <div style={{ backgroundColor: "white", padding: "60px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "2rem", fontWeight: "bold", marginBottom: "40px" }}>
            Our Approach to Housing Solutions
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px"
          }}>
            {[
              {
                num: "01",
                title: "Data Transparency",
                text: `We aggregate housing data from trusted sources like CMHC and Statistics Canada.
                In 2024, CMHC reported that housing starts fell by 3.3% in March alone. We track and display this detail to ensure transparency.`
              },
              {
                num: "02",
                title: "Localized Insight",
                text: `Understand how housing affects your specific community with city and neighborhood-level data.
                Calgary prices rose 4.8% in 2024, Ottawa dropped 1.7% — regional impacts are real.`
              },
              {
                num: "03",
                title: "Civic Engagement",
                text: `Turn knowledge into action: contact your MP, support tenant organizations, and push for zoning reform.
                Learn from cities like Vienna and Helsinki with proven housing models.`
              }
            ].map((card, idx) => (
              <div key={idx} style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "24px",
                backgroundColor: "#fff"
              }}>
                <div style={{ fontSize: "2rem", color: "#dc2626", marginBottom: "12px" }}>{card.num}</div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "10px" }}>{card.title}</h3>
                <p style={{ color: "#444" }}>{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Problem Statement Section */}
      <div style={{ backgroundColor: "#f3f4f6", padding: "60px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "2rem", fontWeight: "bold", marginBottom: "32px" }}>
            Why Housing Data Matters
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "40px", alignItems: "center" }}>
            <div style={{ flex: "1 1 50%" }}>
              <p style={{ fontSize: "1.1rem", marginBottom: "20px" }}>
                Canada faces an unprecedented housing crisis. Rents are rising, incomes are stagnant, and vacancy rates hit a low of 1.5% in 2023. Data is critical to identifying gaps and building solutions.
              </p>
              <ul style={{ paddingLeft: "20px", lineHeight: "1.6" }}>
                <li>📉 Understand rent vs income locally</li>
                <li>🏗 Track housing starts and completions</li>
                <li>🏚 Measure rental pressure zones</li>
                <li>📊 Advocate using visual evidence</li>
              </ul>
            </div>
            <div style={{ flex: "1 1 40%", overflow: "hidden", borderRadius: "12px" }}>
              <img
                src={`${process.env.PUBLIC_URL}/assets/about.png`}
                alt="Infographic"
                style={{ width: "100%", height: "100%", objectFit: "cover", maxHeight: "350px" }}
              />
            </div>
          </div>
        </div>
      </div>

  
<div
  style={{
    backgroundColor: "#ffffff",
    color: "#1f2937",
    padding: "60px 20px",
  }}
>
  <div
    style={{
      maxWidth: "1200px",
      margin: "0 auto",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "30px",
    }}
  >
    {/* Card 1 */}
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "16px",
        padding: "40px 30px",
        flex: "1 1 450px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
        textAlign: "center",
      }}
    >
      <h2
        style={{
          fontSize: "1.8rem",
          fontWeight: "bold",
          marginBottom: "16px",
        }}
      >
        Ready to explore Canada's housing data?
      </h2>
      <p
        style={{
          fontSize: "1.1rem",
          marginBottom: "30px",
        }}
      >
        Start with a national overview or dive into localized trends and
        challenges.
      </p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
          justifyContent: "center",
        }}
      >
        <button
          onClick={() => navigate("/national-housing-data")}
          style={{
            backgroundColor: "#dc2626",
            color: "white",
            padding: "12px 24px",
            borderRadius: "8px",
            fontWeight: "bold",
            border: "none",
            cursor: "pointer",
          }}
        >
          View National Data
        </button>
        <button
          onClick={() => navigate("/regional-affordability")}
          style={{
            backgroundColor: "white",
            color: "#dc2626",
            padding: "12px 24px",
            border: "2px solid #dc2626",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Find Local Insights
        </button>
      </div>
    </div>

    {/* Card 2 */}
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "16px",
        padding: "40px 30px",
        flex: "1 1 450px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
        textAlign: "center",
      }}
    >
      <h2
        style={{
          fontSize: "1.8rem",
          fontWeight: "bold",
          marginBottom: "16px",
        }}
      >
        Take the Next Step
      </h2>
      <p
        style={{
          fontSize: "1.1rem",
          marginBottom: "30px",
        }}
      >
        Learn how government policy impacts housing — and what you can do to
        push for change.
      </p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
          justifyContent: "center",
        }}
      >
        <button
          onClick={() => navigate("/news")}
          style={{
            backgroundColor: "#dc2626",
            color: "white",
            padding: "12px 24px",
            borderRadius: "8px",
            fontWeight: "bold",
            border: "none",
            cursor: "pointer",
          }}
        >
          Explore More Data
        </button>
        <button
          onClick={() => navigate("/housing-policy")}
          style={{
            backgroundColor: "white",
            color: "#dc2626",
            padding: "12px 24px",
            border: "2px solid #dc2626",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Learn About Housing Policy
        </button>
      </div>
    </div>
  </div>
</div>

    </div>
  );
};

export default Home;
