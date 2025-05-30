# Canadian Housing Data Hub

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2-blue)](https://react.dev/)
[![Chart.js](https://img.shields.io/badge/Chart.js-4.4-green)](https://www.chartjs.org/)

> A civic-tech platform transforming complex housing data into actionable insights for Canadians

This full-stack application visualizes Canadian housing statistics to promote data literacy and civic engagement. Built for GLOCAL's mission, it combines interactive dashboards with policy education tools to empower tenants, researchers, and activists.



## ✨ Features
- **Interactive Housing Dashboards**: Explore rent prices, vacancy rates, and affordability metrics
- **Localized Insights**: Filter data by province, city, or political riding
- **Policy Education Hub**: Understand housing legislation and tenant rights
- **AI Housing Assistant**: Chatbot powered by Google Gemini API
- **Civic Action Tools**: Contact MPs, generate petitions, find tenant unions
- **Indigenous Housing Data**: Dedicated section for First Nations housing metrics

## 🧰 Tech Stack
| Component              | Technology                          |
|------------------------|-------------------------------------|
| **Frontend**           | React 18, Chart.js 4, Tailwind CSS  |
| **Backend**            | Node.js 20, Express 4, REST API     |
| **AI Integration**     | Google Gemini API                   |
| **Hosting**            | Render (Backend), GitHub Pages (Frontend) |
| **Data Sources**       | CMHC, Statistics Canada, Bank of Canada |

## 📂 Repository Structure


## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Google Gemini API key
- StatCan API key Vector ID's

### Installation
```bash
# Clone repository
git clone https://github.com/danielajen/CanadianHousingData.git
cd CanadianHousingData

# Install backend dependencies
cd  backend
node server

# Install frontend dependencies
cd ..
npm install

```

# 📊 Data Sources & Integration

## 🏢 Statistics Canada Integration (Node.js)

```javascript
// server/routes/statcan.js
app.get('/api/statcan/housing-prices', async (req, res) => {
  const response = await fetch('https://api.statcan.gc.ca/census-recensement/profile/sdmx/rest/data/34100127', {
    headers: { 'Authorization': `Bearer ${process.env.STATCAN_API_KEY}` }
  });
  const data = await response.json();
  // Process data for Chart.js visualization
  res.json(data);
});
```

### 3. Data Table STATSCAN

```markdown
| Table ID    | Dataset Name             | Frequency | Coverage           | Key Metrics                 |
|-------------|--------------------------|-----------|--------------------|-----------------------------|
| **34100127** | Housing Price Statistics | Monthly   | National/Provincial | Price indices, YoY changes  |
| **46100074** | Rental Market Survey     | Quarterly | 37 CMAs            | Average rent, vacancy rates |
```

## 📈 Application Overview

The **Canadian Housing Data Hub** is a civic-tech platform that transforms complex housing data into accessible insights. Our mission is to empower Canadians with:

| Core Function         | Description                                                                 |
|-----------------------|-----------------------------------------------------------------------------|
| **Data Simplification** | Makes Canadian housing data approachable and understandable for all users  |
| **Interactive Tools** | Provides dynamic dashboards for exploring housing trends and patterns       |
| **Education**         | Offers curated content to explain housing market dynamics                   |
| **Action Platform**   | Equips users with tools to engage with housing advocacy and policy issues   |

Key Objectives:
- Democratize access to housing market intelligence
- Visualize trends through engaging data experiences
- Bridge the gap between complex statistics and public understanding
- Foster informed discussions on housing affordability
