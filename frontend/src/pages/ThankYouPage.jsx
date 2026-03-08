import { useLocation, Link } from "react-router-dom";
import { 
  CheckCircle, Phone, MapPin, Calendar, ArrowRight, 
  FileText, AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ThankYouPage() {
  const location = useLocation();
  const { type = "appointment", eligible = true } = location.state || {};

  return (
    <div className="min-h-screen bg-slate-50 py-20">
      <div className="max-w-2xl mx-auto px-4">
        <Card className="bg-white rounded-3xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className={`p-8 text-center ${
            type === "esic" && !eligible 
              ? "bg-amber-500" 
              : "bg-green-500"
          }`}>
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              {type === "esic" && !eligible ? (
                <AlertCircle className="w-10 h-10 text-amber-500" />
              ) : (
                <CheckCircle className="w-10 h-10 text-green-500" />
              )}
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {type === "esic" && !eligible 
                ? "Almost There!" 
                : "Thank You!"}
            </h1>
            <p className="text-white/90">
              {type === "appointment" 
                ? "Your appointment request has been submitted"
                : eligible 
                  ? "Your ESIC inquiry has been received"
                  : "Additional documents required"
              }
            </p>
          </div>

          {/* Content */}
          <CardContent className="p-8">
            {type === "appointment" ? (
              <AppointmentConfirmation />
            ) : eligible ? (
              <ESICEligibleConfirmation />
            ) : (
              <ESICIneligibleGuidance />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function AppointmentConfirmation() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-slate-600 mb-6">
          Our team will contact you shortly to confirm your appointment. 
          Please keep your phone accessible.
        </p>
      </div>
      
      <div className="bg-purple-50 rounded-xl p-6">
        <h3 className="font-bold text-slate-900 mb-4">What's Next?</h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold">
              1
            </div>
            <span className="text-slate-600">
              You'll receive a confirmation call within 2 hours
            </span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold">
              2
            </div>
            <span className="text-slate-600">
              Bring your ID proof and any previous medical records
            </span>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold">
              3
            </div>
            <span className="text-slate-600">
              Arrive 15 minutes before your appointment time
            </span>
          </li>
        </ul>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-50 rounded-xl p-4 text-center">
          <Phone className="w-6 h-6 text-purple-700 mx-auto mb-2" />
          <p className="text-sm text-slate-600 mb-1">Call Us</p>
          <a href="tel:9130561222" className="font-bold text-purple-700">
            91305 61222
          </a>
        </div>
        <div className="bg-slate-50 rounded-xl p-4 text-center">
          <MapPin className="w-6 h-6 text-purple-700 mx-auto mb-2" />
          <p className="text-sm text-slate-600 mb-1">Location</p>
          <span className="font-bold text-purple-700 text-sm">Satara Parisar</span>
        </div>
      </div>
      
      <div className="flex gap-4">
        <Link to="/" className="flex-1">
          <Button
            variant="outline"
            className="w-full border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white rounded-full py-5"
            data-testid="back-to-home"
          >
            Back to Home
          </Button>
        </Link>
        <Link to="/services" className="flex-1">
          <Button
            className="w-full bg-amber-500 hover:bg-amber-600 text-white rounded-full py-5"
            data-testid="view-services"
          >
            View Services
          </Button>
        </Link>
      </div>
    </div>
  );
}

function ESICEligibleConfirmation() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-slate-600 mb-6">
          You appear to be eligible for ESIC cashless treatment! 
          Our ESIC desk will contact you with further guidance.
        </p>
      </div>
      
      <div className="bg-green-50 rounded-xl p-6 border border-green-200">
        <h3 className="font-bold text-green-800 mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          Visit Our ESIC Desk
        </h3>
        <div className="space-y-4 text-green-700">
          <p className="flex items-start gap-3">
            <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Sunshine Hospital</strong><br />
              Plot No 7, Gut 36, Satara Parisar,<br />
              Opp Patel Lawns, Beed Bypass Road,<br />
              Chh. Sambhajinagar - 431001
            </span>
          </p>
          <p className="flex items-center gap-3">
            <Calendar className="w-5 h-5 flex-shrink-0" />
            <span>ESIC Desk Hours: Mon-Sat, 10 AM - 6 PM</span>
          </p>
          <p className="flex items-center gap-3">
            <Phone className="w-5 h-5 flex-shrink-0" />
            <span>Contact: <a href="tel:9130561222" className="font-bold">91305 61222</a></span>
          </p>
        </div>
      </div>
      
      <div className="bg-purple-50 rounded-xl p-6">
        <h3 className="font-bold text-slate-900 mb-4">Documents to Bring:</h3>
        <ul className="space-y-2">
          {[
            "E-Pehchan Card (Original + Copy)",
            "Aadhaar Card",
            "Referral Letter from ESIC Dispensary",
            "Passport Size Photo"
          ].map((doc, i) => (
            <li key={i} className="flex items-center gap-2 text-slate-600">
              <FileText className="w-4 h-4 text-purple-600" />
              {doc}
            </li>
          ))}
        </ul>
      </div>
      
      <Link to="/">
        <Button
          className="w-full bg-purple-700 hover:bg-purple-800 text-white rounded-full py-5"
          data-testid="esic-back-to-home"
        >
          Back to Home
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </Link>
    </div>
  );
}

function ESICIneligibleGuidance() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-slate-600 mb-6">
          Based on your response, you may need additional documents for ESIC cashless treatment. 
          Here's how to get them:
        </p>
      </div>
      
      <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
        <h3 className="font-bold text-amber-800 mb-4">Steps to Get Required Documents:</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold">
              1
            </div>
            <div>
              <p className="font-semibold text-slate-900">Get E-Pehchan Card</p>
              <p className="text-sm text-slate-600">
                Contact your employer's HR department or visit the nearest ESIC branch 
                office with your employment details.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold">
              2
            </div>
            <div>
              <p className="font-semibold text-slate-900">Get Referral Letter</p>
              <p className="text-sm text-slate-600">
                Visit your assigned ESIC Dispensary (Waluj or Chikalthana) with your 
                E-Pehchan card. The doctor will examine you and provide a referral.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold">
              3
            </div>
            <div>
              <p className="font-semibold text-slate-900">Visit Sunshine Hospital</p>
              <p className="text-sm text-slate-600">
                Once you have both documents, come to our ESIC desk with your Aadhaar 
                card for cashless treatment.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-slate-50 rounded-xl p-6">
        <h3 className="font-bold text-slate-900 mb-3">Need Help?</h3>
        <p className="text-slate-600 mb-4">
          Our ESIC desk can guide you through the process. Call us for assistance.
        </p>
        <a href="tel:9130561222">
          <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white rounded-full py-5">
            <Phone className="w-5 h-5 mr-2" />
            Call ESIC Desk: 91305 61222
          </Button>
        </a>
      </div>
      
      <Link to="/esic-cashless-treatment-sambhajinagar">
        <Button
          variant="outline"
          className="w-full border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white rounded-full py-5"
          data-testid="learn-more-esic"
        >
          Learn More About ESIC Process
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </Link>
    </div>
  );
}
