import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Clock, Award, Calendar, Phone, ArrowLeft,
  GraduationCap, Briefcase, CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AppointmentModal from "@/components/AppointmentModal";
import SEO, { generateDoctorSchema } from "@/components/SEO";
import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;

export default function DoctorProfilePage() {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [showAppointment, setShowAppointment] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctor();
  }, [doctorId]);

  const fetchDoctor = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/doctors/${doctorId}`);
      setDoctor(response.data);
    } catch (error) {
      console.error("Error fetching doctor:", error);
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

  if (!doctor) {
    return (
      <div className="min-h-screen bg-slate-50 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Doctor not found</h1>
          <Link to="/doctors">
            <Button className="bg-purple-700 hover:bg-purple-800 text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Doctors
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <SEO 
        title={`${doctor.name} - ${doctor.title}`}
        description={`${doctor.name} is a ${doctor.title} at Sunshine Hospital with ${doctor.experience} of experience. Specializing in ${doctor.department}. Book appointment today.`}
        keywords={`${doctor.name}, ${doctor.department} doctor Sambhajinagar, specialist doctor Aurangabad, ${doctor.specializations?.join(", ") || ""}`}
        image={doctor.image}
        url={`/doctors/${doctor.id}`}
        schema={generateDoctorSchema(doctor)}
      />
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            to="/doctors" 
            className="inline-flex items-center text-purple-700 hover:text-purple-800 font-medium"
            data-testid="back-to-doctors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Doctors
          </Link>
        </div>
      </div>

      {/* Doctor Profile */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Image & Quick Info */}
            <div className="lg:col-span-1">
              <Card className="bg-white rounded-2xl overflow-hidden shadow-sm sticky top-24">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-80 object-cover object-top"
                />
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <span className="text-amber-500 font-semibold text-sm">
                      {doctor.department}
                    </span>
                    <h1 className="text-2xl font-bold text-slate-900 mt-1">
                      {doctor.name}
                    </h1>
                    <p className="text-purple-700 font-medium">
                      {doctor.title}
                    </p>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-slate-600">
                      <Award className="w-5 h-5 text-amber-500" />
                      <span>{doctor.experience} Experience</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600">
                      <Clock className="w-5 h-5 text-amber-500" />
                      <span>{doctor.schedule.timing}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600">
                      <Calendar className="w-5 h-5 text-amber-500" />
                      <span>{doctor.schedule.days.join(", ")}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Button
                      onClick={() => setShowAppointment(true)}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-5 rounded-full"
                      data-testid="profile-book-appointment"
                    >
                      Book Appointment
                    </Button>
                    <a href="tel:9130561222" className="block">
                      <Button
                        variant="outline"
                        className="w-full border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white font-semibold py-5 rounded-full"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call Hospital
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Right Column - Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <Card className="bg-white rounded-2xl shadow-sm">
                <CardContent className="p-8">
                  <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-purple-700" />
                    About Doctor
                  </h2>
                  <p className="text-slate-600 leading-relaxed">
                    {doctor.about}
                  </p>
                </CardContent>
              </Card>
              
              {/* Qualifications */}
              <Card className="bg-white rounded-2xl shadow-sm">
                <CardContent className="p-8">
                  <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-purple-700" />
                    Qualifications
                  </h2>
                  <p className="text-slate-700 font-medium">
                    {doctor.qualification}
                  </p>
                </CardContent>
              </Card>
              
              {/* Specializations */}
              <Card className="bg-white rounded-2xl shadow-sm">
                <CardContent className="p-8">
                  <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-700" />
                    Areas of Expertise
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    {doctor.specializations.map((spec, index) => (
                      <div 
                        key={index}
                        className="flex items-center gap-2 bg-purple-50 text-purple-800 px-4 py-3 rounded-lg"
                      >
                        <CheckCircle className="w-4 h-4 text-purple-600" />
                        <span className="font-medium">{spec}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Schedule */}
              <Card className="bg-white rounded-2xl shadow-sm">
                <CardContent className="p-8">
                  <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-purple-700" />
                    Consultation Schedule
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
                      <div 
                        key={day}
                        className={`text-center py-3 px-4 rounded-lg ${
                          doctor.schedule.days.includes(day)
                            ? "bg-green-50 text-green-800 border border-green-200"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        <p className="font-medium">{day}</p>
                        {doctor.schedule.days.includes(day) && (
                          <p className="text-sm">{doctor.schedule.timing}</p>
                        )}
                      </div>
                    ))}
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
          "@type": "Physician",
          "name": doctor.name,
          "image": doctor.image,
          "jobTitle": doctor.title,
          "medicalSpecialty": doctor.department,
          "worksFor": {
            "@type": "Hospital",
            "name": "Sunshine Hospital",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Chhatrapati Sambhajinagar"
            }
          }
        })}
      </script>
    </div>
  );
}
