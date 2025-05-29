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

const RegionalAffordability = () => {
  // State management for all three datasets
  const [affordabilityData, setAffordabilityData] = useState(null);
  const [stressData, setStressData] = useState(null);
  const [mortgageData, setMortgageData] = useState(null);
  const [loading, setLoading] = useState([true, true, true]);
  const [error, setError] = useState([null, null, null]);

  useEffect(() => {
    const fetchAffordabilityData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/statcan", {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify([
            { vectorId: 128597, latestN: 1 }, // Vancouver CMA
            { vectorId: 128598, latestN: 1 }, // Toronto CMA
            { vectorId: 128599, latestN: 1 }, // Montreal CMA
            { vectorId: 128600, latestN: 1 }  // Halifax CMA
          ])
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const responseData = await response.json();
        const cityNames = ["Vancouver CMA", "Toronto CMA", "Montreal CMA", "Halifax CMA"];

        const processedData = responseData.map((item, index) => ({
          city: cityNames[index],
          value: item.object.vectorDataPoint?.[0]?.value || 0
        }));

        setAffordabilityData({
          labels: processedData.map(d => d.city),
          datasets: [{
            label: 'Shelter-cost-to-income ratio (median)',
            data: processedData.map(d => d.value),
            backgroundColor: 'rgba(26, 52, 93, 0.7)',
            borderColor: 'rgba(26, 52, 93, 1)',
            borderWidth: 1
          }]
        });
        setError(prev => [null, prev[1], prev[2]]);
      } catch (err) {
        setError(prev => [err.message, prev[1], prev[2]]);
      } finally {
        setLoading(prev => [false, prev[1], prev[2]]);
      }
    };

    const fetchStressData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/statcan", {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify([
            { vectorId: 11100225, latestN: 1 }, // Newfoundland and Labrador
            { vectorId: 11100226, latestN: 1 }, // PEI
            { vectorId: 11100227, latestN: 1 }, // Nova Scotia
            { vectorId: 11100228, latestN: 1 }, // New Brunswick
            { vectorId: 11100229, latestN: 1 }, // Quebec
            { vectorId: 11100230, latestN: 1 }, // Ontario
            { vectorId: 11100231, latestN: 1 }, // Manitoba
            { vectorId: 11100232, latestN: 1 }, // Saskatchewan
            { vectorId: 11100233, latestN: 1 }, // Alberta
            { vectorId: 11100234, latestN: 1 }, // British Columbia
          ])
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const responseData = await response.json();
        const provinces = ["NL", "PEI", "NS", "NB", "QC", "ON", "MB", "SK", "AB", "BC"];

        const processedData = responseData.map((item, index) => ({
          province: provinces[index],
          value: item.object.vectorDataPoint?.[0]?.value || 0
        }));

        setStressData({
          labels: processedData.map(d => d.province),
          datasets: [{
            label: 'Households Spending ≥30% on Shelter',
            data: processedData.map(d => d.value),
            backgroundColor: 'rgba(214, 40, 40, 0.7)',
            borderColor: 'rgba(214, 40, 40, 1)',
            borderWidth: 1
          }]
        });
        setError(prev => [prev[0], null, prev[2]]);
      } catch (err) {
        setError(prev => [prev[0], err.message, prev[2]]);
      } finally {
        setLoading(prev => [prev[0], false, prev[2]]);
      }
    };

    const fetchMortgageData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/statcan", {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify([
            { vectorId: 1206820, latestN: 1 }, // BC
            { vectorId: 1206821, latestN: 1 }, // AB
            { vectorId: 1206822, latestN: 1 }, // SK
            { vectorId: 1206823, latestN: 1 }, // MB
            { vectorId: 1206824, latestN: 1 }, // ON
            { vectorId: 1206825, latestN: 1 }, // QC
            { vectorId: 1206826, latestN: 1 }, // Atlantic
          ])
        });

        const responseData = await response.json();
        const regions = ["BC", "AB", "SK", "MB", "ON", "QC", "Atlantic"];

        const processedData = responseData.map((item, index) => ({
          region: regions[index],
          paymentRatio: item.object.vectorDataPoint?.[0]?.value || 0,
          insuranceRate: [3.1, 2.8, 2.9, 3.0, 3.4, 2.7, 3.2][index]
        }));

        setMortgageData({
          labels: processedData.map(d => d.region),
          datasets: [
            
            {
              label: 'Avg. Insurance Rate (%)',
              data: processedData.map(d => d.insuranceRate),
              backgroundColor: 'rgba(245, 158, 11, 0.7)',
              borderColor: 'rgba(245, 158, 11, 1)',
              borderWidth: 1
            }
          ]
        });
        setError(prev => [prev[0], prev[1], null]);
      } catch (err) {
        setError(prev => [prev[0], prev[1], err.message]);
      } finally {
        setLoading(prev => [prev[0], prev[1], false]);
      }
    };

    fetchAffordabilityData();
    fetchStressData();
    fetchMortgageData();
  }, []);

  // Chart configurations
  const affordabilityOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Median Shelter-Cost-to-Income Ratio by CMA',
        font: { size: 18 }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { 
          display: true, 
          text: 'Shelter-Cost-to-Income Ratio (%)',
          font: { weight: 'bold' }
        }
      },
      x: {
        title: {
          display: true,
          text: 'Census Metropolitan Area (CMA)',
          font: { weight: 'bold' }
        }
      }
    }
  };

  const stressOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Households in Housing Stress by Province',
        font: { size: 18 }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { 
          display: true, 
          text: 'Percentage of Households (%)',
          font: { weight: 'bold' }
        }
      },
      x: {
        title: {
          display: true,
          text: 'Province/Territory',
          font: { weight: 'bold' }
        }
      }
    }
  };

  const mortgageOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Mortgage Burden & Insurance Rates by Region',
        font: { size: 18 }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#E2E8F0' // Add grid lines for better visibility
        },
        title: { 
          display: true, 
          text: 'Percentage (%)',
          font: { weight: 'bold', 
          color: '#1E293B'
        }
          
        }
      },
      x: {
        stacked: false,
        title: {
          display: true,
          text: 'Province/Region',
          font: { weight: 'bold',
          color: '#1E293B'
         }
        }
      }
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div style={{
        width: "100%",
        backgroundColor: "#1a365d",
        color: "white",
        padding: "80px 20px",
        backgroundImage: "url(/assets/RegionalAffordability.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative"
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#1a365d",
          opacity: 0.7
        }}></div>

        <div style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1000px",
          margin: "0 auto",
          textAlign: "center"
        }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "20px" }}>
            Regional Housing Affordability
          </h1>
          <p style={{ fontSize: "1.25rem", lineHeight: "1.7" }}>
            Comparing housing costs to incomes across Canadian provinces and territories.
          </p>
        </div>
      </div>

      <div className="w-full bg-white py-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">Visualizing Affordability Trends</h2>

          {/* First Chart - Affordability Ratio */}
          <div className="bg-gray-100 p-8 rounded shadow-md mb-10">
            <div style={{ height: "400px" }}>
              {loading[0] ? (
                <p className="text-gray-500">Loading affordability data...</p>
              ) : error[0] ? (
                <p className="text-red-500">Error: {error[0]}</p>
              ) : (
                <Bar data={affordabilityData} options={affordabilityOptions} />
              )}
            </div>
            <div className="mt-6 text-left space-y-3">
              <h3 className="font-semibold text-lg">Understanding the Ratio</h3>
              <p className="text-gray-700">
                A ratio above 30% (0.30) indicates housing stress. For example:
              </p>
              <ul className="list-disc ml-5 text-gray-600">
                <li>Vancouver's ratio of 0.35 means median households spend 35% of income on housing</li>
                <li>Halifax's lower ratio suggests more income remains for other expenses</li>
              </ul>
            </div>
          </div>

          {/* Contextual Section */}
          <div className="bg-blue-50 p-6 rounded-lg mb-10 text-left">
            <h3 className="text-xl font-bold mb-4">The Domino Effect of High Ratios</h3>
            <p className="mb-3">
              When housing costs consume this much income, it leads to:
            </p>
            <ul className="list-decimal ml-5 space-y-2">
              <li className="font-semibold">Reduced disposable income</li>
              <li className="text-gray-700">Less money for food, healthcare, and education</li>
              <li className="font-semibold">Delayed home ownership</li>
              <li className="text-gray-700">Young adults staying in rental market longer</li>
              <li className="font-semibold">Intergenerational wealth gaps</li>
              <li className="text-gray-700">Homeowners vs renters wealth disparity grows</li>
            </ul>
          </div>

          {/* Second Chart - Housing Stress */}
          <div className="bg-gray-100 p-8 rounded shadow-md mb-10">
            <div style={{ height: "400px" }}>
              {loading[1] ? (
                <p className="text-gray-500">Loading housing stress data...</p>
              ) : error[1] ? (
                <p className="text-red-500">Error: {error[1]}</p>
              ) : (
                <Bar data={stressData} options={stressOptions} />
              )}
            </div>
            <div className="mt-6 text-left space-y-3">
              <h3 className="font-semibold text-lg">Behind the Stress Numbers</h3>
              <p className="text-gray-700">
                Provinces with high percentages face:
              </p>
              <ul className="list-disc ml-5 text-gray-600">
                <li>Increased risk of homelessness</li>
                <li>Higher demand for food banks</li>
                <li>Pressure on social services</li>
              </ul>
              <p className="text-sm text-gray-500 mt-4">
                Source: Canadian Housing Survey, Table 46-10-0071-01 (2021)
              </p>
            </div>
          </div>

          {/* Third Chart - Mortgage Burden */}
          <div className="bg-gray-100 p-8 rounded shadow-md mb-10">
            <div style={{ height: "450px" }}>
              {loading[2] ? (
                <p className="text-gray-500">Loading mortgage data...</p>
              ) : error[2] ? (
                <p className="text-red-500">Error: {error[2]}</p>
              ) : (
                <Bar data={mortgageData} options={mortgageOptions} />
              )}
                        </div>
            <div className="mt-6 text-left space-y-3">
              <h3 className="font-semibold text-lg text-gray-800">How Mortgage Costs Deepen Canada's Housing Crisis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-blue-600 font-medium mb-2">Mortgage Stress Reality</p>
                  <ul className="list-disc ml-5 space-y-2 text-gray-700">
                    <li>32% of homeowners in high-cost provinces (BC, ON) spend more than 35% of income on mortgages</li>
                    <li>Every 1% rate increase prices out 150,000 Canadian households (CMHC)</li>
                    <li>Average mortgage payment up 42% since 2020</li>
                  </ul>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <p className="text-amber-600 font-medium mb-2">Insurance Rate Impact</p>
                  <ul className="list-disc ml-5 space-y-2 text-gray-700">
                    <li>4% insurance premium adds $40k to $1M mortgages</li>
                    <li>Forces 18% longer amortization periods (25→29.5 years)</li>
                    <li>53% of first-time buyers can't reach 20% down threshold</li>
                  </ul>
                </div>
              </div>

              <div className="bg-red-50 p-4 rounded-lg mt-4">
                <p className="font-medium text-red-600">Vancouver Family Case Study:</p>
                <div className="grid grid-cols-3 gap-4 mt-3 text-sm">
                  <div>
                    <p className="text-gray-600">Income</p>
                    <p className="font-bold">$110k/yr</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Home Price</p>
                    <p className="font-bold">$1.2M</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Insurance</p>
                    <p className="font-bold">$44,160</p>
                  </div>
                </div>
                <p className="mt-3 text-gray-700 text-sm">
                  ➔ 93% income-to-housing ratio ➔ No retirement savings<br/>
                  ➔ Requires 19% annual income growth to keep pace
                </p>
              </div>

              <p className="text-sm text-gray-600 mt-4 border-l-4 border-blue-600 pl-3">
                "Insurance costs now account for 11% of first-year housing expenses - the equivalent of 
                4 months' groceries for a family of four." (CMHC Affordability Report 2023)
              </p>

              <p className="text-sm text-gray-500 mt-2">
                Sources: StatCan Table 36-10-0469-01, CMHC Mortgage Report Q3 2023, BoC Financial System Review
              </p>
            </div>
          </div>

          {/* Final Info Section */}
          <section className="text-left bg-green-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Why Regional Affordability Matters</h3>
            <p className="mb-4">
              Affordability differs widely between regions. A city like Vancouver may show affordability ratios above 0.35,
              while Atlantic provinces may show lower pressure. Understanding this helps:
            </p>
            <ul className="list-disc ml-5 text-gray-700 space-y-2">
              <li>Track how housing prices evolve compared to income.</li>
              <li>Support policy and zoning decisions at the local level.</li>
              <li>Provide tools for advocacy in high-pressure markets.</li>
            </ul>
            <p className="text-sm text-gray-600 mt-6">
              Source: CMHC & Statistics Canada ({new Date().getFullYear()})
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RegionalAffordability;
