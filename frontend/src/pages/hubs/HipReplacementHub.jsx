import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  CheckCircle, Phone, Calendar, ArrowRight, Award,
  Clock, Users, Shield, Star, ChevronRight,
  Activity, Bone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import AppointmentModal from "@/components/AppointmentModal";
import SEO, { generateFAQSchema, generateHubSchema } from "@/components/SEO";
import StickyBookingCTA from "@/components/StickyBookingCTA";
import RecoveryTimeline from "@/components/RecoveryTimeline";
import MeetTheExperts from "@/components/MeetTheExperts";

const hubData = {
  title: "Hip Replacement Specialists",
  subtitle: "Restore Mobility, Reclaim Life",
  description: "Expert hip replacement surgery at Sunshine Hospital. Our orthopedic specialists use advanced techniques for faster recovery and lasting results.",
  heroImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200",
  // Schema data
  url: "/hip-replacement",
  name: "Hip Replacement Surgery",
  alternateName: "Total Hip Arthroplasty",
  medicalSpecialtyType: "Orthopedic",
  parentSpecialty: "Orthopedics",
  bodyLocation: "Hip Joint",
  rating: { value: "4.8", count: "120" },
  stats: [
    { value: "300+", label: "Joint Replacements", icon: Award },
    { value: "98%", label: "Success Rate", icon: Star },
    { value: "15+", label: "Years Experience", icon: Clock },
    { value: "100%", label: "ESIC Cashless", icon: Shield },
  ],
  procedures: [
    {
      name: "Total Hip Replacement",
      slug: "total-hip-replacement",
      description: "Complete replacement of the hip joint with artificial components for severe arthritis or injury.",
      duration: "2-3 hours",
      recovery: "6-8 weeks",
    },
    {
      name: "Partial Hip Replacement",
      slug: "partial-hip-replacement", 
      description: "Replacement of only the femoral head, typically for hip fractures in elderly patients.",
      duration: "1-2 hours",
      recovery: "4-6 weeks",
    },
    {
      name: "Hip Revision Surgery",
      slug: "hip-revision-surgery",
      description: "Replacement of worn or failed hip implants with new components.",
      duration: "3-4 hours",
      recovery: "8-12 weeks",
    },
  ],
  conditions: [
    { name: "Hip Osteoarthritis", description: "Degenerative wear of the hip joint cartilage" },
    { name: "Avascular Necrosis", description: "Loss of blood supply causing bone death in the hip" },
    { name: "Hip Fractures", description: "Breaks in the upper femur or hip socket" },
    { name: "Rheumatoid Arthritis", description: "Inflammatory arthritis affecting hip joints" },
  ],
  faqs: [
    { 
      question: "What is the cost of hip replacement surgery in Sambhajinagar?",
      answer: "Hip replacement at Sunshine Hospital is affordable with multiple payment options. ESIC, MJPJAY, and PMJAY patients get 100% cashless treatment. Self-pay patients can avail EMI facilities. Contact us for detailed pricing."
    },
    {
      question: "How long does hip replacement surgery take?",
      answer: "Total hip replacement typically takes 2-3 hours. Hospital stay is usually 3-5 days. Most patients can walk with support within 24-48 hours after surgery."
    },
    {
      question: "What is the recovery time after hip replacement?",
      answer: "Initial recovery takes 6-8 weeks. Most patients return to normal activities within 3-6 months. Complete recovery with full strength takes about 1 year."
    },
    {
      question: "Is hip replacement covered under ESIC?",
      answer: "Yes, hip replacement surgery is fully covered under ESIC at Sunshine Hospital. Bring your E-Pehchan card and referral letter for cashless treatment."
    },
    {
      question: "What precautions are needed after hip replacement?",
      answer: "Avoid crossing legs, bending hip beyond 90 degrees, or twisting the operated leg for first 6-8 weeks. Follow physiotherapy exercises and attend follow-up appointments."
    },
  ],
};

const recoverySteps = [
  { day: "Day 1-2", title: "Hospital Recovery", description: "Standing and walking with walker support, hip precautions education" },
  { day: "Week 1-2", title: "Home Recovery", description: "Using walker/crutches, daily exercises, swelling management" },
  { day: "Week 3-4", title: "Progress Phase", description: "Transitioning to cane, increased walking distance, stair climbing" },
  { day: "Week 6-8", title: "Independence", description: "Walking without aid, driving (if cleared), return to light activities" },
  { day: "Month 3-6", title: "Full Recovery", description: "Return to work, recreational activities, continued strengthening" },
];

export default function HipReplacementHub() {
  const [showAppointment, setShowAppointment] = useState(false);

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Hip Replacement", url: "/hip-replacement" }
  ];

  return (
    <div className="min-h-screen">
      <SEO 
        title="Hip Replacement Surgery Specialists in Sambhajinagar"
        description="Expert hip replacement surgery in Sambhajinagar. 300+ successful joint replacements, 98% success rate. ESIC, MJPJAY, PMJAY cashless. Call 9130561222."
        keywords="hip replacement Sambhajinagar, hip surgery Aurangabad, best hip replacement hospital, total hip replacement, orthopedic surgeon, ESIC hip surgery"
        url="/hip-replacement"
        breadcrumbs={breadcrumbs}
        schema={[generateFAQSchema(hubData.faqs), generateHubSchema(hubData)]}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={hubData.heroImage} alt="Hip Replacement Surgery" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 to-blue-900/80" />
        
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
                  className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-8 py-6 rounded-full shadow-lg text-lg"
                >
                  Book Free Consultation
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <a href="tel:9130561222">
                  <Button variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-6 rounded-full text-lg">
                    <Phone className="w-5 h-5 mr-2" />
                    Call Now
                  </Button>
                </a>
              </div>
            </div>

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
            <span className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500" />ESIC Empanelled</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500" />MJPJAY/PMJAY Cashless</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500" />Insurance TPA Accepted</span>
          </div>
        </div>
      </section>

      {/* Procedures */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Hip Replacement Procedures</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Advanced surgical solutions for hip pain and mobility issues</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {hubData.procedures.map((procedure, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all border-0 bg-white">
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                    <Bone className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{procedure.name}</h3>
                  <p className="text-slate-600 mb-4">{procedure.description}</p>
                  <div className="flex gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{procedure.duration}</span>
                    <span className="flex items-center gap-1"><Activity className="w-4 h-4" />{procedure.recovery}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Conditions */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Conditions We Treat</h2>
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
              <img src="https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600" alt="Hip specialist consultation" className="rounded-2xl shadow-2xl" />
              <div className="absolute -bottom-6 -right-6 bg-blue-700 text-white rounded-xl p-6 shadow-xl">
                <div className="text-3xl font-bold">98%</div>
                <div className="text-sm opacity-90">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recovery Timeline */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Your Recovery Journey</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">What to expect after hip replacement surgery</p>
          </div>
          <RecoveryTimeline steps={recoverySteps} />
        </div>
      </section>

      {/* Meet The Experts */}
      <MeetTheExperts 
        specialty="hip-replacement"
        title="Meet Our Hip Replacement Experts"
        subtitle="Experienced orthopedic surgeons restoring mobility and quality of life"
        onBookAppointment={() => setShowAppointment(true)}
      />

      {/* FAQ */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            {hubData.faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`} className="bg-slate-50 rounded-xl border-0 px-6">
                <AccordionTrigger className="text-left font-semibold text-slate-900 hover:no-underline py-5">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-slate-600 pb-5">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for a Pain-Free Life?</h2>
          <p className="text-lg text-blue-200 mb-8">Book a free consultation with our hip replacement specialists.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => setShowAppointment(true)} className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-8 py-6 rounded-full text-lg">
              Book Free Consultation
            </Button>
            <a href="tel:9130561222">
              <Button variant="outline" className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-6 rounded-full text-lg">
                <Phone className="w-5 h-5 mr-2" />9130 561 222
              </Button>
            </a>
          </div>
        </div>
      </section>

      <AppointmentModal open={showAppointment} onOpenChange={setShowAppointment} department="Hip Replacement" />
      <StickyBookingCTA onClick={() => setShowAppointment(true)} />
    </div>
  );
}
