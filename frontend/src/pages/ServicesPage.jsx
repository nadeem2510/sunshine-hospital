import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  HeartPulse, Stethoscope, Bone, Activity, Ambulance,
  ArrowRight, CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AppointmentModal from "@/components/AppointmentModal";
import SEO from "@/components/SEO";
import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;

const iconMap = {
  HeartPulse: HeartPulse,
  Stethoscope: Stethoscope,
  Bone: Bone,
  Activity: Activity,
  Ambulance: Ambulance,
};

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [showAppointment, setShowAppointment] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/services`);
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <SEO 
        title="Medical Services - ICU, Trauma, Surgery, Orthopedics"
        description="Comprehensive medical services at Sunshine Hospital Sambhajinagar. ICU, trauma care, orthopedic surgery, general surgery, 24/7 emergency services. ESIC cashless treatment available."
        keywords="hospital services Sambhajinagar, ICU Aurangabad, trauma center, orthopedic surgery, general surgery, emergency services, medical services"
        url="/services"
      />
      {/* Hero Section */}
      <section className="bg-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
              Our Medical <span className="text-purple-700">Services</span>
            </h1>
            <p className="text-lg text-slate-600">
              Comprehensive healthcare services across multiple specialties. From emergency 
              trauma care to advanced surgical procedures, we provide complete medical solutions 
              under one roof.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="bg-slate-100 rounded-2xl h-[400px] animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => {
                const IconComponent = iconMap[service.icon] || Activity;
                return (
                  <Card 
                    key={service.id}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    data-testid={`service-page-card-${service.slug}`}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <div className="w-12 h-12 bg-white/90 rounded-xl flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-purple-700" />
                        </div>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-purple-700 transition-colors">
                        {service.name}
                      </h3>
                      <p className="text-slate-600 text-sm mb-4">
                        {service.short_description}
                      </p>
                      
                      <ul className="space-y-2 mb-6">
                        {service.features.slice(0, 3).map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-slate-600">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      <Link to={`/services/${service.slug}`}>
                        <Button
                          variant="outline"
                          className="w-full border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white rounded-full"
                          data-testid={`learn-more-${service.slug}`}
                        >
                          Learn More
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ESIC Banner */}
      <section className="py-16 bg-gradient-to-r from-purple-800 to-purple-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <CheckCircle className="w-4 h-4" />
            ESIC Empanelled
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            All Services Available Under ESIC Cashless
          </h2>
          <p className="text-purple-200 text-lg mb-8">
            As an authorized ESIC facility, all our services are available for cashless 
            treatment for eligible beneficiaries.
          </p>
          <Link to="/esic-cashless-treatment-sambhajinagar">
            <Button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-6 rounded-full shadow-lg text-lg">
              Learn About ESIC Process
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-amber-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Need Medical Care?
          </h2>
          <p className="text-amber-100 text-lg mb-8">
            Book an appointment with our specialists or call us for emergency care.
          </p>
          <Button
            onClick={() => setShowAppointment(true)}
            className="bg-purple-800 hover:bg-purple-900 text-white font-semibold px-8 py-6 rounded-full shadow-lg text-lg"
            data-testid="services-book-appointment"
          >
            Book Appointment Now
          </Button>
        </div>
      </section>

      <AppointmentModal open={showAppointment} onOpenChange={setShowAppointment} />
    </div>
  );
}
