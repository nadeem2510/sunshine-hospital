import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Phone, Calendar, Award, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const API_URL = process.env.REACT_APP_BACKEND_URL;

export default function MeetTheExperts({ 
  specialty, 
  title = "Meet Our Experts",
  subtitle = "World-class specialists dedicated to your care",
  onBookAppointment 
}) {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Map specialty slugs to department names
  const specialtyToDepartment = {
    "knee-replacement": ["Orthopedics"],
    "hip-replacement": ["Orthopedics"],
    "spine-surgery": ["Orthopedics"],
    "cancer-care": ["General Surgery", "Oncology"],
    "orthopedics": ["Orthopedics"],
    "general-surgery": ["General Surgery"],
    "cardiology": ["Cardiology"],
    "general-medicine": ["General Medicine"],
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`${API_URL}/api/doctors`);
        if (response.ok) {
          const allDoctors = await response.json();
          
          // Filter doctors by specialty/department
          const targetDepartments = specialtyToDepartment[specialty] || [];
          const filteredDoctors = allDoctors.filter(doc => 
            targetDepartments.some(dept => 
              doc.department?.toLowerCase().includes(dept.toLowerCase()) ||
              doc.specializations?.some(s => 
                targetDepartments.some(td => s.toLowerCase().includes(td.toLowerCase()))
              )
            )
          );
          
          setDoctors(filteredDoctors.length > 0 ? filteredDoctors : allDoctors.slice(0, 3));
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [specialty]);

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="h-10 bg-slate-200 rounded w-1/3 mx-auto" />
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-80 bg-slate-200 rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (doctors.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white" data-testid="meet-experts-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor) => (
            <Card 
              key={doctor.id} 
              className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300"
              data-testid={`doctor-card-${doctor.id}`}
            >
              <div className="relative">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-64 object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl font-bold">{doctor.name}</h3>
                  <p className="text-amber-400 text-sm font-medium">{doctor.title}</p>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Award className="w-4 h-4 text-purple-600" />
                    {doctor.qualification}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-slate-600 mb-4">
                  <Clock className="w-4 h-4 text-purple-600" />
                  {doctor.experience}
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {doctor.specializations?.slice(0, 3).map((spec, idx) => (
                    <span 
                      key={idx}
                      className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Link to={`/doctors/${doctor.id}`} className="flex-1">
                    <Button 
                      variant="outline" 
                      className="w-full border-purple-600 text-purple-700 hover:bg-purple-50"
                    >
                      View Profile
                    </Button>
                  </Link>
                  <Button 
                    onClick={onBookAppointment}
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold"
                  >
                    <Calendar className="w-4 h-4 mr-1" />
                    Book
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-slate-600 mb-4">
            Need help choosing the right specialist?
          </p>
          <a href="tel:9130561222" className="inline-flex items-center gap-2 text-purple-700 font-semibold hover:text-purple-800 transition-colors">
            <Phone className="w-5 h-5" />
            Call us at 9130 561 222
          </a>
        </div>
      </div>
    </section>
  );
}
