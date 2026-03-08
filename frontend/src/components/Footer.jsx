import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Youtube } from "lucide-react";

const LOGO_URL = "/logo.png";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <img
              src={LOGO_URL}
              alt="Sunshine Hospital"
              className="h-14 w-auto mb-6 brightness-110"
            />
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Sunshine Hospital is a leading multispecialty hospital in Chhatrapati Sambhajinagar, 
              providing quality healthcare with compassion. We are an authorized ESIC Cashless Treatment facility.
            </p>
            <div className="esic-badge bg-green-900/50 border-green-700">
              <span className="text-green-400">ESIC Empanelled Hospital</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/esic-cashless-treatment-sambhajinagar", label: "ESIC Cashless" },
                { href: "/services", label: "Our Services" },
                { href: "/doctors", label: "Our Doctors" },
                { href: "/blog", label: "Health Blog" },
                { href: "/contact", label: "Contact Us" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-slate-400 hover:text-amber-400 transition-colors text-sm"
                    data-testid={`footer-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-6">Our Services</h4>
            <ul className="space-y-3">
              {[
                { href: "/services/icu", label: "ICU Care" },
                { href: "/services/trauma-center", label: "Trauma Center" },
                { href: "/services/general-surgery", label: "General Surgery" },
                { href: "/services/orthopedics", label: "Orthopedics" },
                { href: "/services/general-medicine", label: "General Medicine" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-slate-400 hover:text-amber-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-400 text-sm">
                  Plot No 7, Gut 36, Satara Parisar,<br />
                  Opp Patel Lawns, Beed Bypass Road,<br />
                  Chh. Sambhajinagar - 431001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <div className="text-slate-400 text-sm">
                  <a href="tel:9130561222" className="hover:text-amber-400 transition-colors">
                    91305 61222
                  </a>
                  <span className="mx-2">|</span>
                  <a href="tel:02402990699" className="hover:text-amber-400 transition-colors">
                    0240-2990699
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <a
                  href="mailto:sunshinehospital21@gmail.com"
                  className="text-slate-400 text-sm hover:text-amber-400 transition-colors"
                >
                  sunshinehospital21@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <span className="text-slate-400 text-sm">
                  OPD: 10 AM - 8 PM<br />
                  Emergency: 24/7
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} Sunshine Hospital. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-slate-500 hover:text-amber-400 transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-500 hover:text-amber-400 transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-500 hover:text-amber-400 transition-colors" aria-label="YouTube">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Schema Markup */}
      <script type="application/ld+json" className="schema-markup">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalBusiness",
          "name": "Sunshine Hospital",
          "image": LOGO_URL,
          "telephone": ["+91-9130561222", "+91-240-2990699"],
          "email": "sunshinehospital21@gmail.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Plot No 7, Gut 36, Satara Parisar, Opp Patel Lawns, Beed Bypass Road",
            "addressLocality": "Chhatrapati Sambhajinagar",
            "addressRegion": "Maharashtra",
            "postalCode": "431001",
            "addressCountry": "IN"
          },
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              "opens": "10:00",
              "closes": "20:00"
            }
          ],
          "medicalSpecialty": ["GeneralPractice", "Orthopedics", "Surgery", "EmergencyMedicine"]
        })}
      </script>
    </footer>
  );
}
