import Navigation from "./components/sections/Navigation";
import HeroSection from "./components/sections/HeroSection";
import CertificationSection from "./components/sections/CertificationSection";
import ClientsSection from "./components/sections/ClientsSection";
import ServicesSection from "./components/sections/ServicesSection";
import ContactSection from "./components/sections/ContactSection";
import Footer from "./components/sections/Footer";

function App() {
  return (
    <div>

      <Navigation />

      <HeroSection />

      <CertificationSection />

      <ClientsSection />

      <ServicesSection />

      {/* <ContactSection /> */}

      <Footer />

    </div>
  );
}

export default App;