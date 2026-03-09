import { useState } from "react";
import { 
  CheckCircle, Phone, ArrowRight, Award,
  Clock, Shield, Star, Activity, Bone
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
  title: "Spine Surgery Center",
  subtitle: "Advanced Spinal Care Excellence",
  description: "Comprehensive spine care at Sunshine Hospital. From disc problems to spinal deformities, our specialists provide expert diagnosis and treatment.",
  heroImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200",
  // Schema data
  url: "/spine-surgery",
  name: "Spine Surgery",
  alternateName: "Spinal Surgery",
  medicalSpecialtyType: "Orthopedic",
  parentSpecialty: "Orthopedics",
  bodyLocation: "Spine",
  rating: { value: "4.7", count: "90" },
  stats: [
    { value: "500+", label: "Spine Surgeries", icon: Award },
    { value: "95%", label: "Success Rate", icon: Star },
    { value: "15+", label: "Years Experience", icon: Clock },
    { value: "100%", label: "ESIC Cashless", icon: Shield },
  ],
  procedures: [
    { name: "Disc Surgery", slug: "disc-surgery", description: "Treatment for herniated or bulging discs causing nerve compression", duration: "1-2 hours", recovery: "4-6 weeks" },
    { name: "Spinal Fusion", slug: "spinal-fusion", description: "Joining vertebrae to stabilize the spine and reduce pain", duration: "3-4 hours", recovery: "3-6 months" },
    { name: "Laminectomy", slug: "laminectomy", description: "Removal of bone to relieve pressure on spinal nerves", duration: "2-3 hours", recovery: "6-8 weeks" },
  ],
  conditions: [
    { name: "Herniated Disc", description: "Disc material pressing on spinal nerves" },
    { name: "Spinal Stenosis", description: "Narrowing of the spinal canal" },
    { name: "Sciatica", description: "Pain radiating along the sciatic nerve" },
    { name: "Spondylolisthesis", description: "Vertebra slipping out of position" },
  ],
  faqs: [
    { question: "What causes back pain that needs surgery?", answer: "Surgery is typically needed for herniated discs, spinal stenosis, fractures, tumors, or severe deformities that don't respond to conservative treatment." },
    { question: "Is spine surgery risky?", answer: "Modern spine surgery is very safe with success rates above 95%. Our experienced surgeons use minimally invasive techniques when possible." },
    { question: "How long is recovery from spine surgery?", answer: "Recovery varies by procedure. Simple disc surgery: 4-6 weeks. Complex fusion: 3-6 months. Our team guides you through rehabilitation." },
    { question: "Is spine surgery covered under ESIC?", answer: "Yes, spine surgeries are covered under ESIC at Sunshine Hospital. MJPJAY and PMJAY also provide cashless coverage." },
  ],
};

const recoverySteps = [
  { day: "Day 1-3", title: "Hospital Care", description: "Pain management, early mobilization, wound care" },
  { day: "Week 1-2", title: "Rest & Heal", description: "Limited activity, medication management, wound healing" },
  { day: "Week 3-6", title: "Gradual Activity", description: "Physical therapy begins, increasing walking" },
  { day: "Month 2-3", title: "Rehabilitation", description: "Strengthening exercises, return to light work" },
  { day: "Month 3-6", title: "Full Recovery", description: "Return to normal activities, continued exercises" },
];

export default function SpineSurgeryHub() {
  const [showAppointment, setShowAppointment] = useState(false);

  return (
    <div className="min-h-screen">
      <SEO 
        title="Spine Surgery Center in Sambhajinagar"
        description="Expert spine surgery in Sambhajinagar. Disc surgery, spinal fusion, laminectomy. ESIC, MJPJAY cashless. Experienced spine specialists. Call 9130561222."
        keywords="spine surgery Sambhajinagar, back surgery Aurangabad, disc surgery, spinal fusion, spine specialist, ESIC spine surgery"
        url="/spine-surgery"
        breadcrumbs={[{ name: "Home", url: "/" }, { name: "Spine Surgery", url: "/spine-surgery" }]}
        schema={[generateFAQSchema(hubData.faqs), generateHubSchema(hubData)]}
      />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={hubData.heroImage} alt="Spine Surgery" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 to-teal-900/80" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/30 text-amber-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Award className="w-4 h-4" />Center of Excellence
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
                {hubData.title}
                <span className="block text-amber-400 text-2xl md:text-3xl mt-2 font-medium">{hubData.subtitle}</span>
              </h1>
              <p className="text-lg text-slate-300 mb-8 max-w-xl">{hubData.description}</p>
              <div className="flex flex-wrap gap-4">
                <Button onClick={() => setShowAppointment(true)} className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-8 py-6 rounded-full text-lg">
                  Book Free Consultation<ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <a href="tel:9130561222">
                  <Button variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-6 rounded-full text-lg">
                    <Phone className="w-5 h-5 mr-2" />Call Now
                  </Button>
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {hubData.stats.map((stat, i) => (
                <Card key={i} className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                  <CardContent className="p-6 text-center">
                    <stat.icon className="w-8 h-8 mx-auto mb-3 text-amber-400" />
                    <div className="text-3xl font-bold mb-1">{stat.value}</div>
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
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-6 text-sm text-slate-600">
          <span className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500" />ESIC Empanelled</span>
          <span className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500" />MJPJAY/PMJAY Cashless</span>
          <span className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500" />Advanced Imaging</span>
        </div>
      </section>

      {/* Procedures */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Spine Surgery Procedures</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {hubData.procedures.map((proc, i) => (
              <Card key={i} className="hover:shadow-xl transition-all border-0">
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-teal-100 rounded-2xl flex items-center justify-center mb-4">
                    <Bone className="w-7 h-7 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{proc.name}</h3>
                  <p className="text-slate-600 mb-4">{proc.description}</p>
                  <div className="flex gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{proc.duration}</span>
                    <span className="flex items-center gap-1"><Activity className="w-4 h-4" />{proc.recovery}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Conditions */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Conditions We Treat</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {hubData.conditions.map((c, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
                <CheckCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                <div><h3 className="font-semibold">{c.name}</h3><p className="text-sm text-slate-600">{c.description}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recovery */}
      <section className="py-16 bg-gradient-to-br from-teal-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Your Recovery Journey</h2>
          <RecoveryTimeline steps={recoverySteps} />
        </div>
      </section>

      {/* Meet The Experts */}
      <MeetTheExperts 
        specialty="spine-surgery"
        title="Meet Our Spine Specialists"
        subtitle="Experienced surgeons dedicated to relieving your back and neck pain"
        onBookAppointment={() => setShowAppointment(true)}
      />

      {/* FAQ */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="space-y-4">
            {hubData.faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-slate-50 rounded-xl border-0 px-6">
                <AccordionTrigger className="text-left font-semibold py-5">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-slate-600 pb-5">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-teal-800 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Get Expert Spine Care</h2>
          <p className="text-teal-200 mb-8">Book a consultation with our spine specialists today.</p>
          <Button onClick={() => setShowAppointment(true)} className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-8 py-6 rounded-full text-lg">
            Book Free Consultation
          </Button>
        </div>
      </section>

      <AppointmentModal open={showAppointment} onOpenChange={setShowAppointment} department="Spine Surgery" />
      <StickyBookingCTA onClick={() => setShowAppointment(true)} />
    </div>
  );
}
