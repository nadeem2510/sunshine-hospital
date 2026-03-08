import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  CheckCircle, Phone, MapPin, Clock, ArrowRight,
  Building2, Users, Ambulance, Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AppointmentModal from "@/components/AppointmentModal";
import SEO from "@/components/SEO";

const locationData = {
  waluj: {
    name: "Waluj",
    fullName: "Waluj MIDC",
    title: "ESIC Hospital Near Waluj MIDC",
    description: "Sunshine Hospital is the nearest ESIC empanelled hospital to Waluj MIDC industrial area. We provide 24/7 emergency care and cashless treatment for all industrial workers and their families.",
    metaDescription: "Looking for ESIC hospital near Waluj MIDC? Sunshine Hospital offers 24/7 emergency, cashless treatment for industrial workers. Just 10 mins from Waluj. Call 9130561222.",
    keywords: "ESIC hospital Waluj, hospital near Waluj MIDC, Waluj industrial area hospital, emergency hospital Waluj, cashless treatment Waluj",
    distance: "10 minutes",
    industries: ["Bajaj Auto", "Videocon", "Pharmaceutical companies", "Auto component manufacturers"],
    highlights: [
      "Nearest ESIC empanelled hospital to Waluj MIDC",
      "24/7 Emergency & Trauma Care",
      "Dedicated ESIC desk for quick processing",
      "All ESIC referrals accepted",
      "Cashless treatment for IP & family"
    ]
  },
  chikalthana: {
    name: "Chikalthana",
    fullName: "Chikalthana Industrial Area",
    title: "Hospital Near Chikalthana Industrial Area",
    description: "Conveniently located for workers from Chikalthana industrial belt, Sunshine Hospital provides comprehensive healthcare with ESIC cashless facility and 24/7 emergency services.",
    metaDescription: "Hospital near Chikalthana Aurangabad. ESIC cashless treatment, 24/7 emergency, orthopedics, trauma care. Serving Chikalthana industrial workers. Call 9130561222.",
    keywords: "hospital near Chikalthana, Chikalthana ESIC hospital, industrial hospital Aurangabad, emergency hospital Chikalthana",
    distance: "8 minutes",
    industries: ["Steel industries", "Engineering works", "Textile mills", "Food processing units"],
    highlights: [
      "Close proximity to Chikalthana industrial area",
      "ESIC dispensary referrals accepted",
      "Specialized occupational health services",
      "Quick emergency response",
      "Modern diagnostic facilities"
    ]
  },
  midc: {
    name: "MIDC",
    fullName: "MIDC Aurangabad",
    title: "Hospital for MIDC Aurangabad Workers",
    description: "Sunshine Hospital serves the entire MIDC Aurangabad region with quality healthcare. As an authorized ESIC facility, we ensure seamless cashless treatment for all industrial workers.",
    metaDescription: "MIDC Aurangabad hospital with ESIC cashless facility. Emergency care, surgery, orthopedics for industrial workers. Nearest hospital to MIDC. Call 9130561222.",
    keywords: "MIDC hospital Aurangabad, ESIC hospital MIDC, industrial area hospital, emergency hospital MIDC Aurangabad",
    distance: "12 minutes",
    industries: ["Automobile sector", "Pharma industry", "IT parks", "Manufacturing units"],
    highlights: [
      "Serving entire MIDC Aurangabad region",
      "Comprehensive ESIC services",
      "Occupational injury specialists",
      "Industrial accident trauma care",
      "Preventive health checkups for companies"
    ]
  }
};

export default function LocationPage({ location }) {
  const [showAppointment, setShowAppointment] = useState(false);
  const data = locationData[location] || locationData.waluj;

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: data.name, url: `/${location}-hospital` }
  ];

  return (
    <div className="min-h-screen">
      <SEO 
        title={data.title}
        description={data.metaDescription}
        keywords={data.keywords}
        url={`/${location}-hospital`}
        breadcrumbs={breadcrumbs}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 to-purple-100 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <CheckCircle className="w-4 h-4" />
                ESIC Empanelled Hospital
              </div>
              
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
                {data.title.split(" ").slice(0, -1).join(" ")}{" "}
                <span className="text-purple-700">{data.title.split(" ").slice(-1)}</span>
              </h1>
              
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                {data.description}
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <Button
                  onClick={() => setShowAppointment(true)}
                  className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-6 rounded-full shadow-lg"
                >
                  Book Appointment
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <a href="tel:9130561222">
                  <Button
                    variant="outline"
                    className="border-2 border-purple-700 text-purple-700 hover:bg-purple-50 font-semibold px-8 py-6 rounded-full"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Call Now
                  </Button>
                </a>
              </div>

              <div className="flex flex-wrap gap-6 text-sm text-slate-600">
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-500" />
                  Only {data.distance} from {data.fullName}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-500" />
                  24/7 Emergency
                </span>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://customer-assets.emergentagent.com/job_esic-cashless-med/artifacts/29y24j9j_Hospital%20Building%20Exterior.png"
                alt={`Sunshine Hospital near ${data.name}`}
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Ambulance className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Distance</p>
                    <p className="font-bold text-slate-900">{data.distance}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Why {data.name} Workers Choose Sunshine Hospital
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.highlights.map((highlight, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-purple-700" />
                    </div>
                    <p className="text-slate-700 font-medium">{highlight}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">
            Industries We Serve in {data.fullName}
          </h2>
          <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
            We provide healthcare services to workers from all major industries in the {data.name} area
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.industries.map((industry, index) => (
              <div key={index} className="bg-white rounded-xl p-4 text-center shadow-sm">
                <Building2 className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-slate-700 font-medium text-sm">{industry}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ESIC Services */}
      <section className="py-16 bg-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                ESIC Cashless Treatment for {data.name} Workers
              </h2>
              <p className="text-purple-200 mb-8">
                As an authorized ESIC empanelled hospital, we provide 100% cashless treatment 
                for all insured persons (IP) and their dependents from {data.fullName}.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-amber-400" />
                  <span>E-Pehchan card accepted</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-amber-400" />
                  <span>Family members covered</span>
                </div>
                <div className="flex items-center gap-3">
                  <Ambulance className="w-6 h-6 text-amber-400" />
                  <span>Emergency cases - no referral needed</span>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-white/10 rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-4">Need ESIC Treatment?</h3>
                <p className="text-purple-200 mb-6">
                  Call our ESIC desk for instant guidance
                </p>
                <a href="tel:9130561222">
                  <Button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-6 rounded-full text-lg">
                    <Phone className="w-5 h-5 mr-2" />
                    9130 561 222
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Visit Sunshine Hospital Today
          </h2>
          <p className="text-slate-600 mb-8">
            Located at Satara Parisar, Beed Bypass Road - just {data.distance} from {data.fullName}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setShowAppointment(true)}
              className="bg-purple-700 hover:bg-purple-800 text-white font-semibold px-8 py-6 rounded-full"
            >
              Book Appointment
            </Button>
            <a href="https://maps.google.com/?q=Sunshine+Hospital+Satara+Parisar+Aurangabad" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                className="border-2 border-purple-700 text-purple-700 hover:bg-purple-50 font-semibold px-8 py-6 rounded-full"
              >
                <MapPin className="w-5 h-5 mr-2" />
                Get Directions
              </Button>
            </a>
          </div>
        </div>
      </section>

      <AppointmentModal 
        isOpen={showAppointment} 
        onClose={() => setShowAppointment(false)} 
      />
    </div>
  );
}

// Export individual location pages
export function WalujHospitalPage() {
  return <LocationPage location="waluj" />;
}

export function ChikalthanaHospitalPage() {
  return <LocationPage location="chikalthana" />;
}

export function MIDCHospitalPage() {
  return <LocationPage location="midc" />;
}
