


// import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
// import { useEffect } from "react";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import News from "./pages/News";
// import NationalHousingData from "./pages/NationalHousingData";
// import RegionalAffordability from "./pages/RegionalAffordability";
// import HousingPolicy from "./pages/HousingPolicy";
// import TenantResources from "./pages/TenantResources";
// import IndigenousHousing from "./pages/IndigenousHousing";
// import Donation from "./pages/Donation";

// function App() {
//   return (
//     <BrowserRouter>
//       <AppContent />
//     </BrowserRouter>
//   );
// }

// function AppContent() {
//   const location = useLocation();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [location.pathname]);

//   return (
//     <>
//       <Header path={location.pathname} />
//       <main>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/news" element={<News />} />
//           <Route path="/housing-policy" element={<HousingPolicy />} />
//           <Route path="/national-housing-data" element={<NationalHousingData />} />
//           <Route path="/regional-affordability" element={<RegionalAffordability />} />
//           <Route path="/tenant-resources" element={<TenantResources />} />
//           <Route path="/indigenous-housing" element={<IndigenousHousing />} />
//           <Route path="/donation" element={<Donation />} />
//         </Routes>
//       </main>
//       <Footer />
//     </>
//   );
// }

// export default App;



import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import News from "./pages/News";
import NationalHousingData from "./pages/NationalHousingData";
import RegionalAffordability from "./pages/RegionalAffordability";
import HousingPolicy from "./pages/HousingPolicy";
import TenantResources from "./pages/TenantResources";
import IndigenousHousing from "./pages/IndigenousHousing";

import Chatbot from "./components/Chatbot";

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Header path={location.pathname} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/news" element={<News />} />
          <Route path="/housing-policy" element={<HousingPolicy />} />
          <Route path="/national-housing-data" element={<NationalHousingData />} />
          <Route path="/regional-affordability" element={<RegionalAffordability />} />
          <Route path="/tenant-resources" element={<TenantResources />} />
          <Route path="/indigenous-housing" element={<IndigenousHousing />} />
          
        </Routes>
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}

export default App;