import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

// Pages
import HomePage from "@/pages/HomePage";
import ESICPage from "@/pages/ESICPage";
import DoctorsPage from "@/pages/DoctorsPage";
import DoctorProfilePage from "@/pages/DoctorProfilePage";
import ServicesPage from "@/pages/ServicesPage";
import ServiceDetailPage from "@/pages/ServiceDetailPage";
import ContactPage from "@/pages/ContactPage";
import ThankYouPage from "@/pages/ThankYouPage";

// Layout
import Layout from "@/components/Layout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="esic-cashless-treatment-sambhajinagar" element={<ESICPage />} />
            <Route path="doctors" element={<DoctorsPage />} />
            <Route path="doctors/:doctorId" element={<DoctorProfilePage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="services/:serviceSlug" element={<ServiceDetailPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="thank-you" element={<ThankYouPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;
