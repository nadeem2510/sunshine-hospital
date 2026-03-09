import { Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StickyBookingCTA({ onClick }) {
  return (
    <>
      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t shadow-lg md:hidden">
        <div className="flex gap-3">
          <a href="tel:9130561222" className="flex-1">
            <Button 
              variant="outline" 
              className="w-full border-purple-600 text-purple-700 font-semibold py-6 rounded-xl"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Now
            </Button>
          </a>
          <Button 
            onClick={onClick}
            className="flex-1 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-6 rounded-xl"
            data-testid="sticky-book-btn"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Book Now
          </Button>
        </div>
      </div>

      {/* Desktop Floating CTA */}
      <div className="hidden md:block fixed bottom-8 right-8 z-50">
        <Button 
          onClick={onClick}
          className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-6 py-6 rounded-full shadow-2xl shadow-amber-500/30 hover:scale-105 transition-transform"
          data-testid="floating-book-btn"
        >
          <Calendar className="w-5 h-5 mr-2" />
          Book Appointment
        </Button>
      </div>

      {/* Add padding to page content to prevent overlap with sticky footer on mobile */}
      <div className="h-24 md:h-0" />
    </>
  );
}
