import { useState } from "react";
import { 
  Phone, Mail, MapPin, Clock, Send, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: ["91305 61222", "0240-2990699"],
    action: "tel:9130561222",
  },
  {
    icon: Mail,
    title: "Email",
    details: ["sunshinehospital21@gmail.com"],
    action: "mailto:sunshinehospital21@gmail.com",
  },
  {
    icon: MapPin,
    title: "Address",
    details: [
      "Plot No 7, Gut 36, Satara Parisar",
      "Opp Patel Lawns, Beed Bypass Road",
      "Chh. Sambhajinagar - 431001"
    ],
    action: "https://maps.google.com/?q=Sunshine+Hospital+Satara+Parisar+Aurangabad",
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: ["OPD: 10 AM - 8 PM (Mon-Sat)", "Emergency: 24/7"],
    action: null,
  },
];

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.subject || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/contact`, formData);
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({
        name: "",
        phone: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast.error("Failed to send message. Please try again.");
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
              Contact <span className="text-purple-700">Us</span>
            </h1>
            <p className="text-lg text-slate-600">
              Have questions or need assistance? Our team is here to help. 
              Reach out to us through any of the channels below or fill out the contact form.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <Card 
                key={index}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <info.icon className="w-7 h-7 text-purple-700" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{info.title}</h3>
                  <div className="space-y-1">
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-slate-600 text-sm">
                        {info.action && i === 0 ? (
                          <a 
                            href={info.action}
                            className="hover:text-purple-700 transition-colors"
                            target={info.action.startsWith("http") ? "_blank" : undefined}
                            rel={info.action.startsWith("http") ? "noopener noreferrer" : undefined}
                          >
                            {detail}
                          </a>
                        ) : (
                          detail
                        )}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="bg-white rounded-2xl shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  Send Us a Message
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-slate-700 font-medium">
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-slate-50 border-slate-200"
                        data-testid="contact-name-input"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-700 font-medium">
                        Phone <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="tel"
                        placeholder="Your phone number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="bg-slate-50 border-slate-200"
                        data-testid="contact-phone-input"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-slate-700 font-medium">
                      Email (Optional)
                    </Label>
                    <Input
                      type="email"
                      placeholder="Your email address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-slate-50 border-slate-200"
                      data-testid="contact-email-input"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-slate-700 font-medium">
                      Subject <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      placeholder="What is this about?"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="bg-slate-50 border-slate-200"
                      data-testid="contact-subject-input"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-slate-700 font-medium">
                      Message <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      placeholder="Your message..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="bg-slate-50 border-slate-200 min-h-[150px]"
                      data-testid="contact-message-input"
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-6 rounded-full shadow-lg"
                    data-testid="contact-submit-btn"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            {/* Map */}
            <div className="space-y-6">
              <Card className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="h-[400px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3752.0!2d75.35!3d19.87!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSatara%20Parisar%2C%20Chhatrapati%20Sambhajinagar!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Sunshine Hospital Location"
                  />
                </div>
              </Card>
              
              <Card className="bg-purple-800 rounded-2xl shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Emergency? Call Now!
                  </h3>
                  <p className="text-purple-200 mb-6">
                    Our emergency services are available 24/7. Don't hesitate to call us 
                    in case of any medical emergency.
                  </p>
                  <a href="tel:9130561222">
                    <Button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-5 rounded-full w-full text-lg">
                      <Phone className="w-5 h-5 mr-2" />
                      91305 61222
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
