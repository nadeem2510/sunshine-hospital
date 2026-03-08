import { useState } from "react";
import { Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import AppointmentModal from "./AppointmentModal";

export default function MobileCTABar() {
  const [showAppointment, setShowAppointment] = useState(false);

  return (
    <>
      <div className="mobile-cta-bar md:hidden">
        <div className="flex gap-3">
          <a
            href="tel:9130561222"
            className="flex-1 flex items-center justify-center gap-2 bg-purple-700 text-white font-semibold py-3 rounded-full"
            data-testid="mobile-call-btn"
          >
            <Phone className="w-5 h-5" />
            Call Now
          </a>
          <Button
            onClick={() => setShowAppointment(true)}
            className="flex-1 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-full"
            data-testid="mobile-cta-book-btn"
          >
            <Calendar className="w-5 h-5" />
            Book
          </Button>
        </div>
      </div>

      <AppointmentModal open={showAppointment} onOpenChange={setShowAppointment} />
    </>
  );
}
