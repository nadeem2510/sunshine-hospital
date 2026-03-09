import { useState } from "react";
import { 
  CheckCircle, Phone, ArrowRight, Award,
  Clock, Shield, Star, Heart, Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import AppointmentModal from "@/components/AppointmentModal";
import SEO, { generateFAQSchema, generateHubSchema } from "@/components/SEO";
import StickyBookingCTA from "@/components/StickyBookingCTA";
import MeetTheExperts from "@/components/MeetTheExperts";

const hubData = {
  title: "Cancer Care Institute",
  subtitle: "Comprehensive Oncology Services",
  description: "Sunshine Hospital's Cancer Care Institute provides compassionate, comprehensive cancer treatment with a multidisciplinary approach for the best outcomes.",
  heroImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200",
  // Schema data
  url: "/cancer-care",
  name: "Cancer Care",
  alternateName: "Oncology Services",
  medicalSpecialtyType: "Oncology",
  parentSpecialty: "Oncology",
  bodyLocation: "Various",
  rating: { value: "4.8", count: "200" },
  stats: [
    { value: "1000+", label: "Patients Treated", icon: Award },
    { value: "24/7", label: "Support Care", icon: Clock },
    { value: "Expert", label: "Oncologists", icon: Star },
    { value: "100%", label: "ESIC Cashless", icon: Shield },
  ],
  services: [
    { name: "Surgical Oncology", description: "Expert cancer surgery by trained oncologists for tumor removal and staging" },
    { name: "Medical Oncology", description: "Chemotherapy and targeted therapy under specialist supervision" },
    { name: "Palliative Care", description: "Pain management and supportive care for quality of life" },
    { name: "Cancer Screening", description: "Early detection programs for breast, cervical, and other cancers" },
  ],
  cancerTypes: [
    { name: "Breast Cancer", description: "Comprehensive breast cancer care from screening to treatment" },
    { name: "Gastrointestinal Cancer", description: "Stomach, colon, liver, and pancreatic cancer treatment" },
    { name: "Head & Neck Cancer", description: "Oral, throat, and thyroid cancer management" },
    { name: "Gynecological Cancer", description: "Cervical, ovarian, and uterine cancer care" },
  ],
  faqs: [
    { question: "What cancer treatments are available at Sunshine Hospital?", answer: "We offer surgical oncology, chemotherapy, palliative care, and cancer screening. Our multidisciplinary team creates personalized treatment plans." },
    { question: "Is cancer treatment covered under ESIC?", answer: "Yes, cancer treatment including surgery and chemotherapy is covered under ESIC. MJPJAY and PMJAY also provide cashless coverage for cancer care." },
    { question: "Do you have oncology specialists?", answer: "Yes, we have experienced oncologists including surgical oncologists and medical oncologists who specialize in cancer treatment." },
    { question: "What support services are available for cancer patients?", answer: "We provide nutritional counseling, pain management, psychological support, and palliative care services for comprehensive patient support." },
  ],
};

export default function CancerCareHub() {
  const [showAppointment, setShowAppointment] = useState(false);

  return (
    <div className="min-h-screen">
      <SEO 
        title="Cancer Care Institute in Sambhajinagar"
        description="Comprehensive cancer treatment in Sambhajinagar. Surgical oncology, chemotherapy, palliative care. ESIC, MJPJAY cashless. Expert oncologists. Call 9130561222."
        keywords="cancer hospital Sambhajinagar, oncology Aurangabad, cancer treatment, chemotherapy, surgical oncology, ESIC cancer treatment"
        url="/cancer-care"
        breadcrumbs={[{ name: "Home", url: "/" }, { name: "Cancer Care", url: "/cancer-care" }]}
        schema={[generateFAQSchema(hubData.faqs), generateHubSchema(hubData)]}
      />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-rose-900 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={hubData.heroImage} alt="Cancer Care" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 to-rose-900/80" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/30 text-amber-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Heart className="w-4 h-4" />Compassionate Care
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
                {hubData.title}
                <span className="block text-amber-400 text-2xl md:text-3xl mt-2 font-medium">{hubData.subtitle}</span>
              </h1>
              <p className="text-lg text-slate-300 mb-8 max-w-xl">{hubData.description}</p>
              <div className="flex flex-wrap gap-4">
                <Button onClick={() => setShowAppointment(true)} className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-8 py-6 rounded-full text-lg">
                  Book Consultation<ArrowRight className="w-5 h-5 ml-2" />
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
          <span className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-500" />Multidisciplinary Team</span>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Cancer Care Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hubData.services.map((service, i) => (
              <Card key={i} className="hover:shadow-xl transition-all border-0 text-center">
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-rose-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                    <Heart className="w-7 h-7 text-rose-600" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{service.name}</h3>
                  <p className="text-slate-600 text-sm">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cancer Types */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Cancers We Treat</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {hubData.cancerTypes.map((c, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
                <CheckCircle className="w-6 h-6 text-rose-600 flex-shrink-0 mt-1" />
                <div><h3 className="font-semibold">{c.name}</h3><p className="text-sm text-slate-600">{c.description}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support */}
      <section className="py-16 bg-gradient-to-br from-rose-50 to-amber-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Heart className="w-16 h-16 text-rose-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">You're Not Alone</h2>
          <p className="text-lg text-slate-600 mb-8">Our compassionate team supports you and your family through every step of your cancer journey.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="bg-white rounded-xl p-4 shadow-md"><Activity className="w-6 h-6 text-rose-500 mx-auto mb-2" /><p className="text-sm font-medium">Nutritional Support</p></div>
            <div className="bg-white rounded-xl p-4 shadow-md"><Heart className="w-6 h-6 text-rose-500 mx-auto mb-2" /><p className="text-sm font-medium">Counseling</p></div>
            <div className="bg-white rounded-xl p-4 shadow-md"><Shield className="w-6 h-6 text-rose-500 mx-auto mb-2" /><p className="text-sm font-medium">Pain Management</p></div>
          </div>
        </div>
      </section>

      {/* Meet The Experts */}
      <MeetTheExperts 
        specialty="cancer-care"
        title="Meet Our Oncology Team"
        subtitle="Compassionate cancer specialists providing comprehensive care"
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
      <section className="py-16 bg-rose-800 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Get Expert Cancer Care</h2>
          <p className="text-rose-200 mb-8">Early detection saves lives. Book a consultation today.</p>
          <Button onClick={() => setShowAppointment(true)} className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-8 py-6 rounded-full text-lg">
            Book Consultation
          </Button>
        </div>
      </section>

      <AppointmentModal open={showAppointment} onOpenChange={setShowAppointment} department="Cancer Care" />
      <StickyBookingCTA onClick={() => setShowAppointment(true)} />
    </div>
  );
}
