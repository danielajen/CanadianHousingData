import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const IndigenousHousing = () => {
  const [affordabilityData, setAffordabilityData] = useState(null);
  const [educationHousingData, setEducationHousingData] = useState(null);
 // const [housingDensityData, setHousingDensityData] = useState(null);
  const [housingDensityData1, setHousingDensityData1] = useState(null);
  const [housingData, setHousingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchHousingNeed = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/statcan`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([
          { vectorId: 1595186177, latestN: 1 }, // Total in core housing need
          { vectorId: 1595186181, latestN: 1 }, // Owners in core need
          { vectorId: 1595186185, latestN: 1 }  // Renters in core need
        ])
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      
      // Process housing need data
      const categories = ["Total", "Owners", "Renters"];
      const colors = ["#4e79a7", "#59a14f", "#e15759"];
      
      setHousingData({
        labels: ["Core Housing Need"],
        datasets: data.map((item, index) => ({
          label: categories[index],
          data: [item.object.vectorDataPoint[0]?.value || 0],
          backgroundColor: colors[index],
          borderColor: colors[index],
          borderWidth: 1
        }))
      });

      setLoading(false);

    } catch (err) {
      console.error("Housing need fetch failed:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  const fetchAffordabilityData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/statcan`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([
          { vectorId: 1595189454, latestN: 1 }, // Total spending ≥30%
          { vectorId: 1595189459, latestN: 1 }, // Owners spending ≥30%
          { vectorId: 1595189464, latestN: 1 }  // Renters spending ≥30%
        ])
      });
  
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  
      const data = await response.json();
  
      // Process affordability data
      const categories = ["Total Spending ≥30%", "Owner Households", "Renter Households"];
      const colors = ["#2c3e50", "#27ae60", "#e74c3c"];
  
      setAffordabilityData({
        labels: ["Housing Affordability"],
        datasets: data.map((item, index) => ({
          label: categories[index],
          data: [item.object.vectorDataPoint[0]?.value || 0],
          backgroundColor: colors[index],
          borderColor: colors[index],
          borderWidth: 1
        }))
      });
  
      setLoading(false);
  
    } catch (err) {
      console.error("Affordability fetch failed:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  const fetchEducationHousing = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/statcan`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([
          { vectorId: 1600170570, latestN: 1 }, // Total housing tenure
          { vectorId: 1600170606, latestN: 1 }, // Owner-occupied
          { vectorId: 1600170642, latestN: 1 }  // Renter-occupied
        ])
      });
  
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  
      const data = await response.json();
  
      // Process education housing data
      const categories = ["Total Housing", "Owner-Occupied", "Renter-Occupied"];
      const colors = ["#2c3e50", "#27ae60", "#e74c3c"];
  
      setEducationHousingData({
        labels: ["Housing Tenure"],
        datasets: data.map((item, index) => ({
          label: categories[index],
          data: [item.object.vectorDataPoint[0]?.value || 0],
          backgroundColor: colors[index],
          borderColor: colors[index],
          borderWidth: 1
        }))
      });
  
      setLoading(false);
  
    } catch (err) {
      console.error("Education housing fetch failed:", err);
      setError(err.message);
      setLoading(false);
    }
  };



  /*const fetchHousingDensity = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/statcan`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([
          // First Nations breakdown
          { vectorId: "1.1.1.1.1.1.4.1", latestN: 1 }, // Total
          { vectorId: "1.1.1.1.1.1.4.3", latestN: 1 }, // >1 person
          
          // Métis breakdown
          { vectorId: "1.1.1.1.1.1.5.1", latestN: 1 }, // Total
          { vectorId: "1.1.1.1.1.1.5.3", latestN: 1 }, // >1 person
          
          // Inuit breakdown
          { vectorId: "1.1.1.1.1.1.6.1", latestN: 1 }, // Total
          { vectorId: "1.1.1.1.1.1.6.3", latestN: 1 }, // >1 person
          
          // Multiple Indigenous responses
          { vectorId: "1.1.1.1.1.1.7.1", latestN: 1 }, // Total
          { vectorId: "1.1.1.1.1.1.7.3", latestN: 1 }  // >1 person
        ])
      });
  
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  
      const data = await response.json();
  
      // Process data with original formatting
      const housingDensityData = {
        labels: ["First Nations", "Métis", "Inuit", "Multiple Responses"],
        datasets: [
          {
            label: 'Total Population',
            data: [
              data[0].object.vectorDataPoint[0]?.value,
              data[2].object.vectorDataPoint[0]?.value,
              data[4].object.vectorDataPoint[0]?.value,
              data[6].object.vectorDataPoint[0]?.value
            ],
            backgroundColor: '#4e79a7'
          },
          {
            label: 'Overcrowded Households',
            data: [
              data[1].object.vectorDataPoint[0]?.value,
              data[3].object.vectorDataPoint[0]?.value,
              data[5].object.vectorDataPoint[0]?.value,
              data[7].object.vectorDataPoint[0]?.value
            ],
            backgroundColor: '#e15759'
          }
        ]
      };
  
      setHousingDensityData(housingDensityData);
      setLoading(false);
  
    } catch (err) {
      console.error("Housing density fetch failed:", err);
      setError(err.message);
      setLoading(false);
    }
  };*/

  useEffect(() => {
    fetchHousingNeed();
    fetchEducationHousing();
    //fetchHousingDensity();
    fetchAffordabilityData();
  }, []);

  // Calculate percentages
  const totalHighCost = 240990;
  const ownerPercentage = ((89680 / totalHighCost) * 100).toFixed(1);
  const renterPercentage = ((151270 / totalHighCost) * 100).toFixed(1);


  return (
    <div style={{ display: "flex", flexDirection: "column" }}>

      <div style={{
  width: "100%",
  backgroundColor: "#1a365d",
  color: "white",
  padding: "80px 20px",
  backgroundImage: `url(${process.env.PUBLIC_URL}/assets/IndigenousHousing.png)`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  position: "relative",
}}>
  {/* Overlay */}
  <div style={{
    position: "absolute",
    inset: 0,
    backgroundColor: "#1a365d",
    opacity: 0.7
  }}></div>

  {/* Content */}
  <div style={{
    position: "relative",
    zIndex: 1,
    maxWidth: "1000px",
    margin: "0 auto",
    textAlign: "center"
  }}>
    <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "20px" }}>
      Indigenous Housing in Canada
    </h1>
    <p style={{ fontSize: "1.25rem", lineHeight: "1.7" }}>
      Understanding the challenges, data gaps, and solutions surrounding Indigenous housing.
    </p>
  </div>
</div>


      {/* Context Section */}
      <div style={{ backgroundColor: "#ffffff", padding: "60px 20px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", lineHeight: 1.7 }}>
          <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "20px" }}>Why Focus on Indigenous Housing?</h2>
          <p>
            Indigenous Peoples in Canada—First Nations, Inuit, and Métis—face unique housing challenges both on- and off-reserve. These challenges include overcrowding, poor infrastructure, lack of affordable options, and jurisdictional gaps in funding and policy. The 2021 Census noted over 1 in 5 Indigenous people live in homes needing major repairs.
          </p>
        </div>
      </div>

      {/* Card Grid Section */}
      <div style={{ backgroundColor: "#f3f4f6", padding: "60px 20px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "30px", textAlign: "center" }}>
            Key Issues in Indigenous Housing
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px"
          }}>
            {[{
              title: "Overcrowding & Repairs",
              text: "Indigenous households are 3x more likely to experience overcrowding and require urgent repairs compared to the non-Indigenous population."
            }, {
              title: "On- vs Off-Reserve Disparities",
              text: "On-reserve housing is federally funded, while off-reserve housing falls under provincial/municipal systems—creating funding gaps."
            }, {
              title: "Urban Indigenous Housing",
              text: "More than half of Indigenous people live in urban areas. Many struggle to access culturally appropriate, affordable housing."
            }].map((item, idx) => (
              <div key={idx} style={{ backgroundColor: "#fff", padding: "24px", borderRadius: "8px", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "12px", color: "#1a365d" }}>{item.title}</h3>
                <p style={{ color: "#444" }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ 
      background: '#fff', 
      padding: '20px', 
      borderRadius: '8px', 
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      minHeight: '600px'
    }}>
      <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>Indigenous Housing Needs by Tenure</h3>
      <div style={{ height: '400px', position: 'relative' }}>
        {housingData && <Bar 
          data={housingData} 
          options={{ 
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: 'top' },
              tooltip: {
                callbacks: {
                  label: (context) => `${context.dataset.label}: ${context.parsed.y.toLocaleString()}`
                }
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: (value) => value.toLocaleString()
                }
              }
            }
          }} 
        />}
      </div>
      <div style={{ marginTop: '15px' }}>
        <h4>2022 Key Metrics</h4>
        <ul>
          <li><strong>Total in Need:</strong> 208,620 individuals</li>
          <li><strong>Owner-Occupied:</strong> 56,760 (27.2% of total)</li>
          <li><strong>Renter-Occupied:</strong> 151,820 (72.8% of total)</li>
        </ul>
        <div style={{ fontSize: '0.9em', color: '#666' }}>
          Source: Statistics Canada Table 41-10-0069-01
        </div>
      </div>
      {loading && <div>Loading housing data...</div>}
      {error && <div style={{ color: 'red' }}>Error loading housing data: {error}</div>}
    </div>

    <div style={{ 
      background: '#fff', 
      padding: '20px', 
      borderRadius: '8px', 
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      minHeight: '600px',
      marginTop: '40px'
    }}>
      <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>
        Indigenous Housing Affordability in Canada (2022)
      </h3>
      
      <div style={{ height: '400px', position: 'relative' }}>
        {affordabilityData && <Bar 
          data={affordabilityData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: 'top' },
              tooltip: {
                callbacks: {
                  label: (context) => 
                    `${context.dataset.label}: ${context.parsed.y.toLocaleString()}`
                }
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Number of Households'
                },
                ticks: {
                  callback: (value) => value.toLocaleString()
                }
              }
            }
          }}
        />}
      </div>

      <div style={{ marginTop: '20px' }}>
        <h4>Key Statistics</h4>
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          <li style={{ marginBottom: '8px' }}>
            • Total spending ≥30% on shelter: <strong>240,990</strong>
          </li>
          <li style={{ marginBottom: '8px' }}>
            • Owner-occupied households: 89,680 ({ownerPercentage}%)
          </li>
          <li style={{ marginBottom: '8px' }}>
            • Renter-occupied households: 151,270 ({renterPercentage}%)
          </li>
          <li style={{ marginBottom: '8px', color: '#7f8c8d' }}>
            † Excludes data marked as unreliable (F)
          </li>
        </ul>
        <div style={{ 
          marginTop: '15px', 
          fontSize: '0.85rem', 
          color: '#7f8c8d'
        }}>
          Source: Statistics Canada Table 41-10-0070-01 - Indigenous Peoples Survey 2022
        </div>
      </div>

      {loading && <div style={{ marginTop: '20px' }}>Loading affordability data...</div>}
      {error && <div style={{ color: '#c0392b', marginTop: '20px' }}>{error}</div>}
    </div>

{/* education */}
    <div style={{ 
  background: '#fff', 
  padding: '20px', 
  borderRadius: '8px', 
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  minHeight: '600px',
  marginTop: '40px'
}}>
  <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>
    Indigenous Housing Tenure (2022)
  </h3>
  
  <div style={{ height: '400px', position: 'relative' }}>
    {educationHousingData && <Bar 
      data={educationHousingData}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top' },
          tooltip: {
            callbacks: {
              label: (context) => 
                `${context.dataset.label}: ${context.parsed.y.toLocaleString()}`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Households'
            },
            ticks: {
              callback: (value) => value.toLocaleString()
            }
          }
        }
      }}
    />}
  </div>

  <div style={{ marginTop: '20px' }}>
    <h4>Key Statistics</h4>
    <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
      <li style={{ marginBottom: '8px' }}>
        • Total households: <strong>1,066,920</strong>
      </li>
      <li style={{ marginBottom: '8px' }}>
        • Owner-occupied: 633,590 (59.4%)
      </li>
      <li style={{ marginBottom: '8px' }}>
        • Renter-occupied: 431,990 (40.5%)
      </li>
      <li style={{ marginBottom: '8px', color: '#7f8c8d' }}>
        † Includes subsidized and non-subsidized housing
      </li>
    </ul>
    <div style={{ 
      marginTop: '15px', 
      fontSize: '0.85rem', 
      color: '#7f8c8d'
    }}>
      Source: Statistics Canada Table 41-10-0076-01 - Indigenous Peoples Survey 2022
    </div>
  </div>

  {loading && <div style={{ marginTop: '20px' }}>Loading housing tenure data...</div>}
  {error && <div style={{ color: '#c0392b', marginTop: '20px' }}>{error}</div>}
</div>


{/* Housing Density Section  1*/}
{/*
<div style={{ 
        background: '#fff', 
        padding: '20px', 
        borderRadius: '8px', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginTop: '40px'
      }}>
        <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>
          Housing Density by Indigenous Identity (2021)
        </h3>
        
        {housingDensityData1 && (
          <div style={{ height: '400px', position: 'relative' }}>
            <Bar 
              data={housingDensityData1}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { 
                    position: 'top',
                    labels: {
                      padding: 20,
                      boxWidth: 12,
                      font: { size: 12 }
                    }
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => 
                        `${context.dataset.label}: ${context.parsed.y.toLocaleString()}`
                    }
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    title: { display: true, text: 'Number of Persons' },
                    ticks: { 
                      callback: (value) => value.toLocaleString() 
                    }
                  }
                }
              }}
            />
          </div>
        )}

{loading && <div style={{ marginTop: '20px' }}>Loading housing density data...</div>}
{error && <div style={{ color: '#c0392b', marginTop: '20px' }}>{error}</div>}
</div>


      {/* Footer Note */} 
      <div style={{ backgroundColor: "#f9fafb", padding: "40px 20px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "0.9rem", color: "#666" }}>
            Sources: CMHC, Indigenous Services Canada, Statistics Canada Census (2021–2025)
          </p>
        </div>
      </div>
    </div>
  );
};

export default IndigenousHousing;
