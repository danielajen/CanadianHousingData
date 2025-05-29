//TenantResource
import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { 
  Chart as ChartJS, 
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend 
} from 'chart.js';

// Separate registrations for bar/line charts
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const lineChartPlugins = [
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
];
ChartJS.register(...lineChartPlugins);

const TenantResources = () => {
  const [housingData, setHousingData] = useState(null);
  const [rentGrowthData, setRentGrowthData] = useState(null);
  const [evictionData, setEvictionData] = useState(null);
  const [vacancyData, setVacancyData] = useState(null);
  
  const [loading, setLoading] = useState([true, true, true, true, true]);
  const [error, setError] = useState([null, null, null, null, null]);

  useEffect(() => {
    // 1. Social Housing Transit Proximity
    const fetchHousingTransit = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/statcan", {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify([
            { vectorId: 1001746870, latestN: 1 }, // Canada
            { vectorId: 1001746876, latestN: 1 }, // Ontario
            { vectorId: 1001746871, latestN: 1 }, // Newfoundland
            { vectorId: 1001746872, latestN: 1 }  // PEI
          ])
        });
    
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
        const data = await response.json();
    
        const regions = ["Canada", "PEI", "Newfoundland", "Ontario"];
        const backgroundColors = ['#4e79a7', '#4e79a7', '#4e79a7', '#4e79a7'];  // all same color, adjust if needed
        const borderColors = ['#2c3e50', '#2c3e50', '#2c3e50', '#2c3e50'];
    
        // Process data to extract label and value for each region
        const processedDataset = data.map((regionData, index) => ({
          label: regions[index],
          value: regionData?.object?.vectorDataPoint?.[0]?.value || 0,
          backgroundColor: backgroundColors[index],
          borderColor: borderColors[index]
        }));
    
        setHousingData({
          labels: processedDataset.map(d => d.label),
          datasets: [{
            label: 'Housing Near Transit (%)',
            data: processedDataset.map(d => d.value),
            backgroundColor: processedDataset[0].backgroundColor,
            borderColor: processedDataset[0].borderColor,
            borderWidth: 1,
            borderRadius: 5
          }]
        });
    
        setLoading(prev => [false, prev[1], prev[2], prev[3], prev[4]]);
      } catch (err) {
        setError(prev => [err.message, prev[1], prev[2], prev[3], prev[4]]);
        setLoading(prev => [false, prev[1], prev[2], prev[3], prev[4]]);
      }
    };
    // Vacancy Rates in CMAs
    const fetchVacancyRates = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/statcan", {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify([
            { vectorId: 733349, latestN: 1 },  // Toronto, ON
            { vectorId: 733355, latestN: 1 },  // Montréal, QC
            { vectorId: 733351, latestN: 1 },  // Vancouver, BC
            { vectorId: 733335, latestN: 1 },  // Calgary, AB
            { vectorId: 733356, latestN: 1 },  // Edmonton, AB
            { vectorId: 733336, latestN: 1 },  // Ottawa-Gatineau, ON/QC
            { vectorId: 733354, latestN: 1 },  // Winnipeg, MB
            { vectorId: 733339, latestN: 1 },  // Québec, QC
            { vectorId: 733358, latestN: 1 },  // Hamilton, ON
            { vectorId: 733359, latestN: 1 }   // Kitchener-Cambridge-Waterloo, ON
])
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        const regions = [
          "Toronto", 
          "Montréal", 
          "Vancouver", 
          "Calgary", 
          "Edmonton", 
          "Ottawa-Gatineau", 
          "Winnipeg", 
          "Québec", 
          "Hamilton", 
          "Kitchener-Cambridge-Waterloo"
        ];
        
        const backgroundColors = [
          '#76b7b2', '#76b7b2', '#76b7b2', '#76b7b2', '#76b7b2',
          '#76b7b2', '#76b7b2', '#76b7b2', '#76b7b2', '#76b7b2'
        ];
        
        const borderColors = [
          '#2c3e50', '#2c3e50', '#2c3e50', '#2c3e50', '#2c3e50',
          '#2c3e50', '#2c3e50', '#2c3e50', '#2c3e50', '#2c3e50'
        ];

        const processedDataset = data.map((regionData, index) => ({
          label: regions[index],
          value: regionData?.object?.vectorDataPoint?.[0]?.value || 0,
          backgroundColor: backgroundColors[index],
          borderColor: borderColors[index]
        }));

        setVacancyData({
          labels: processedDataset.map(d => d.label),
          datasets: [{
            label: 'Vacancy Rate (%)',
            data: processedDataset.map(d => d.value),
            backgroundColor: processedDataset[0].backgroundColor,
            borderColor: processedDataset[0].borderColor,
            borderWidth: 1,
            borderRadius: 5
          }]
        });

        setLoading([false]);
      } catch (err) {
        setError([err.message]);
        setLoading([false]);
      }
    };

// 2. Median Assessment Value Growth (Line Chart)
const fetchAssessmentGrowth = async () => {
  try {
    const response = await fetch("http://localhost:3001/api/statcan", {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([
        { vectorId: 1266211318, latestN: 2 }, // British Columbia (Vancouver)
        { vectorId: 1265449918, latestN: 2 }, // Ontario (Toronto)
        { vectorId: 1572847103, latestN: 2 }, // Alberta (Calgary)
        { vectorId: 1373072410, latestN: 2 }  // Manitoba
      ])
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const data = await response.json();
    
    // Structure data for 2021-2022
    const years = [2021, 2022];
    const processData = (cityData, index) => {
      const rawValues = cityData.object.vectorDataPoint
        .slice(0, 2) // Get latest 2 years
        .map(d => d.value);
      
      return {
        label: ["Ontario", "British Columbia", "Manitoba", "Alberta"][index],
        data: rawValues,
        borderColor: ["#e15759", "#4e79a7", "#f28e2b", "#59a14f"][index]
      };
    };

    setRentGrowthData({
      labels: years,
      datasets: data.map(processData)
    });

  } catch (err) {
    console.error("Assessment growth fetch failed:", err);
    setError(prev => [prev[0], prev[1], err.message, prev[3], prev[4]]);
  }
};
    

    // 3. Eviction Filings (Bar Chart)
    const fetchEvictions = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/statcan", {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify([
            { vectorId: 11100888, latestN: 1 },
            { vectorId: 11100889, latestN: 1 },
            { vectorId: 11100890, latestN: 1 },
            { vectorId: 11100891, latestN: 1 }
          ])
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        
        setEvictionData({
          labels: ["BC", "ON", "QC", "AB"],
          datasets: [{
            label: 'Evictions per 1000 Units',
            data: data.map(d => d?.object?.vectorDataPoint?.[0]?.value || 0),
            backgroundColor: 'rgba(255, 99, 132, 0.7)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            borderRadius: 5
          }]
        });
        setLoading(prev => [prev[0], prev[1], prev[2], prev[3], false]);
      } catch (err) {
        setError(prev => [prev[0], prev[1], prev[2], prev[3], err.message]);
      }
    };

    fetchVacancyRates();
    fetchHousingTransit();
    fetchAssessmentGrowth();
    fetchEvictions();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* Hero Section */}
      <div
        style={{
          width: "100%",
          backgroundColor: "#1a365d",
          color: "white",
          padding: "80px 20px",
          backgroundImage: "url(/assets/tenant.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", inset: 0, backgroundColor: "#1a365d", opacity: 0.7 }}></div>
        <div style={{ position: "relative", zIndex: 1, maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "20px" }}>
            Tenant Rights & Resources
          </h1>
          <p style={{ fontSize: "1.25rem", marginBottom: "30px" }}>
            Your guide to rental protections, support services, and data-driven advocacy in Canada.
          </p>
        </div>
      </div>

      {/* Section 1: Tenant Rights */}
      <div style={{ backgroundColor: "#ffffff", padding: "60px 20px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", lineHeight: 1.7 }}>
          <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>Know Your Rights</h2>
          <p>
            Tenants in Canada are protected under provincial and territorial laws. These laws establish rules around rent increases, evictions, repairs, and deposits.
            You are entitled to a safe and livable home, proper notice before inspections, and protection against discrimination.
          </p>
        </div>
      </div>

      {/* Section 2: Support Services */}
      <div style={{ backgroundColor: "#f3f4f6", padding: "60px 20px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", lineHeight: 1.7 }}>
          <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>Support Services Across Canada</h2>
          <p>
            If you are dealing with unsafe conditions, financial hardship, or landlord conflicts, here are some resources:
          </p>
          <ul style={{ paddingLeft: "20px" }}>
            <li>📞 Local Tenant Advocacy Centers</li>
            <li>🏘️ Rent Banks and Emergency Housing Aid</li>
            <li>📋 Municipal Housing Services and Benefits</li>
            <li>⚖️ Human Rights Commissions for Discrimination Cases</li>
          </ul>
        </div>
      </div>

      {/* Section 3: Take Action */}
      <div style={{ backgroundColor: "#ffffff", padding: "60px 20px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", lineHeight: 1.7 }}>
          <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>Take Action and Advocate</h2>
          <p>
            Whether you're challenging rent increases or pushing for inclusive housing policy, tenant voices matter.
            Start by joining local associations, staying informed, and using this platform's data tools to support your case.
          </p>
          <p>
            Keep detailed records of all communications with landlords and explore legal help early if issues arise. Collective action has historically shaped fairer housing systems in Canada.
          </p>
        </div>
      </div>

     {/* Data Visualization Section */}
    <div style={{ padding: "40px 20px", backgroundColor: "#f8f9fa" }}>
      <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Social Housing Transit */}
        <div style={{ 
      background: '#fff', 
      padding: '20px', 
      borderRadius: '8px', 
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      minHeight: '600px'
    }}>
      <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>Transit-Accessible Social Housing</h3>
      <div style={{ height: '400px', position: 'relative' }}>
        {housingData && <Bar 
          data={housingData} 
          options={{ 
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: 'top' }
            },
            scales: {
              y: {
                ticks: {
                  callback: (value) => `${value}%`
                }
              }
            }
          }} 
        />}
      </div>
      <div style={{ marginTop: '15px' }}>
        <h4>2020 Key Metrics</h4>
        <ul>
          <li><strong>Ontario 91.6%:</strong> Highest transit-connected social housing</li>
          <li><strong>Canada 74.4%:</strong> National average accessibility</li>
          <li><strong>PEI 37.4%:</strong> Rural access challenges</li>
        </ul>
        <div style={{ fontSize: '0.9em', color: '#666' }}>
          Source: Statistics Canada Table 46-10-0013-01
        </div>
      </div>
      {loading[0] && <div>Loading transit data...</div>}
      {error[0] && <div style={{ color: 'red' }}>Error loading housing data</div>}
    </div>

{/* vacancy */}
    <div style={{ 
  background: '#fff', 
  padding: '20px', 
  borderRadius: '8px', 
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
  minHeight: '600px' 
}}>
  <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>Rental Vacancy Rates in Major Canadian Cities</h3>
  
  <div style={{ height: '400px', position: 'relative' }}>
    {vacancyData && <Bar 
      data={vacancyData}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top' }
        },
        scales: {
          y: {
            ticks: {
              callback: (value) => `${value}%`
            },
            title: {
              display: true,
              text: 'Vacancy Rate (%)'
            }
          },
          x: {
            title: {
              display: true,
              text: 'City'
            }
          }
        }
      }} 
    />}
  </div>

  <div style={{ marginTop: '15px' }}>
  <h4>2024 Key Insights</h4>
  <ul>
    <li><strong>Toronto:</strong> Growing rental demand driven by strong job market and immigration</li>
    <li><strong>Montréal:</strong> Moderate vacancy amid steady population growth and new developments</li>
    <li><strong>Vancouver:</strong> Low vacancy due to limited new supply and high demand</li>
    <li><strong>Calgary:</strong> Higher vacancy due to recent housing development booms</li>
    <li><strong>Edmonton:</strong> Rising vacancy reflecting slower economic growth</li>
    <li><strong>Ottawa-Gatineau:</strong> Stable rental market with balanced supply and demand</li>
    <li><strong>Winnipeg:</strong> Slightly tightening market with modest rental increases</li>
    <li><strong>Québec:</strong> Consistent vacancy rates with gradual urban expansion</li>
    <li><strong>Hamilton:</strong> Tight rental market reflecting urban growth pressure</li>
    <li><strong>Kitchener-Cambridge-Waterloo:</strong> Increasing vacancy as new developments come online</li>
  </ul>
  <div style={{ fontSize: '0.9em', color: '#666' }}>
    Source: Statistics Canada (Custom API via Table 34-10-0169-01)
  </div>
</div>

{loading[0] && <div>Loading vacancy data...</div>}
{error[0] && <div style={{ color: 'red' }}>Error loading vacancy data</div>}
</div>



        {/* Property Assessment Trends */}
<div style={{ 
  background: '#fff', 
  padding: '20px', 
  borderRadius: '8px', 
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  minHeight: '600px'
}}>
  <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>Property Valuation Trends</h3>
  <div style={{ height: '400px', position: 'relative' }}>
    {rentGrowthData && <Line 
      data={rentGrowthData} 
      options={{ 
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top' },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.dataset.label || '';
                const value = context.parsed.y.toLocaleString();
                return `${label}: $${value}`;
              }
            }
          }
        },
        scales: {
          y: {
            ticks: {
              callback: (value) => `$${value.toLocaleString()}`
            }
          }
        }
      }} 
    />}
  </div>
  <div style={{ marginTop: '15px' }}>
    <h4>2021-2022 Assessment Changes</h4>
    <ul>
      <li><strong>BC +25.8%:</strong> $766K → $964K median valuation</li>
      <li><strong>Ontario +3.3%:</strong> $423K → $437K median</li>
      <li><strong>Alberta +6.3%:</strong> $400K → $425K assessment</li>
      <li><strong>Manitoba +1.0%:</strong> $303K → $306K average</li>
    </ul>
    <div style={{ fontSize: '0.9em', color: '#666' }}>
      Source: Statistics Canada Table 46-10-0051-01 (2021-2022)
    </div>
  </div>
  {loading[2] && <div>Loading property valuations...</div>}
  {error[2] && <div style={{ color: 'red' }}>Error loading assessment data</div>}
</div>

        {/* Evictions */}
        <div style={{ 
          background: '#fff', 
          padding: '20px', 
          borderRadius: '8px', 
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          minHeight: '600px'
        }}>
          <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>Eviction Filings Density</h3>
          <div style={{ height: '400px', position: 'relative' }}>
            {evictionData && <Bar 
              data={evictionData} 
              options={{ 
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'top' }
                }
              }} 
            />}
          </div>
          <div style={{ marginTop: '15px' }}>
            <h4>Housing Instability</h4>
            <p>2023 Filings per 1,000 Units:</p>
            <ul>
              <li><strong>BC Low:</strong> 68% renovictions</li>
              <li><strong>ON High:</strong> Post-COVID backlog</li>
              <li><strong>QC High:</strong> Strong tenant laws</li>
              <li><strong>AB High:</strong> Energy sector impacts</li>
            </ul>
            <div style={{ fontSize: '0.9em', color: '#666' }}>
              Source: Canadian Housing Survey
            </div>
          </div>
          {loading[4] && <div>Loading eviction data...</div>}
          {error[4] && <div style={{ color: 'red' }}>Error loading eviction stats</div>}
        </div>
      </div>
    </div>

    {/* Footer */}
    <div style={{ backgroundColor: "#ffffff", padding: "40px 20px", borderTop: "1px solid #eee" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontSize: "0.9rem", color: "#666" }}>
          Data Sources: CMHC, Statistics Canada, Provincial Tenancy Acts (2023)
        </p>
      </div>
    </div>
  </div>
)}

export default TenantResources;