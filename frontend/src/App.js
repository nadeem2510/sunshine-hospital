import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

// Pages
import HomePage from "@/pages/HomePage";
import ESICPage from "@/pages/ESICPage";
import MJPJAYPage from "@/pages/MJPJAYPage";
import InsurancePage from "@/pages/InsurancePage";
import DoctorsPage from "@/pages/DoctorsPage";
import DoctorProfilePage from "@/pages/DoctorProfilePage";
import ServicesPage from "@/pages/ServicesPage";
import ServiceDetailPage from "@/pages/ServiceDetailPage";
import ContactPage from "@/pages/ContactPage";
import ThankYouPage from "@/pages/ThankYouPage";
import BlogPage from "@/pages/BlogPage";
import BlogDetailPage from "@/pages/BlogDetailPage";

// Admin Pages
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminBlogList from "@/pages/admin/AdminBlogList";
import AdminBlogEditor from "@/pages/admin/AdminBlogEditor";

// Layout
import Layout from "@/components/Layout";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="esic-cashless-treatment-sambhajinagar" element={<ESICPage />} />
              <Route path="mjpjay-pmjay" element={<MJPJAYPage />} />
              <Route path="cashless-insurance" element={<InsurancePage />} />
              <Route path="doctors" element={<DoctorsPage />} />
              <Route path="doctors/:doctorId" element={<DoctorProfilePage />} />
              <Route path="services" element={<ServicesPage />} />
              <Route path="services/:serviceSlug" element={<ServiceDetailPage />} />
              <Route path="blog" element={<BlogPage />} />
              <Route path="blog/:slug" element={<BlogDetailPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="thank-you" element={<ThankYouPage />} />
            </Route>
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/blog" element={
              <ProtectedRoute>
                <AdminBlogList />
              </ProtectedRoute>
            } />
            <Route path="/admin/blog/new" element={
              <ProtectedRoute>
                <AdminBlogEditor />
              </ProtectedRoute>
            } />
            <Route path="/admin/blog/edit/:slug" element={
              <ProtectedRoute>
                <AdminBlogEditor />
              </ProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;
