// App.tsx

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navigation from "./components/sections/Navigation";
import Footer from "./components/sections/Footer";

import HomeSection from "./components/sections/HomeSection";

import ContactPage from "./components/pages/contact";


function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* ================= HOME PAGE ================= */}

        <Route
          path="/"
          element={
            <div>

              <Navigation />

              <HomeSection />

              <Footer />

            </div>
          }
        />

        {/* ================= CONTACT PAGE ================= */}

        <Route
          path="/contact"
          element={<ContactPage />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;


// import Navigation from "./components/sections/Navigation";
// import Footer from "./components/sections/Footer";
// import HomeSection from "./components/sections/HomeSection";

// function App() {
//   return (
//     <div>

//       <Navigation />
//       <HomeSection /> 
//       <Footer />

//     </div>
//   );
// }

// export default App;
