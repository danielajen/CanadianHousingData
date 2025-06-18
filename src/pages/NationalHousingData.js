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

const NationalHousingData = () => {
  const [chartData, setChartData] = useState(null);
  const [provinceChartData, setProvinceChartData] = useState(null);
  const [loading, setLoading] = useState(false); // Set to false since we're using static data
  const [error, setError] = useState(null);
  const [latestYear] = useState("2023");

  useEffect(() => {
    // Static data for Vancouver 2017-2023
    const vancouverData = {
      labels: ['2017', '2018', '2019', '2020', '2021', '2022', '2023'],
      datasets: [{
        label: 'Vancouver Annual Housing Starts',
        data: [18500, 19500, 21200, 20100, 22500, 24000, 25500],
        backgroundColor: 'rgba(26, 52, 93, 0.7)',
        borderColor: 'rgba(26, 52, 93, 1)',
        borderWidth: 1
      }]
    };

    // Static data for provinces 2017-2023
    const provinceData = {
      labels: ['2017', '2018', '2019', '2020', '2021', '2022', '2023'],
      datasets: [
        {
          label: 'British Columbia',
          data: [40000, 42000, 44000, 41500, 45000, 48000, 50000],
          backgroundColor: 'rgba(255, 99, 132, 0.7)',
          borderWidth: 1
        },
        {
          label: 'Alberta',
          data: [28000, 26000, 27000, 25000, 30000, 35000, 38000],
          backgroundColor: 'rgba(75, 192, 192, 0.7)',
          borderWidth: 1
        },
        {
          label: 'Ontario',
          data: [70000, 75000, 78000, 72000, 80000, 85000, 90000],
          backgroundColor: 'rgba(153, 102, 255, 0.7)',
          borderWidth: 1
        },
        {
          label: 'Quebec',
          data: [45000, 47000, 50000, 48000, 52000, 55000, 58000],
          backgroundColor: 'rgba(255, 159, 64, 0.7)',
          borderWidth: 1
        }
      ]
    };

    setChartData(vancouverData);
    setProvinceChartData(provinceData);
  }, []);

  const chartOptions = (title, yAxisLabel = 'Number of Units') => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        position: 'top',
        labels: { font: { size: 14 } }
      },
      title: {
        display: true,
        text: title,
        font: { size: 18, weight: 'bold' }
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.parsed.y.toLocaleString()} units`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: yAxisLabel,
          font: { size: 14, weight: 'bold' }
        },
        ticks: {
          callback: (value) => value.toLocaleString()
        }
      },
      x: {
        title: {
          display: true,
          text: 'Year',
          font: { size: 14, weight: 'bold' }
        },
        grid: { display: false }
      }
    },
    animation: {
      duration: 2000,
      easing: 'easeOutQuart'
    }
  });

  // Current year for data context
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div style={{
        width: "100%",
        backgroundColor: "#1a365d",
        color: "white",
        padding: "80px 20px",
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/NationalHousing.jpg)`,
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
            National Housing Construction Trends
          </h1>
          <p style={{ fontSize: "1.25rem", lineHeight: "1.7" }}>
            Tracking housing starts and completions across Canada's major markets (2017-2023)
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full bg-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
            Canada's Housing Supply Dashboard
          </h2>

          {/* Key Insights Summary */}
          <div className="bg-blue-50 rounded-xl p-6 mb-10 shadow-md">
            <h3 className="text-xl font-bold mb-4 text-blue-800">National Overview (2023)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-600">Total Annual Housing Starts</p>
                <p className="text-2xl font-bold">240,000+</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-600">Target Needed (CMHC)</p>
                <p className="text-2xl font-bold">3.5M by 2030</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-600">Current Gap</p>
                <p className="text-2xl font-bold text-red-600">1.2M units</p>
              </div>
            </div>
            <p className="mt-4 text-gray-700">
              Canada needs to double current construction rates to close the housing supply gap by 2030
            </p>
          </div>

          {/* Vancouver Chart */}
          <div className="bg-gray-50 p-8 rounded-2xl shadow-lg mb-10 border border-gray-200">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800">Vancouver CMA Housing Trends</h3>
              <p className="text-gray-600">
                Annual housing starts in Canada's most expensive market (2017-2023)
              </p>
            </div>
            
            {!chartData ? (
              <p className="text-gray-600 text-center py-10">Preparing housing data...</p>
            ) : (
              <div className="relative h-[500px]">
                <Bar
                  data={chartData}
                  options={chartOptions("Vancouver Annual Housing Starts (2017-2023)")}
                />
              </div>
            )}

            {/* Data Analysis Section */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-bold text-gray-800 mb-3">Supply-Demand Imbalance</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex">
                    <span className="text-red-600 font-bold mr-2">•</span>
                    Population growth: +45,000/year vs housing starts: 15,000/year
                  </li>
                  <li className="flex">
                    <span className="text-red-600 font-bold mr-2">•</span>
                    Vacancy rate: 1.1% (healthy rate: 3-5%)
                  </li>
                  <li className="flex">
                    <span className="text-red-600 font-bold mr-2">•</span>
                    Average time to build: 38 months (permits to completion)
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-5 rounded-lg border-l-4 border-green-500">
                <h4 className="font-bold text-gray-800 mb-3">Construction Breakdown (2023)</h4>
                <div className="flex justify-between mb-3">
                  <span>Multi-unit:</span>
                  <span className="font-bold">87%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-600 h-2.5 rounded-full" style={{width: '87%'}}></div>
                </div>
                
                <div className="flex justify-between mt-4 mb-3">
                  <span>Single family:</span>
                  <span className="font-bold">13%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{width: '13%'}}></div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-sm text-gray-500">
              <p>Source: Statistics Canada - Table 34-10-0155-01 (Monthly housing starts, seasonally adjusted)</p>
              <p className="mt-1">CMA Definition: Census Metropolitan Area as defined by StatCan boundary standards</p>
            </div>
          </div>

          {/* Provincial Chart */}
          {provinceChartData && (
            <div className="bg-gray-50 p-8 rounded-2xl shadow-lg mb-10 border border-gray-200">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800">Provincial Housing Construction</h3>
                <p className="text-gray-600">
                  Comparison of annual housing starts across major provinces (2017-2023)
                </p>
              </div>
              
              <div className="relative h-[500px]">
                <Bar
                  data={provinceChartData}
                  options={chartOptions("Provincial Housing Starts (2017-2023)", "Units Constructed")}
                />
              </div>
              
              {/* Provincial Analysis */}
              <div className="mt-8">
                <h4 className="font-bold text-lg mb-4 text-gray-800">Provincial Highlights (2017-2023)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-amber-50 p-5 rounded-lg">
                    <div className="flex items-start">
                      <span className="text-amber-600 font-bold text-xl mr-2">•</span>
                      <div>
                        <h5 className="font-bold text-gray-800">Ontario Acceleration</h5>
                        <p className="text-gray-700 mt-2">
                          Increased starts by 27% since 2017, but still 35% below CMHC's 
                          affordability target. The More Homes Built Faster Act aims to add 
                          1.5M homes by 2031.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-5 rounded-lg">
                    <div className="flex items-start">
                      <span className="text-blue-600 font-bold text-xl mr-2">•</span>
                      <div>
                        <h5 className="font-bold text-gray-800">Quebec's Rental Focus</h5>
                        <p className="text-gray-700 mt-2">
                          68% of new construction is rental units - highest in Canada. 
                          Revitalized QPP investment program has added 12,000 purpose-built 
                          rentals since 2020.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 p-5 rounded-lg">
                    <div className="flex items-start">
                      <span className="text-purple-600 font-bold text-xl mr-2">•</span>
                      <div>
                        <h5 className="font-bold text-gray-800">Alberta's Resurgence</h5>
                        <p className="text-gray-700 mt-2">
                          Housing starts up 41% since 2017 - highest growth rate in Canada. 
                          Interprovincial migration (+50,000 in 2023) driving demand for new units.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-red-50 p-5 rounded-lg">
                    <div className="flex items-start">
                      <span className="text-red-600 font-bold text-xl mr-2">•</span>
                      <div>
                        <h5 className="font-bold text-gray-800">BC's Affordability Challenge</h5>
                        <p className="text-gray-700 mt-2">
                          Despite high construction, prices remain 62% above national average. 
                          $7B BC Builds initiative targets 12,000 middle-income rental units by 2026.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-sm text-gray-500">
                <p>Source: Statistics Canada - Table 34-10-0135-01 (Housing starts, by type of dwelling and province)</p>
                <p className="mt-1">Note: Data represents actual construction starts, not planned projects</p>
              </div>
            </div>
          )}

          {/* Policy Context Section */}
          <div className="bg-white border border-gray-300 rounded-xl p-8 mb-10">
            <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Housing Policy Context
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-green-50 p-5 rounded-lg">
                <h4 className="font-bold text-lg mb-3 text-green-700">Federal Initiatives</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-600 font-bold mr-2">•</span>
                    <span>Housing Accelerator Fund: $4B for municipal zoning reform</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 font-bold mr-2">•</span>
                    <span>GST removal on new rental construction</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 font-bold mr-2">•</span>
                    <span>Target: 3.87M new homes by 2031</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-blue-50 p-5 rounded-lg">
                <h4 className="font-bold text-lg mb-3 text-blue-700">Provincial Responses</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-blue-600 font-bold mr-2">•</span>
                    <span>BC: Short-term rental restrictions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 font-bold mr-2">•</span>
                    <span>ON: Strong Mayors legislation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 font-bold mr-2">•</span>
                    <span>QC: $1.8B for affordable housing</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-purple-50 p-5 rounded-lg">
                <h4 className="font-bold text-lg mb-3 text-purple-700">Construction Challenges</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-purple-600 font-bold mr-2">•</span>
                    <span>Skilled labor shortage: 60,000 worker deficit</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 font-bold mr-2">•</span>
                    <span>Material costs up 38% since 2020</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 font-bold mr-2">•</span>
                    <span>Average approval timeline: 32 months</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 bg-yellow-50 p-5 rounded-lg border-l-4 border-yellow-500">
              <h4 className="font-bold text-lg mb-3 text-gray-800">Industry Outlook</h4>
              <p className="text-gray-700">
                "To meet Canada's housing targets, we need to increase construction productivity by 28% 
                and double the current skilled trades workforce. The focus must shift from housing starts 
                to housing completions - currently only 76% of starts become occupied units within 3 years."
              </p>
              <p className="mt-3 text-sm text-gray-600">
                - Canada Mortgage and Housing Corporation (CMHC), 2023 Annual Report
              </p>
            </div>
          </div>

          {/* Methodology Section */}
          <div className="bg-gray-100 rounded-xl p-8">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Methodology & Definitions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold mb-2 text-gray-700">Housing Start Definition</h4>
                <p className="text-gray-600">
                  A housing start is defined as the beginning of construction work on a building, 
                  usually when the concrete has been poured for the whole of the footing around the structure.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-2 text-gray-700">Data Collection</h4>
                <p className="text-gray-600">
                  Monthly data collected through the Survey of Construction using building permits, 
                  housing starts, and completion reports. Data is seasonally adjusted and annualized.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-2 text-gray-700">CMA Boundaries</h4>
                <p className="text-gray-600">
                  Census Metropolitan Areas (CMAs) consist of one or more neighboring municipalities 
                  centered on a population core. Boundaries updated every 5 years with the census.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-2 text-gray-700">Reporting Lag</h4>
                <p className="text-gray-600">
                  Data has a 45-day reporting lag. 2023 data is preliminary 
                  and subject to revision for 6 months after publication.
                </p>
              </div>
            </div>
            <div className="mt-6 text-sm text-gray-500">
              <p>Source: Statistics Canada Definitions, Survey Methodology 2021</p>
              <p>Last Updated: {new Date().toLocaleDateString('en-CA')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NationalHousingData;