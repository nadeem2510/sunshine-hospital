import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  CheckCircle, Phone, MapPin, ArrowRight, 
  Shield, Building2, FileCheck, HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import AppointmentModal from "@/components/AppointmentModal";

const insurancePartners = [
  { name: "TATA AIG", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Tata_logo.svg/200px-Tata_logo.svg.png" },
  { name: "ICICI Lombard", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/ICICI_Bank_Logo.svg/200px-ICICI_Bank_Logo.svg.png" },
  { name: "SBI General Insurance", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/SBI-logo.svg/200px-SBI-logo.svg.png" },
  { name: "Universal Sompo", logo: null },
  { name: "Oriental Insurance", logo: null },
  { name: "Aditya Birla Health Insurance", logo: null },
];

const tpaPartners = [
  { name: "Medi Assist", description: "Leading TPA with extensive hospital network" },
  { name: "MD India", description: "Healthcare administration services" },
  { name: "FHPL (Family Health Plan Limited)", description: "Comprehensive TPA services" },
  { name: "Health India TPA", description: "Pan-India health insurance claims" },
  { name: "Paramount Health Services", description: "Quality healthcare administration" },
];

const benefits = [
  {
    title: "No Upfront Payment",
    description: "Get admitted without paying anything upfront. We settle directly with your insurance."
  },
  {
    title: "Hassle-Free Process",
    description: "Our dedicated insurance desk handles all paperwork and approvals for you."
  },
  {
    title: "Quick Approvals",
    description: "Fast pre-authorization process to minimize waiting time for treatment."
  },
  {
    title: "Complete Transparency",
    description: "Clear communication about covered vs non-covered expenses before treatment."
  }
];

const documentsRequired = [
  "Health Insurance Card / Policy Document",
  "Photo ID Proof (Aadhaar/PAN/Voter ID)",
  "Policy holder's photograph",
  "Claim form (available at our desk)",
  "Previous medical records (if any)",
  "Doctor's prescription/referral letter"
];

const faqs = [
  {
    question: "How do I avail cashless treatment at Sunshine Hospital?",
    answer: "Simply visit our Insurance Desk on the ground floor with your health insurance card and ID proof. Our team will verify your policy, initiate pre-authorization with your insurer, and once approved, your treatment will begin without any upfront payment."
  },
  {
    question: "What if my insurance company is not in your list?",
    answer: "We work with most major insurance companies. Even if your insurer is not listed, please contact us. We may still be able to process your claim or help you with reimbursement documentation."
  },
  {
    question: "How long does the pre-authorization process take?",
    answer: "For planned admissions, we recommend initiating the process 2-3 days before admission. Emergency cases are processed on priority and typically approved within 2-4 hours."
  },
  {
    question: "What if my claim amount exceeds my coverage?",
    answer: "If your bill exceeds your policy coverage, you'll only need to pay the difference. Our team will inform you about any potential out-of-pocket expenses before treatment begins."
  },
  {
    question: "Do you provide cashless facility for day-care procedures?",
    answer: "Yes, we provide cashless facility for most day-care procedures covered under your policy, including dialysis, chemotherapy, cataract surgery, and minor surgical procedures."
  }
];

const processSteps = [
  {
    step: 1,
    title: "Visit Insurance Desk",
    description: "Come to our ground floor Insurance Desk with your health card and ID proof."
  },
  {
    step: 2,
    title: "Policy Verification",
    description: "Our team verifies your policy details and coverage with your insurance company."
  },
  {
    step: 3,
    title: "Pre-Authorization",
    description: "We send pre-authorization request to your insurer with treatment details."
  },
  {
    step: 4,
    title: "Approval & Admission",
    description: "Once approved, you're admitted for treatment without any upfront payment."
  }
];

export default function InsurancePage() {
  const [showAppointment, setShowAppointment] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 to-indigo-100 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Shield className="w-4 h-4" />
                Cashless Insurance Facility
              </div>
              
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
                Cashless Health <span className="text-purple-700">Insurance</span> at Sunshine Hospital
              </h1>
              
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                We have tie-ups with all major health insurance companies and TPAs. 
                Get admitted without paying upfront - we handle all the paperwork and 
                settle directly with your insurer.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:9130561222">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-6 rounded-full shadow-lg text-lg w-full sm:w-auto">
                    <Phone className="w-5 h-5 mr-2" />
                    Insurance Desk
                  </Button>
                </a>
                <Button
                  onClick={() => setShowAppointment(true)}
                  variant="outline"
                  className="border-2 border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white font-semibold px-8 py-6 rounded-full text-lg"
                >
                  Book Appointment
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://customer-assets.emergentagent.com/job_esic-cashless-med/artifacts/p9gfbhd5_hospital%20reception%20view.jpeg"
                alt="Sunshine Hospital Reception"
                className="rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Insurance Partners */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Insurance Company Tie-Ups
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We have direct tie-ups with leading insurance companies for seamless cashless treatment
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {insurancePartners.map((partner, index) => (
              <Card 
                key={index}
                className="bg-white rounded-xl border-2 border-slate-100 hover:border-purple-300 hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-6 flex flex-col items-center justify-center h-32">
                  <Building2 className="w-8 h-8 text-purple-600 mb-3" />
                  <p className="text-center font-semibold text-slate-800 text-sm">
                    {partner.name}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TPA Partners */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              TPA (Third Party Administrator) Partners
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Empanelled with major TPAs for quick claim processing
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tpaPartners.map((tpa, index) => (
              <Card 
                key={index}
                className="bg-white rounded-xl border border-slate-200 hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FileCheck className="w-6 h-6 text-purple-700" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-1">{tpa.name}</h3>
                      <p className="text-sm text-slate-600">{tpa.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Why Choose Our Cashless Facility?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card 
                key={index}
                className="bg-gradient-to-br from-purple-50 to-white rounded-xl border border-purple-100"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{benefit.title}</h3>
                  <p className="text-sm text-slate-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 bg-purple-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              How Cashless Works?
            </h2>
            <p className="text-purple-200 max-w-2xl mx-auto">
              Simple 4-step process for hassle-free cashless treatment
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative text-center">
                <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-2xl shadow-lg">
                  {step.step}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-purple-200 text-sm">{step.description}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%]">
                    <ArrowRight className="w-6 h-6 text-purple-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents Required */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Documents Required for Cashless
              </h2>
              <Card className="bg-white rounded-2xl shadow-sm">
                <CardContent className="p-6">
                  <ul className="space-y-4">
                    {documentsRequired.map((doc, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="w-4 h-4 text-purple-600" />
                        </div>
                        <span className="text-slate-700">{doc}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Insurance Desk Location
              </h2>
              <Card className="bg-purple-600 rounded-2xl text-white">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <MapPin className="w-6 h-6 text-amber-400 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-lg mb-1">Ground Floor, Reception Area</h3>
                      <p className="text-purple-200">
                        Sunshine Hospital, Satara Parisar,<br />
                        Beed Bypass Road, Chh. Sambhajinagar
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 mb-6">
                    <Phone className="w-6 h-6 text-amber-400 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-lg mb-1">Contact</h3>
                      <p className="text-purple-200">
                        91305 61222 / 0240-2990699
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-purple-700 rounded-xl p-4">
                    <p className="text-purple-200 text-sm">
                      <strong className="text-white">Timing:</strong> Mon-Sat, 9 AM to 6 PM<br />
                      <strong className="text-white">Emergency:</strong> 24/7 assistance available
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-slate-50 rounded-xl border border-slate-200 px-6"
              >
                <AccordionTrigger className="text-left font-semibold text-slate-900 hover:text-purple-700 py-5">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
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

      {/* Other Schemes CTA */}
      <section className="py-12 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-white">
              <h3 className="text-2xl font-bold mb-2">Looking for Government Schemes?</h3>
              <p className="text-green-100">
                We also provide cashless treatment under MJPJAY, PMJAY & ESIC
              </p>
            </div>
            <div className="flex gap-4">
              <Link to="/mjpjay-pmjay">
                <Button className="bg-white text-green-700 hover:bg-green-50 font-semibold px-6 py-5 rounded-full">
                  MJPJAY/PMJAY
                </Button>
              </Link>
              <Link to="/esic-cashless-treatment-sambhajinagar">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-green-700 font-semibold px-6 py-5 rounded-full">
                  ESIC
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-amber-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Have Questions About Insurance?
          </h2>
          <p className="text-amber-100 text-lg mb-8">
            Our insurance desk is ready to assist you. Contact us for any queries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:9130561222">
              <Button className="bg-purple-800 hover:bg-purple-900 text-white font-semibold px-8 py-6 rounded-full shadow-lg text-lg">
                <Phone className="w-5 h-5 mr-2" />
                Call Insurance Desk
              </Button>
            </a>
            <Button
              onClick={() => setShowAppointment(true)}
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-amber-600 font-semibold px-8 py-6 rounded-full text-lg"
            >
              Book Appointment
            </Button>
          </div>
        </div>
      </section>

      <AppointmentModal open={showAppointment} onOpenChange={setShowAppointment} />
    </div>
  );
}
