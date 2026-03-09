import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  CheckCircle, Phone, Calendar, ArrowRight, Award,
  Clock, Users, Shield, Star, Play, ChevronRight,
  Activity, Heart, Bone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import AppointmentModal from "@/components/AppointmentModal";
import SEO, { generateFAQSchema, generateHubSchema } from "@/components/SEO";
import StickyBookingCTA from "@/components/StickyBookingCTA";
import RecoveryTimeline from "@/components/RecoveryTimeline";
import MeetTheExperts from "@/components/MeetTheExperts";

const API_URL = process.env.REACT_APP_BACKEND_URL;

// Hub Data
const hubData = {
  title: "Knee Replacement Center",
  subtitle: "Advanced Joint Care Excellence",
  description: "Sunshine Hospital's Knee Replacement Center offers world-class orthopedic care with experienced surgeons, modern techniques, and comprehensive rehabilitation for lasting mobility.",
  heroImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200",
  // Schema data
  url: "/knee-replacement",
  name: "Knee Replacement Surgery",
  alternateName: "Total Knee Arthroplasty",
  medicalSpecialtyType: "Orthopedic",
  parentSpecialty: "Orthopedics",
  bodyLocation: "Knee Joint",
  rating: { value: "4.9", count: "180" },
  stats: [
    { value: "300+", label: "Joint Replacements", icon: Award },
    { value: "98%", label: "Success Rate", icon: Star },
    { value: "15+", label: "Years Experience", icon: Clock },
    { value: "100%", label: "ESIC Cashless", icon: Shield },
  ],
  procedures: [
    {
      name: "Total Knee Replacement",
      slug: "total-knee-replacement",
      description: "Complete replacement of damaged knee joint with artificial implants for severe arthritis.",
      duration: "2-3 hours",
      recovery: "6-8 weeks",
      bodyLocation: "Knee Joint",
      howPerformed: "Damaged cartilage and bone are removed and replaced with metal and plastic components",
      preparation: "Pre-operative blood tests, ECG, X-rays, and medical clearance",
      followup: "Physiotherapy starting from day 1, regular follow-ups at 2 weeks, 6 weeks, 3 months",
      ageRange: "55-85",
      outcome: "Pain-free mobility and improved quality of life",
    },
    {
      name: "Partial Knee Replacement",
      slug: "partial-knee-replacement", 
      description: "Targeted replacement of only the damaged portion, preserving healthy bone and ligaments.",
      duration: "1-2 hours",
      recovery: "4-6 weeks",
      bodyLocation: "Knee Joint (partial)",
      howPerformed: "Only the damaged compartment of the knee is replaced, preserving healthy tissue",
      ageRange: "50-75",
    },
    {
      name: "Knee Revision Surgery",
      slug: "knee-revision-surgery",
      description: "Replacement of worn or failed knee implants with new components.",
      duration: "3-4 hours",
      recovery: "8-12 weeks",
      bodyLocation: "Knee Joint",
      howPerformed: "Removal of existing implants and replacement with new components",
      ageRange: "60-80",
    },
  ],
  conditions: [
    { name: "Osteoarthritis", description: "Wear-and-tear arthritis causing knee pain and stiffness" },
    { name: "Rheumatoid Arthritis", description: "Autoimmune condition affecting knee joints" },
    { name: "Post-Traumatic Arthritis", description: "Arthritis developing after knee injury" },
    { name: "Avascular Necrosis", description: "Bone death due to reduced blood supply" },
  ],
  faqs: [
    { 
      question: "What is the cost of knee replacement surgery in Sambhajinagar?",
      answer: "Knee replacement surgery at Sunshine Hospital is available at affordable rates. ESIC, MJPJAY, and PMJAY patients receive 100% cashless treatment. For self-pay patients, we offer competitive pricing and EMI options. Contact us for a detailed cost estimate."
    },
    {
      question: "How long does knee replacement surgery take?",
      answer: "Total knee replacement surgery typically takes 2-3 hours. You'll be in the hospital for 3-5 days. Most patients can walk with support within 24-48 hours after surgery."
    },
    {
      question: "What is the success rate of knee replacement?",
      answer: "At Sunshine Hospital, we have a 98% success rate for knee replacement surgeries. Over 300 successful joint replacements have been performed by our experienced orthopedic team."
    },
    {
      question: "Is knee replacement covered under ESIC?",
      answer: "Yes, knee replacement surgery is fully covered under ESIC at Sunshine Hospital. Bring your E-Pehchan card and referral letter for cashless admission."
    },
    {
      question: "How long do knee implants last?",
      answer: "Modern knee implants typically last 15-20 years or more with proper care. Our surgeons use high-quality implants from trusted manufacturers."
    },
  ],
};

// Recovery Timeline Data
const recoverySteps = [
  { day: "Day 1-2", title: "Hospital Recovery", description: "Walking with walker support, pain management, physiotherapy begins" },
  { day: "Week 1-2", title: "Home Recovery", description: "Daily exercises, reduced swelling, walking with support increases" },
  { day: "Week 3-4", title: "Increased Mobility", description: "Walking longer distances, climbing stairs, reduced pain medication" },
  { day: "Week 6-8", title: "Return to Normal", description: "Most daily activities resumed, continued strengthening exercises" },
  { day: "Month 3-6", title: "Full Recovery", description: "Complete healing, return to work, active lifestyle restored" },
];

export default function KneeReplacementHub() {
  const [showAppointment, setShowAppointment] = useState(false);

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Knee Replacement", url: "/knee-replacement" }
  ];

  return (
    <div className="min-h-screen">
      <SEO 
        title="Knee Replacement Surgery Center in Sambhajinagar"
        description="Best knee replacement hospital in Sambhajinagar. 300+ successful surgeries, 98% success rate. ESIC, MJPJAY, PMJAY cashless. Expert orthopedic surgeons. Call 9130561222."
        keywords="knee replacement Sambhajinagar, knee surgery Aurangabad, best knee replacement hospital, total knee replacement, orthopedic surgeon, ESIC knee surgery, joint replacement"
        url="/knee-replacement"
        breadcrumbs={breadcrumbs}
        schema={[generateFAQSchema(hubData.faqs), generateHubSchema(hubData)]}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src={hubData.heroImage}
            alt="Knee Replacement Surgery at Sunshine Hospital"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 to-purple-900/80" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/30 text-amber-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Award className="w-4 h-4" />
                Center of Excellence
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                {hubData.title}
                <span className="block text-amber-400 text-2xl md:text-3xl mt-2 font-medium">
                  {hubData.subtitle}
                </span>
              </h1>
              
              <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-xl">
                {hubData.description}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={() => setShowAppointment(true)}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-8 py-6 rounded-full shadow-lg shadow-amber-500/25 text-lg"
                  data-testid="hero-book-btn"
                >
                  Book Free Consultation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <a href="tel:9130561222">
                  <Button
                    variant="outline"
                    className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-6 rounded-full text-lg"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Call Now
                  </Button>
                </a>
              </div>
            </div>

            {/* Stats Block */}
            <div className="grid grid-cols-2 gap-4">
              {hubData.stats.map((stat, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                  <CardContent className="p-6 text-center">
                    <stat.icon className="w-8 h-8 mx-auto mb-3 text-amber-400" />
                    <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm text-slate-300">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white py-6 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-sm text-slate-600">
            <span className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              ESIC Empanelled
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              MJPJAY/PMJAY Cashless
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Insurance TPA Accepted
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              EMI Available
            </span>
          </div>
        </div>
      </section>

      {/* Procedures Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Knee Replacement Procedures
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Advanced surgical options tailored to your condition and lifestyle
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {hubData.procedures.map((procedure, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white">
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-purple-600 transition-colors">
                    <Bone className="w-7 h-7 text-purple-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{procedure.name}</h3>
                  <p className="text-slate-600 mb-4">{procedure.description}</p>
                  <div className="flex gap-4 text-sm text-slate-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {procedure.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Activity className="w-4 h-4" />
                      {procedure.recovery}
                    </span>
                  </div>
                  <Link 
                    to={`/knee-replacement/${procedure.slug}`}
                    className="inline-flex items-center text-purple-600 font-semibold hover:text-purple-700"
                  >
                    Learn More <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Conditions Treated */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Conditions We Treat
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Our knee replacement specialists treat a wide range of conditions causing knee pain and limited mobility.
              </p>
              
              <div className="space-y-4">
                {hubData.conditions.map((condition, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{condition.name}</h3>
                      <p className="text-sm text-slate-600">{condition.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600"
                alt="Knee examination by orthopedic specialist"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-purple-700 text-white rounded-xl p-6 shadow-xl">
                <div className="text-3xl font-bold">98%</div>
                <div className="text-sm opacity-90">Patient Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recovery Timeline */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Your Recovery Journey
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              What to expect after knee replacement surgery - from hospital to full recovery
            </p>
          </div>
          
          <RecoveryTimeline steps={recoverySteps} />
        </div>
      </section>

      {/* Meet The Experts Section */}
      <MeetTheExperts 
        specialty="knee-replacement"
        title="Meet Our Knee Replacement Experts"
        subtitle="Experienced orthopedic surgeons dedicated to restoring your mobility"
        onBookAppointment={() => setShowAppointment(true)}
      />

      {/* FAQ Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-slate-600">
              Common questions about knee replacement surgery
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {hubData.faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`faq-${index}`}
                className="bg-slate-50 rounded-xl border-0 px-6"
              >
                <AccordionTrigger className="text-left font-semibold text-slate-900 hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-purple-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Live Pain-Free?
          </h2>
          <p className="text-lg text-purple-200 mb-8 max-w-2xl mx-auto">
            Book a free consultation with our knee replacement specialists. 
            ESIC, MJPJAY, PMJAY patients welcome for 100% cashless treatment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setShowAppointment(true)}
              className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-8 py-6 rounded-full text-lg"
            >
              Book Free Consultation
            </Button>
            <a href="tel:9130561222">
              <Button
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-6 rounded-full text-lg"
              >
                <Phone className="w-5 h-5 mr-2" />
                9130 561 222
              </Button>
            </a>
          </div>
        </div>
      </section>

      <AppointmentModal 
        open={showAppointment} 
        onOpenChange={setShowAppointment} 
        department="Knee Replacement"
      />
      
      <StickyBookingCTA onClick={() => setShowAppointment(true)} />
    </div>
  );
}
