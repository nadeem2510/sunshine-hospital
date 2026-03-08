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
import BlogPage from "@/pages/BlogPage";
import BlogDetailPage from "@/pages/BlogDetailPage";

// Admin Pages
import AdminBlogList from "@/pages/admin/AdminBlogList";
import AdminBlogEditor from "@/pages/admin/AdminBlogEditor";

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
            <Route path="blog" element={<BlogPage />} />
            <Route path="blog/:slug" element={<BlogDetailPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="thank-you" element={<ThankYouPage />} />
          </Route>
          {/* Admin Routes (without main layout) */}
          <Route path="/admin/blog" element={<AdminBlogList />} />
          <Route path="/admin/blog/new" element={<AdminBlogEditor />} />
          <Route path="/admin/blog/edit/:slug" element={<AdminBlogEditor />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;
