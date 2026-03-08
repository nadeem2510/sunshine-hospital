import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  CheckCircle, FileText, CreditCard, ArrowRight, 
  Phone, MapPin, Clock, HelpCircle, AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import SEO, { generateFAQSchema } from "@/components/SEO";
import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;

const steps = [
  {
    number: 1,
    title: "Get Your E-Pehchan Card",
    description: "Ensure you have a valid E-Pehchan card issued by your employer. This digital card serves as your ESIC identity and is essential for availing cashless treatment.",
    icon: CreditCard,
  },
  {
    number: 2,
    title: "Obtain Referral Letter",
    description: "Visit your nearest ESIC Dispensary (Waluj/Chikalthana) and get a referral letter for Sunshine Hospital. The dispensary doctor will assess your condition and provide the referral.",
    icon: FileText,
  },
  {
    number: 3,
    title: "Visit Our ESIC Desk",
    description: "Come to Sunshine Hospital with your E-Pehchan card, Aadhaar, and referral letter. Our ESIC desk will complete the formalities and you can start your treatment immediately.",
    icon: CheckCircle,
  },
];

const requiredDocuments = [
  "E-Pehchan Card (Digital or Printed)",
  "Aadhaar Card",
  "Referral Letter from ESIC Dispensary",
  "Recent Passport Size Photo",
  "Previous Medical Records (if any)",
];

const serviceAreas = [
  { name: "Waluj MIDC", description: "Industrial workers from Waluj manufacturing units" },
  { name: "Chikalthana", description: "ESIC beneficiaries from Chikalthana area" },
  { name: "Satara-Deolali", description: "Workers from Satara Parisar region" },
  { name: "CIDCO", description: "Industrial employees from CIDCO areas" },
  { name: "Bajaj Nagar", description: "Factory workers from surrounding industries" },
];

const faqs = [
  {
    question: "What is ESIC cashless treatment and am I eligible?",
    answer: "ESIC cashless treatment allows eligible workers and their dependents to receive medical care without paying upfront. You're eligible if you're an insured person (IP) under ESIC with valid E-Pehchan card, or a family member of an IP."
  },
  {
    question: "Do I need a referral for emergency treatment?",
    answer: "No, for genuine emergencies, you can directly come to Sunshine Hospital. Our ESIC desk will coordinate with the dispensary for authorization. However, please bring your E-Pehchan card and Aadhaar."
  },
  {
    question: "Which ESIC dispensary should I visit for referral?",
    answer: "Visit the ESIC dispensary assigned to your registered area. Waluj workers typically visit Waluj Dispensary, while Chikalthana area workers should visit Chikalthana Dispensary."
  },
  {
    question: "What treatments are covered under ESIC at Sunshine Hospital?",
    answer: "We cover all treatments including OPD consultations, IPD admissions, surgeries, ICU care, orthopedic procedures, and emergency services. Maternity care for female IPs is also covered."
  },
  {
    question: "How long is the referral letter valid?",
    answer: "A referral letter is typically valid for the specific treatment mentioned. For ongoing treatment or follow-ups, you may need to get a new referral. Our ESIC desk can guide you on this."
  },
];

export default function ESICPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    has_epehchan: "",
    has_referral: "",
    esic_number: "",
    employer_name: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.has_epehchan || !formData.has_referral) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/esic-inquiry`, {
        ...formData,
        has_epehchan: formData.has_epehchan === "yes",
        has_referral: formData.has_referral === "yes",
      });

      const isEligible = response.data.is_eligible;
      
      toast.success("Inquiry submitted successfully!");
      navigate("/thank-you", { 
        state: { 
          type: "esic",
          eligible: isEligible 
        } 
      });
      
    } catch (error) {
      console.error("Error submitting ESIC inquiry:", error);
      toast.error("Failed to submit inquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <SEO 
        title="ESIC Cashless Treatment Hospital in Sambhajinagar"
        description="Sunshine Hospital is authorized ESIC empanelled hospital in Chhatrapati Sambhajinagar. Get 100% cashless treatment for Waluj, Chikalthana, MIDC workers. E-Pehchan card accepted. 24/7 emergency services."
        keywords="ESIC hospital Sambhajinagar, ESIC cashless treatment Aurangabad, ESIC empanelled hospital, E-Pehchan card hospital, Waluj ESIC hospital, Chikalthana ESIC, MIDC hospital, cashless treatment for industrial workers"
        url="/esic-cashless-treatment-sambhajinagar"
        schema={generateFAQSchema(faqs)}
      />
      {/* Hero Section */}
      <section className="bg-purple-50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <CheckCircle className="w-4 h-4" />
              Authorized ESIC Empanelled Hospital
            </div>
            
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
              ESIC Cashless Treatment in{" "}
              <span className="text-purple-700">Chhatrapati Sambhajinagar</span>
            </h1>
            
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Sunshine Hospital is your trusted ESIC empanelled facility offering complete cashless 
              treatment for industrial workers and their families. Serving Waluj, Chikalthana, MIDC, 
              and all surrounding areas with quality healthcare.
            </p>
            
            <div className="flex flex-wrap gap-6 text-sm text-slate-600">
              <a href="tel:9130561222" className="flex items-center gap-2 hover:text-purple-700">
                <Phone className="w-4 h-4 text-amber-500" />
                ESIC Desk: 91305 61222
              </a>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500" />
                Mon-Sat: 10 AM - 6 PM
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How to Avail ESIC Cashless Treatment?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Follow these 3 simple steps to get cashless treatment at Sunshine Hospital
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 h-full hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="step-indicator mb-6">
                      {step.number}
                    </div>
                    <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                      <step.icon className="w-7 h-7 text-purple-700" />
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
                    <ArrowRight className="w-8 h-8 text-amber-500" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Required Documents */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Documents Required for ESIC Treatment
              </h2>
              <p className="text-slate-600 mb-8">
                Please ensure you have the following documents when visiting our ESIC desk. 
                This will help us process your admission quickly and smoothly.
              </p>
              
              <ul className="space-y-4">
                {requiredDocuments.map((doc, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-slate-700">{doc}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-amber-800 mb-1">For Emergencies</p>
                    <p className="text-amber-700 text-sm">
                      In case of emergency, come directly to the hospital. Our team will help 
                      coordinate the necessary paperwork while you receive treatment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Service Areas */}
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                Areas We Serve
              </h3>
              <div className="space-y-4">
                {serviceAreas.map((area, index) => (
                  <div 
                    key={index}
                    className="bg-white p-4 rounded-xl border border-slate-200 hover:border-purple-300 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-slate-900">{area.name}</h4>
                        <p className="text-sm text-slate-600">{area.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility Form */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Check Your ESIC Eligibility
            </h2>
            <p className="text-slate-600">
              Fill this quick form and our ESIC desk will contact you with guidance
            </p>
          </div>
          
          <Card className="bg-white rounded-2xl shadow-lg border border-slate-200">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label className="text-slate-700 font-medium">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-slate-50 border-slate-200"
                    data-testid="esic-name-input"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label className="text-slate-700 font-medium">
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-slate-50 border-slate-200"
                    data-testid="esic-phone-input"
                  />
                </div>

                {/* E-Pehchan Card */}
                <div className="space-y-3">
                  <Label className="text-slate-700 font-medium">
                    Do you have an E-Pehchan Card? <span className="text-red-500">*</span>
                  </Label>
                  <RadioGroup
                    value={formData.has_epehchan}
                    onValueChange={(value) => setFormData({ ...formData, has_epehchan: value })}
                    className="flex gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="epehchan-yes" data-testid="esic-epehchan-yes" />
                      <Label htmlFor="epehchan-yes" className="cursor-pointer">Yes, I have</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="epehchan-no" data-testid="esic-epehchan-no" />
                      <Label htmlFor="epehchan-no" className="cursor-pointer">No, I don't have</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Referral Letter */}
                <div className="space-y-3">
                  <Label className="text-slate-700 font-medium">
                    Do you have a Referral Letter from ESIC Dispensary? <span className="text-red-500">*</span>
                  </Label>
                  <RadioGroup
                    value={formData.has_referral}
                    onValueChange={(value) => setFormData({ ...formData, has_referral: value })}
                    className="flex gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="referral-yes" data-testid="esic-referral-yes" />
                      <Label htmlFor="referral-yes" className="cursor-pointer">Yes, I have</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="referral-no" data-testid="esic-referral-no" />
                      <Label htmlFor="referral-no" className="cursor-pointer">No, I don't have</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* ESIC Number */}
                <div className="space-y-2">
                  <Label className="text-slate-700 font-medium">
                    ESIC Insurance Number (Optional)
                  </Label>
                  <Input
                    placeholder="Enter your ESIC number if available"
                    value={formData.esic_number}
                    onChange={(e) => setFormData({ ...formData, esic_number: e.target.value })}
                    className="bg-slate-50 border-slate-200"
                    data-testid="esic-number-input"
                  />
                </div>

                {/* Employer */}
                <div className="space-y-2">
                  <Label className="text-slate-700 font-medium">
                    Employer/Company Name (Optional)
                  </Label>
                  <Input
                    placeholder="Enter your employer name"
                    value={formData.employer_name}
                    onChange={(e) => setFormData({ ...formData, employer_name: e.target.value })}
                    className="bg-slate-50 border-slate-200"
                    data-testid="esic-employer-input"
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label className="text-slate-700 font-medium">
                    Additional Information (Optional)
                  </Label>
                  <Textarea
                    placeholder="Any specific health concerns or questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-slate-50 border-slate-200 min-h-[100px]"
                    data-testid="esic-message-input"
                  />
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-6 rounded-full shadow-lg"
                  data-testid="esic-submit-btn"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit ESIC Inquiry"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions about ESIC
            </h2>
            <p className="text-slate-600">
              Common questions about ESIC cashless treatment at Sunshine Hospital
            </p>
          </div>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-xl border border-slate-200 px-6"
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

      {/* Contact CTA */}
      <section className="py-16 bg-purple-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Need Help with ESIC Process?
          </h2>
          <p className="text-purple-200 text-lg mb-8">
            Our ESIC desk is here to assist you. Call us or visit the hospital for guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:9130561222">
              <Button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-6 rounded-full shadow-lg text-lg">
                <Phone className="w-5 h-5 mr-2" />
                Call ESIC Desk
              </Button>
            </a>
            <a href="https://maps.google.com/?q=Sunshine+Hospital+Satara+Parisar+Aurangabad" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-purple-800 font-semibold px-8 py-6 rounded-full text-lg"
              >
                <MapPin className="w-5 h-5 mr-2" />
                Get Directions
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Schema Markup for ESIC Page */}
      <script type="application/ld+json" className="schema-markup">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalSpecialty",
          "name": "ESIC Cashless Treatment",
          "description": "ESIC empanelled hospital providing cashless treatment for industrial workers in Chhatrapati Sambhajinagar",
          "provider": {
            "@type": "Hospital",
            "name": "Sunshine Hospital",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Chhatrapati Sambhajinagar",
              "addressRegion": "Maharashtra"
            }
          },
          "serviceArea": ["Waluj", "Chikalthana", "MIDC", "Satara", "CIDCO"]
        })}
      </script>
    </div>
  );
}
