import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import axios from "axios";

const API_URL = process.env.REACT_APP_BACKEND_URL;

const departments = [
  { value: "general_medicine", label: "General Medicine" },
  { value: "orthopedics", label: "Orthopedics" },
  { value: "surgery", label: "General Surgery" },
  { value: "icu", label: "ICU / Critical Care" },
  { value: "trauma", label: "Trauma / Emergency" },
];

const timeSlots = [
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
  "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM",
  "07:00 PM", "07:30 PM"
];

export default function AppointmentModal({ open, onOpenChange }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(null);
  const [formData, setFormData] = useState({
    patient_name: "",
    phone: "",
    email: "",
    department: "",
    preferred_time: "",
    message: "",
    is_esic: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.patient_name || !formData.phone || !formData.department || !date || !formData.preferred_time) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/appointments`, {
        ...formData,
        preferred_date: format(date, "yyyy-MM-dd"),
      });

      toast.success("Appointment request submitted successfully!");
      onOpenChange(false);
      navigate("/thank-you", { state: { type: "appointment" } });
      
      // Reset form
      setFormData({
        patient_name: "",
        phone: "",
        email: "",
        department: "",
        preferred_time: "",
        message: "",
        is_esic: false,
      });
      setDate(null);
    } catch (error) {
      console.error("Error submitting appointment:", error);
      toast.error("Failed to submit appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-purple-800">Book an Appointment</DialogTitle>
          <DialogDescription className="text-slate-600">
            Fill in your details and we'll confirm your appointment shortly.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="patient_name" className="text-slate-700 font-medium">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="patient_name"
              placeholder="Enter your full name"
              value={formData.patient_name}
              onChange={(e) => setFormData({ ...formData, patient_name: e.target.value })}
              className="bg-slate-50 border-slate-200 focus:border-purple-500 focus:ring-purple-500"
              data-testid="appointment-name-input"
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-slate-700 font-medium">
              Phone Number <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="bg-slate-50 border-slate-200 focus:border-purple-500 focus:ring-purple-500"
              data-testid="appointment-phone-input"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-700 font-medium">
              Email (Optional)
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-slate-50 border-slate-200 focus:border-purple-500 focus:ring-purple-500"
              data-testid="appointment-email-input"
            />
          </div>

          {/* Department */}
          <div className="space-y-2">
            <Label className="text-slate-700 font-medium">
              Department <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.department}
              onValueChange={(value) => setFormData({ ...formData, department: value })}
            >
              <SelectTrigger className="bg-slate-50 border-slate-200" data-testid="appointment-department-select">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept.value} value={dept.value}>
                    {dept.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-700 font-medium">
                Preferred Date <span className="text-red-500">*</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal bg-slate-50 border-slate-200"
                    data-testid="appointment-date-btn"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(d) => d < new Date() || d.getDay() === 0}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-700 font-medium">
                Preferred Time <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.preferred_time}
                onValueChange={(value) => setFormData({ ...formData, preferred_time: value })}
              >
                <SelectTrigger className="bg-slate-50 border-slate-200" data-testid="appointment-time-select">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* ESIC Checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="is_esic"
              checked={formData.is_esic}
              onCheckedChange={(checked) => setFormData({ ...formData, is_esic: checked })}
              data-testid="appointment-esic-checkbox"
            />
            <Label htmlFor="is_esic" className="text-sm text-slate-600 cursor-pointer">
              I am an ESIC beneficiary
            </Label>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-slate-700 font-medium">
              Additional Message (Optional)
            </Label>
            <Textarea
              id="message"
              placeholder="Any specific concerns or requirements..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="bg-slate-50 border-slate-200 focus:border-purple-500 focus:ring-purple-500 min-h-[80px]"
              data-testid="appointment-message-input"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-6 rounded-full shadow-lg"
            data-testid="appointment-submit-btn"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Submitting...
              </>
            ) : (
              "Confirm Appointment"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
