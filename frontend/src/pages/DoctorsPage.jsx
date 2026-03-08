import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Clock, Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AppointmentModal from "@/components/AppointmentModal";
import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [showAppointment, setShowAppointment] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/doctors`);
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-purple-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
              Our Expert <span className="text-purple-700">Medical Team</span>
            </h1>
            <p className="text-lg text-slate-600">
              Meet our team of experienced specialists dedicated to providing exceptional 
              healthcare. Each doctor brings years of expertise and a commitment to patient care.
            </p>
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid md:grid-cols-2 gap-8">
              {[1, 2].map((i) => (
                <div key={i} className="bg-slate-100 rounded-2xl h-[500px] animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {doctors.map((doctor) => (
                <Card 
                  key={doctor.id}
                  className="doctor-card group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300"
                  data-testid={`doctor-page-card-${doctor.id}`}
                >
                  <div className="grid md:grid-cols-5">
                    {/* Image */}
                    <div className="md:col-span-2 relative overflow-hidden">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-full h-64 md:h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-900/80 to-transparent p-4 md:hidden">
                        <span className="text-amber-400 font-semibold">
                          {doctor.department}
                        </span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <CardContent className="md:col-span-3 p-6 md:p-8 flex flex-col">
                      <div className="hidden md:block mb-2">
                        <span className="text-amber-500 font-semibold text-sm">
                          {doctor.department}
                        </span>
                      </div>
                      
                      <h2 className="text-2xl font-bold text-slate-900 mb-1 group-hover:text-purple-700 transition-colors">
                        {doctor.name}
                      </h2>
                      <p className="text-purple-700 font-medium mb-4">
                        {doctor.title}
                      </p>
                      
                      <p className="text-slate-600 text-sm mb-4">
                        {doctor.qualification}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {doctor.specializations.slice(0, 3).map((spec, index) => (
                          <span 
                            key={index}
                            className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs font-medium"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-slate-600 mb-6">
                        <span className="flex items-center gap-1">
                          <Award className="w-4 h-4 text-amber-500" />
                          {doctor.experience}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-amber-500" />
                          {doctor.schedule.timing}
                        </span>
                      </div>
                      
                      <p className="text-slate-600 text-sm mb-6 line-clamp-3">
                        {doctor.about}
                      </p>
                      
                      <div className="mt-auto flex gap-3">
                        <Link to={`/doctors/${doctor.id}`} className="flex-1">
                          <Button
                            variant="outline"
                            className="w-full border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white rounded-full"
                            data-testid={`view-profile-${doctor.id}`}
                          >
                            View Profile
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                        <Button
                          onClick={() => setShowAppointment(true)}
                          className="flex-1 bg-amber-500 hover:bg-amber-600 text-white rounded-full"
                          data-testid={`book-with-${doctor.id}`}
                        >
                          Book Appointment
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-amber-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Consult Our Specialists?
          </h2>
          <p className="text-amber-100 text-lg mb-8">
            Book an appointment today and get expert medical advice from our experienced doctors.
          </p>
          <Button
            onClick={() => setShowAppointment(true)}
            className="bg-purple-800 hover:bg-purple-900 text-white font-semibold px-8 py-6 rounded-full shadow-lg text-lg"
            data-testid="doctors-page-book-btn"
          >
            Book Appointment Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      <AppointmentModal open={showAppointment} onOpenChange={setShowAppointment} />
    </div>
  );
}
