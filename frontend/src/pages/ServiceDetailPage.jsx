import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, CheckCircle, Phone, Calendar,
  HeartPulse, Stethoscope, Bone, Activity, Ambulance
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AppointmentModal from "@/components/AppointmentModal";
import SEO, { generateServiceSchema } from "@/components/SEO";
import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;

const iconMap = {
  HeartPulse: HeartPulse,
  Stethoscope: Stethoscope,
  Bone: Bone,
  Activity: Activity,
  Ambulance: Ambulance,
};

export default function ServiceDetailPage() {
  const { serviceSlug } = useParams();
  const [service, setService] = useState(null);
  const [showAppointment, setShowAppointment] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchService();
  }, [serviceSlug]);

  const fetchService = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/services/${serviceSlug}`);
      setService(response.data);
    } catch (error) {
      console.error("Error fetching service:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl h-[600px] animate-pulse" />
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-slate-50 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Service not found</h1>
          <Link to="/services">
            <Button className="bg-purple-700 hover:bg-purple-800 text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Services
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = iconMap[service.icon] || Activity;

  return (
    <div className="min-h-screen bg-slate-50">
      <SEO 
        title={`${service.name} - Medical Services`}
        description={service.description}
        keywords={`${service.name} Sambhajinagar, ${service.name} hospital Aurangabad, ${service.slug} treatment, medical services`}
        image={service.image}
        url={`/services/${service.slug}`}
        schema={generateServiceSchema(service)}
      />
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            to="/services" 
            className="inline-flex items-center text-purple-700 hover:text-purple-800 font-medium"
            data-testid="back-to-services"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="relative">
        <div className="h-64 md:h-80 relative overflow-hidden">
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-purple-900/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="max-w-7xl mx-auto">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <IconComponent className="w-8 h-8 text-purple-700" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                {service.name}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <Card className="bg-white rounded-2xl shadow-sm">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    About This Service
                  </h2>
                  <p className="text-slate-600 leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>

              {/* Features */}
              <Card className="bg-white rounded-2xl shadow-sm">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">
                    Key Features & Facilities
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {service.features.map((feature, index) => (
                      <div 
                        key={index}
                        className="flex items-start gap-3 bg-purple-50 rounded-xl p-4"
                      >
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* ESIC Info */}
              <Card className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-sm border-green-200">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-green-800 mb-2">
                        Available Under ESIC Cashless
                      </h3>
                      <p className="text-green-700">
                        This service is covered under ESIC cashless treatment for eligible 
                        beneficiaries. Bring your E-Pehchan card and referral letter to 
                        avail cashless treatment.
                      </p>
                      <Link to="/esic-cashless-treatment-sambhajinagar" className="inline-block mt-4">
                        <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full">
                          Learn About ESIC Process
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="bg-white rounded-2xl shadow-sm sticky top-24">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">
                    Book a Consultation
                  </h3>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3 text-slate-600">
                      <Calendar className="w-5 h-5 text-amber-500" />
                      <span>Available Mon-Sat, 10 AM - 8 PM</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600">
                      <Phone className="w-5 h-5 text-amber-500" />
                      <span>24/7 Emergency Care</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Button
                      onClick={() => setShowAppointment(true)}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-5 rounded-full"
                      data-testid="service-book-appointment"
                    >
                      Book Appointment
                    </Button>
                    <a href="tel:9130561222" className="block">
                      <Button
                        variant="outline"
                        className="w-full border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white font-semibold py-5 rounded-full"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call: 91305 61222
                      </Button>
                    </a>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-slate-200">
                    <h4 className="font-semibold text-slate-900 mb-3">Location</h4>
                    <p className="text-slate-600 text-sm">
                      Plot No 7, Gut 36, Satara Parisar,<br />
                      Opp Patel Lawns, Beed Bypass Road,<br />
                      Chh. Sambhajinagar - 431001
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <AppointmentModal open={showAppointment} onOpenChange={setShowAppointment} />

      {/* Schema Markup */}
      <script type="application/ld+json" className="schema-markup">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalSpecialty",
          "name": service.name,
          "description": service.description,
          "provider": {
            "@type": "Hospital",
            "name": "Sunshine Hospital",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Chhatrapati Sambhajinagar",
              "addressRegion": "Maharashtra"
            }
          }
        })}
      </script>
    </div>
  );
}
