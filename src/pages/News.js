import React from "react";
import "../App.css";

const News = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const newsArticles = [
    {
      id: 1,
      title: "Federal Government Announces New Housing Accelerator Fund",
      summary: "The $4 billion initiative aims to fast-track 100,000 new homes across Canada by 2025 through municipal partnerships.",
      date: "2023-11-15",
      category: "Policy Update"
    },
    {
      id: 2,
      title: "Toronto Vacancy Rates Hit Record Low of 1.2%",
      summary: "New data shows rental availability continues to decline despite increased construction activity in the GTA.",
      date: "2023-11-10",
      category: "Market Trends"
    },
    {
      id: 3,
      title: "Indigenous Housing Strategy Shows Promising Early Results",
      summary: "Urban Indigenous communities report 25% improvement in housing access since 2021 funding initiatives began.",
      date: "2023-11-05",
      category: "Community Impact"
    },
    {
      id: 4,
      title: "CMHC Revises Housing Starts Forecast Upward",
      summary: "National housing agency predicts 240,000 new units in 2024, citing increased multi-family construction.",
      date: "2023-10-28",
      category: "Construction"
    },
    {
      id: 5,
      title: "Tenant Unions Gain Traction in Major Cities",
      summary: "Advocacy groups report 300% membership increase as renters organize for better protections.",
      date: "2023-10-20",
      category: "Advocacy"
    },
    {
      id: 6,
      title: "International Housing Models Offer Solutions",
      summary: "Vienna's social housing and Helsinki's Housing First approaches provide lessons for Canadian policymakers.",
      date: "2023-10-15",
      category: "Global Insights"
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Banner Section */}
      {/* <div className="flex justify-center items-start w-full h-[320px] bg-[#1a365d] p-5">
        <div className="flex flex-col w-[90%] md:w-[50%] h-full justify-around text-center text-gray-100">
          <h1 className="text-4xl md:text-6xl font-bold">
            Housing News & Updates
          </h1>
          <p className="text-xl md:text-2xl">
            Stay informed about Canada's housing market developments, policy changes, and community initiatives
          </p>
        </div>
      </div> */}

    <div className="w-full text-white px-4 py-20 relative" style={{
  backgroundImage: "url('/assets/news.jpg')",
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
      Housing News & Updates
    </h1>
    <p style={{ fontSize: "1.25rem" }}>
      Stay informed about Canada's housing market developments, policy changes, and community initiatives
    </p>
  </div>
</div>



      {/* News Grid */}
      <div className="w-full bg-gray-100 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsArticles.map((article) => (
              <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-[var(--red)]">
                      {article.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      {article.date}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{article.title}</h3>
                  <p className="text-gray-700">{article.summary}</p>
                  <button className="mt-4 text-[var(--red)] font-semibold hover:underline">
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Resources */}
          <div className="mt-16 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Housing Data Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border-l-4 border-[var(--red)] pl-4">
                <h3 className="font-bold mb-2">Statistics Canada</h3>
                <p className="text-gray-700 mb-3">Latest housing market indicators and economic data</p>
                <a href="https://www.statcan.gc.ca" className="text-[var(--red)] hover:underline">Visit Site →</a>
              </div>
              <div className="border-l-4 border-[var(--red)] pl-4">
                <h3 className="font-bold mb-2">CMHC Reports</h3>
                <p className="text-gray-700 mb-3">Housing market analysis and research papers</p>
                <a href="https://www.cmhc-schl.gc.ca" className="text-[var(--red)] hover:underline">Visit Site →</a>
              </div>
              <div className="border-l-4 border-[var(--red)] pl-4">
                <h3 className="font-bold mb-2">Tenant Rights</h3>
                <p className="text-gray-700 mb-3">Provincial guides and advocacy resources</p>
                <a href="#" className="text-[var(--red)] hover:underline">Learn More →</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;