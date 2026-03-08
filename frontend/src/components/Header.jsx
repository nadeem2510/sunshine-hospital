import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Menu, Clock, MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AppointmentModal from "./AppointmentModal";

const LOGO_URL = "/logo.png";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/doctors", label: "Doctors" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const insuranceLinks = [
  { href: "/esic-cashless-treatment-sambhajinagar", label: "ESIC Cashless" },
  { href: "/mjpjay-pmjay", label: "MJPJAY / PMJAY" },
  { href: "/cashless-insurance", label: "Insurance Tie-ups" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [showAppointment, setShowAppointment] = useState(false);
  const location = useLocation();

  const isInsurancePage = insuranceLinks.some(link => location.pathname === link.href);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-purple-800 text-white py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              OPD: 10 AM - 8 PM | Emergency: 24/7
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Satara Parisar, Chh. Sambhajinagar
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:9130561222" className="flex items-center gap-2 hover:text-amber-400 transition-colors">
              <Phone className="w-4 h-4" />
              91305 61222
            </a>
            <span className="text-purple-300">|</span>
            <a href="tel:02402990699" className="hover:text-amber-400 transition-colors">
              0240-2990699
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 glass border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0" data-testid="logo-link">
              <img
                src={LOGO_URL}
                alt="Sunshine Hospital Logo"
                className="h-12 md:h-14 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              <Link
                to="/"
                className={`nav-link font-medium transition-colors ${
                  location.pathname === "/"
                    ? "text-purple-700"
                    : "text-slate-700 hover:text-purple-700"
                }`}
              >
                Home
              </Link>
              
              {/* Insurance Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className={`flex items-center gap-1 font-medium transition-colors ${
                  isInsurancePage ? "text-purple-700" : "text-slate-700 hover:text-purple-700"
                }`}>
                  Cashless
                  <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  {insuranceLinks.map((link) => (
                    <DropdownMenuItem key={link.href} asChild>
                      <Link 
                        to={link.href}
                        className={`w-full cursor-pointer ${
                          location.pathname === link.href ? "text-purple-700 font-medium" : ""
                        }`}
                      >
                        {link.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {navLinks.slice(1).map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`nav-link font-medium transition-colors ${
                    location.pathname === link.href
                      ? "text-purple-700"
                      : "text-slate-700 hover:text-purple-700"
                  }`}
                  data-testid={`nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="tel:9130561222"
                className="flex items-center gap-2 text-purple-700 font-semibold hover:text-purple-900 transition-colors"
                data-testid="header-phone-link"
              >
                <Phone className="w-5 h-5" />
                <span className="hidden xl:inline">Emergency</span>
              </a>
              <Button
                onClick={() => setShowAppointment(true)}
                className="bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-full px-6 shadow-lg hover:scale-105 transition-transform"
                data-testid="book-appointment-btn"
              >
                Book Appointment
              </Button>
            </div>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" data-testid="mobile-menu-btn">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 overflow-y-auto">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col h-full">
                  <div className="py-6">
                    <img
                      src={LOGO_URL}
                      alt="Sunshine Hospital"
                      className="h-12 w-auto mb-6"
                    />
                    <nav className="flex flex-col gap-2">
                      <Link
                        to="/"
                        onClick={() => setIsOpen(false)}
                        className={`text-lg font-medium py-2 px-4 rounded-lg transition-colors ${
                          location.pathname === "/"
                            ? "bg-purple-100 text-purple-700"
                            : "text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        Home
                      </Link>
                      
                      {/* Cashless Section */}
                      <div className="mt-2">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 mb-2">
                          Cashless Facilities
                        </p>
                        {insuranceLinks.map((link) => (
                          <Link
                            key={link.href}
                            to={link.href}
                            onClick={() => setIsOpen(false)}
                            className={`text-base font-medium py-2 px-4 rounded-lg transition-colors block ${
                              location.pathname === link.href
                                ? "bg-purple-100 text-purple-700"
                                : "text-slate-700 hover:bg-slate-100"
                            }`}
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                      
                      <div className="border-t border-slate-200 my-2" />
                      
                      {navLinks.slice(1).map((link) => (
                        <Link
                          key={link.href}
                          to={link.href}
                          onClick={() => setIsOpen(false)}
                          className={`text-lg font-medium py-2 px-4 rounded-lg transition-colors ${
                            location.pathname === link.href
                              ? "bg-purple-100 text-purple-700"
                              : "text-slate-700 hover:bg-slate-100"
                          }`}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </nav>
                  </div>
                  <div className="mt-auto pb-8 space-y-4">
                    <div className="bg-purple-50 rounded-xl p-4">
                      <p className="text-sm text-slate-600 mb-2">Emergency Contact</p>
                      <a href="tel:9130561222" className="text-xl font-bold text-purple-700">
                        91305 61222
                      </a>
                    </div>
                    <Button
                      onClick={() => {
                        setIsOpen(false);
                        setShowAppointment(true);
                      }}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-full py-6"
                      data-testid="mobile-book-appointment-btn"
                    >
                      Book Appointment
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <AppointmentModal open={showAppointment} onOpenChange={setShowAppointment} />
    </>
  );
}
