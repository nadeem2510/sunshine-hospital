import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  HeartPulse, Stethoscope, Bone, Activity, Ambulance,
  ArrowRight, CheckCircle, Phone, MapPin, Clock,
  Shield, Award, Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AppointmentModal from "@/components/AppointmentModal";
import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;

const iconMap = {
  HeartPulse: HeartPulse,
  Stethoscope: Stethoscope,
  Bone: Bone,
  Activity: Activity,
  Ambulance: Ambulance,
};

const stats = [
  { number: "15+", label: "Years Experience" },
  { number: "10,000+", label: "Patients Treated" },
  { number: "1000+", label: "Surgeries Done" },
  { number: "24/7", label: "Emergency Care" },
];

const whyChooseUs = [
  {
    icon: Shield,
    title: "ESIC Empanelled",
    description: "Authorized ESIC cashless treatment facility for industrial workers"
  },
  {
    icon: Award,
    title: "Expert Specialists",
    description: "Team of experienced doctors across multiple specialties"
  },
  {
    icon: Users,
    title: "Patient-Centric Care",
    description: "Compassionate care with focus on patient comfort and recovery"
  },
];

export default function HomePage() {
  const [showAppointment, setShowAppointment] = useState(false);
  const [services, setServices] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [servicesRes, doctorsRes] = await Promise.all([
        axios.get(`${API_URL}/api/services`),
        axios.get(`${API_URL}/api/doctors`),
      ]);
      setServices(servicesRes.data);
      setDoctors(doctorsRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-pattern bg-gradient-to-br from-slate-50 to-purple-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <CheckCircle className="w-4 h-4" />
                ESIC Empanelled Hospital
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
                Fair With{" "}
                <span className="gradient-text">Quality Care</span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
                Sunshine Hospital is Chhatrapati Sambhajinagar's trusted multispecialty hospital 
                offering advanced medical care with compassion. We are an authorized ESIC cashless 
                treatment facility serving Waluj, Chikalthana, and surrounding industrial areas.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => setShowAppointment(true)}
                  className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-6 rounded-full shadow-lg hover:scale-105 transition-transform text-lg"
                  data-testid="hero-book-appointment-btn"
                >
                  Book Appointment
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Link to="/esic-cashless-treatment-sambhajinagar">
                  <Button
                    variant="outline"
                    className="border-2 border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white font-semibold px-8 py-6 rounded-full text-lg w-full sm:w-auto"
                    data-testid="hero-esic-btn"
                  >
                    ESIC Inquiry
                  </Button>
                </Link>
              </div>
              
              {/* Contact Quick Info */}
              <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-600">
                <a href="tel:9130561222" className="flex items-center gap-2 hover:text-purple-700 transition-colors">
                  <Phone className="w-4 h-4 text-amber-500" />
                  91305 61222
                </a>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-500" />
                  24/7 Emergency
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-500" />
                  Satara Parisar
                </span>
              </div>
            </div>
            
            {/* Hero Image */}
            <div className="relative animate-fade-in-up stagger-2">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://customer-assets.emergentagent.com/job_esic-cashless-med/artifacts/ecs8c3fa_hospital%20front%20view.jpeg"
                  alt="Sunshine Hospital Building - Chhatrapati Sambhajinagar"
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent" />
              </div>
              
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl animate-pulse-glow">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Emergency</p>
                    <p className="font-bold text-purple-800">91305 61222</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-purple-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl md:text-5xl font-extrabold text-amber-400 mb-2">
                  {stat.number}
                </p>
                <p className="text-purple-200 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Our Medical Specialties
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Comprehensive healthcare services across multiple specialties with state-of-the-art facilities
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 5).map((service, index) => {
              const IconComponent = iconMap[service.icon] || Activity;
              return (
                <Link to={`/services/${service.slug}`} key={service.id}>
                  <Card 
                    className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full"
                    data-testid={`service-card-${service.slug}`}
                  >
                    <CardContent className="p-0">
                      <div className="service-icon mb-4">
                        <IconComponent className="w-7 h-7 text-purple-700" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-purple-700 transition-colors">
                        {service.name}
                      </h3>
                      <p className="text-slate-600 text-sm mb-4">
                        {service.short_description}
                      </p>
                      <span className="inline-flex items-center text-purple-700 font-semibold text-sm group-hover:gap-2 transition-all">
                        Learn More <ArrowRight className="w-4 h-4 ml-1" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/services">
              <Button
                variant="outline"
                className="border-2 border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white font-semibold px-8 py-3 rounded-full"
                data-testid="view-all-services-btn"
              >
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ESIC Banner */}
      <section className="py-16 bg-gradient-to-r from-purple-800 to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <CheckCircle className="w-4 h-4" />
                Authorized ESIC Facility
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                ESIC Cashless Treatment in Sambhajinagar
              </h2>
              <p className="text-purple-200 text-lg mb-6">
                We provide seamless cashless treatment for all ESIC beneficiaries working in 
                Waluj, Chikalthana, MIDC, and other industrial areas. No upfront payment required 
                for eligible patients.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                {["Waluj", "Chikalthana", "MIDC Area", "Cidco", "Satara"].map((area) => (
                  <span key={area} className="bg-purple-700/50 text-purple-100 px-4 py-2 rounded-full text-sm">
                    {area}
                  </span>
                ))}
              </div>
              <Link to="/esic-cashless-treatment-sambhajinagar">
                <Button
                  className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-6 rounded-full shadow-lg text-lg"
                  data-testid="esic-learn-more-btn"
                >
                  Learn About ESIC Process
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <img
                src="https://customer-assets.emergentagent.com/job_esic-cashless-med/artifacts/p9gfbhd5_hospital%20reception%20view.jpeg"
                alt="Sunshine Hospital Reception"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Choose Sunshine Hospital?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Trusted by thousands of families in Chhatrapati Sambhajinagar for quality healthcare
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow"
              >
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-purple-700" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Meet Our Expert Doctors
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Experienced specialists committed to providing the best medical care
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {doctors.map((doctor) => (
              <Link to={`/doctors/${doctor.id}`} key={doctor.id}>
                <Card 
                  className="doctor-card group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-all"
                  data-testid={`doctor-card-${doctor.id}`}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="doctor-image"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-900/80 to-transparent p-4">
                      <span className="text-amber-400 font-semibold text-sm">
                        {doctor.department}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-purple-700 transition-colors">
                      {doctor.name}
                    </h3>
                    <p className="text-purple-700 font-medium mb-3">{doctor.title}</p>
                    <p className="text-slate-600 text-sm mb-4">{doctor.qualification}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">
                        {doctor.experience} Experience
                      </span>
                      <span className="text-purple-700 font-semibold text-sm group-hover:underline">
                        View Profile
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/doctors">
              <Button
                variant="outline"
                className="border-2 border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white font-semibold px-8 py-3 rounded-full"
                data-testid="view-all-doctors-btn"
              >
                View All Doctors
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-amber-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Need Medical Assistance?
          </h2>
          <p className="text-amber-100 text-lg mb-8">
            Our team is available 24/7 for emergencies. Book an appointment or call us now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setShowAppointment(true)}
              className="bg-purple-800 hover:bg-purple-900 text-white font-semibold px-8 py-6 rounded-full shadow-lg text-lg"
              data-testid="cta-book-appointment-btn"
            >
              Book Appointment
            </Button>
            <a href="tel:9130561222">
              <Button
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-amber-600 font-semibold px-8 py-6 rounded-full text-lg"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call: 91305 61222
              </Button>
            </a>
          </div>
        </div>
      </section>

      <AppointmentModal open={showAppointment} onOpenChange={setShowAppointment} />
    </div>
  );
}
