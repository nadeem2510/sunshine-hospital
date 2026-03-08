import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  CheckCircle, FileText, Phone, MapPin, 
  ArrowRight, HelpCircle, AlertCircle, Users, Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import AppointmentModal from "@/components/AppointmentModal";
import SEO, { generateFAQSchema } from "@/components/SEO";

const eligibilityMJPJAY = [
  "Maharashtra domicile with valid documents",
  "Yellow/Orange ration card holders",
  "Annual family income below Rs. 1,00,000",
  "Families covered under Antyodaya Anna Yojana",
  "Farmers covered under Crop Insurance Scheme"
];

const eligibilityPMJAY = [
  "Families identified based on SECC 2011 data",
  "D1, D2, D3, D4, D5, D7 deprivation criteria households",
  "Automatically included occupational categories",
  "No cap on family size or age",
  "Pre-existing conditions covered from day one"
];

const documentsRequired = [
  "Aadhaar Card (mandatory)",
  "Ration Card (Yellow/Orange for MJPJAY)",
  "PMJAY/Ayushman Bharat Golden Card",
  "Valid Photo ID Proof",
  "Address Proof",
  "Previous Medical Records (if any)"
];

const coveredTreatments = [
  "All types of surgeries",
  "Medical and surgical packages",
  "Day care procedures",
  "ICU charges",
  "Pre and post hospitalization expenses",
  "Medicines and consumables during hospitalization",
  "Diagnostic tests during admission",
  "Food and accommodation for patient"
];

const faqs = [
  {
    question: "What is the difference between MJPJAY and PMJAY?",
    answer: "MJPJAY (Mahatma Jyotiba Phule Jan Arogya Yojana) is a Maharashtra state government scheme, while PMJAY (Pradhan Mantri Jan Arogya Yojana) is a central government scheme under Ayushman Bharat. Both provide cashless treatment but have different eligibility criteria and coverage amounts."
  },
  {
    question: "What is the coverage amount under these schemes?",
    answer: "MJPJAY provides coverage up to Rs. 1.5 Lakh per family per year for general diseases and Rs. 2.5 Lakh for specific procedures. PMJAY provides coverage up to Rs. 5 Lakh per family per year."
  },
  {
    question: "How do I get an Ayushman Bharat card?",
    answer: "You can check your eligibility on the PMJAY website (pmjay.gov.in) using your ration card or mobile number. If eligible, visit the nearest CSC (Common Service Centre) or empanelled hospital with your Aadhaar card to generate the Golden Card."
  },
  {
    question: "Is there any registration fee for these schemes?",
    answer: "No, there is no registration or enrollment fee for both MJPJAY and PMJAY schemes. The treatment is completely cashless for eligible beneficiaries."
  },
  {
    question: "Can I get treatment at Sunshine Hospital under these schemes?",
    answer: "Yes, Sunshine Hospital is empanelled under both MJPJAY and PMJAY schemes. Our dedicated desk will assist you with all formalities for cashless treatment."
  }
];

const steps = [
  {
    number: 1,
    title: "Check Your Eligibility",
    description: "Visit pmjay.gov.in or call 14555 to check if your family is eligible under PMJAY. For MJPJAY, check if you have Yellow/Orange ration card."
  },
  {
    number: 2,
    title: "Get Your Ayushman Card",
    description: "If eligible, get your Ayushman Bharat Golden Card from nearest CSC center or our hospital's help desk with your Aadhaar and ration card."
  },
  {
    number: 3,
    title: "Visit Sunshine Hospital",
    description: "Come to our MJPJAY/PMJAY desk with your card, Aadhaar, and ration card. Our team will verify and initiate the cashless process."
  }
];

export default function MJPJAYPage() {
  const [showAppointment, setShowAppointment] = useState(false);

  return (
    <div className="min-h-screen">
      <SEO 
        title="MJPJAY & PMJAY Cashless Treatment Hospital"
        description="Sunshine Hospital is empanelled for MJPJAY (Mahatma Jyotiba Phule Jan Arogya Yojana) and PMJAY (Ayushman Bharat) schemes. Free cashless treatment for eligible families in Sambhajinagar."
        keywords="MJPJAY hospital Sambhajinagar, PMJAY hospital Aurangabad, Ayushman Bharat hospital, free treatment hospital, government scheme hospital, cashless treatment PMJAY"
        url="/mjpjay-pmjay"
        schema={generateFAQSchema(faqs)}
      />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-100 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  <Shield className="w-4 h-4" />
                  MJPJAY Empanelled
                </span>
                <span className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  <Shield className="w-4 h-4" />
                  PMJAY Empanelled
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
                MJPJAY & PMJAY <span className="text-green-700">Government Schemes</span>
              </h1>
              
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Sunshine Hospital is empanelled under Mahatma Jyotiba Phule Jan Arogya Yojana (MJPJAY) 
                and Pradhan Mantri Jan Arogya Yojana (PMJAY/Ayushman Bharat). Get free cashless 
                treatment up to Rs. 5 Lakh per year for eligible families.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:9130561222">
                  <Button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-6 rounded-full shadow-lg text-lg w-full sm:w-auto">
                    <Phone className="w-5 h-5 mr-2" />
                    Call Helpdesk
                  </Button>
                </a>
                <a href="https://pmjay.gov.in" target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    className="border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-white font-semibold px-8 py-6 rounded-full text-lg w-full sm:w-auto"
                  >
                    Check Eligibility
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </a>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                    <Users className="w-8 h-8 text-green-700" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">Free Treatment</h3>
                    <p className="text-slate-600">For eligible families</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 rounded-xl p-4 text-center">
                    <p className="text-3xl font-bold text-green-700">₹5L</p>
                    <p className="text-sm text-slate-600">PMJAY Coverage</p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4 text-center">
                    <p className="text-3xl font-bold text-blue-700">₹2.5L</p>
                    <p className="text-sm text-slate-600">MJPJAY Coverage</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schemes Comparison */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Understanding the Schemes
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Both schemes provide cashless hospitalization for eligible families
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* MJPJAY Card */}
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 rounded-2xl overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center">
                    <Shield className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-green-800">MJPJAY</h3>
                    <p className="text-green-700 text-sm">Maharashtra State Scheme</p>
                  </div>
                </div>
                
                <p className="text-slate-700 mb-6">
                  Mahatma Jyotiba Phule Jan Arogya Yojana provides cashless treatment 
                  to families below poverty line in Maharashtra.
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-slate-700">Coverage: Up to ₹2.5 Lakh/year</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-slate-700">For Yellow/Orange ration card holders</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-slate-700">971+ medical procedures covered</span>
                  </div>
                </div>
                
                <h4 className="font-semibold text-green-800 mb-3">Eligibility:</h4>
                <ul className="space-y-2">
                  {eligibilityMJPJAY.slice(0, 3).map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* PMJAY Card */}
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 rounded-2xl overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center">
                    <Shield className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-800">PMJAY / Ayushman Bharat</h3>
                    <p className="text-blue-700 text-sm">Central Government Scheme</p>
                  </div>
                </div>
                
                <p className="text-slate-700 mb-6">
                  Pradhan Mantri Jan Arogya Yojana is the world's largest health 
                  insurance scheme providing coverage to 50 crore Indians.
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    <span className="text-slate-700">Coverage: Up to ₹5 Lakh/year</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    <span className="text-slate-700">Based on SECC 2011 data</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    <span className="text-slate-700">1,500+ medical packages covered</span>
                  </div>
                </div>
                
                <h4 className="font-semibold text-blue-800 mb-3">Eligibility:</h4>
                <ul className="space-y-2">
                  {eligibilityPMJAY.slice(0, 3).map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 3-Step Process */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              How to Avail Cashless Treatment?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Simple 3-step process to get free treatment at Sunshine Hospital
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="bg-white rounded-2xl p-8 shadow-sm h-full hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-6">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-slate-600">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-green-500" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents & Treatments */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Documents */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <FileText className="w-6 h-6 text-green-600" />
                Documents Required
              </h2>
              <Card className="bg-green-50 border-green-200 rounded-2xl">
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    {documentsRequired.map((doc, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700">{doc}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-amber-800 mb-1">For Emergencies</p>
                    <p className="text-amber-700 text-sm">
                      In case of emergency, bring the patient immediately. Our team will 
                      assist with documentation while treatment begins.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Covered Treatments */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
                What's Covered?
              </h2>
              <Card className="bg-blue-50 border-blue-200 rounded-2xl">
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    {coveredTreatments.map((treatment, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700">{treatment}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600">
              Common questions about MJPJAY and PMJAY schemes
            </p>
          </div>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-xl border border-slate-200 px-6"
              >
                <AccordionTrigger className="text-left font-semibold text-slate-900 hover:text-green-700 py-5">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-slate-600 pb-5 pl-8">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Need Help with MJPJAY/PMJAY?
          </h2>
          <p className="text-green-100 text-lg mb-8">
            Our helpdesk team will guide you through the entire process. 
            Call us or visit the hospital for assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:9130561222">
              <Button className="bg-white text-green-700 hover:bg-green-50 font-semibold px-8 py-6 rounded-full shadow-lg text-lg">
                <Phone className="w-5 h-5 mr-2" />
                Call: 91305 61222
              </Button>
            </a>
            <Link to="/contact">
              <Button
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-green-700 font-semibold px-8 py-6 rounded-full text-lg"
              >
                <MapPin className="w-5 h-5 mr-2" />
                Get Directions
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <AppointmentModal open={showAppointment} onOpenChange={setShowAppointment} />
    </div>
  );
}
