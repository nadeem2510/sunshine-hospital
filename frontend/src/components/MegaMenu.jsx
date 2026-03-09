import { Link } from "react-router-dom";
import { 
  Bone, Activity, Heart, Stethoscope,
  ChevronRight, Phone, Calendar
} from "lucide-react";

const specialtyHubs = [
  {
    name: "Knee Replacement",
    url: "/knee-replacement",
    icon: Bone,
    color: "purple",
    description: "Total & Partial Knee Surgery",
    sublinks: [
      { name: "Total Knee Replacement", url: "/knee-replacement/total-knee-replacement" },
      { name: "Partial Knee Replacement", url: "/knee-replacement/partial-knee-replacement" },
      { name: "Knee Revision Surgery", url: "/knee-replacement/knee-revision-surgery" },
    ]
  },
  {
    name: "Hip Replacement",
    url: "/hip-replacement",
    icon: Bone,
    color: "blue",
    description: "Advanced Hip Surgery",
    sublinks: [
      { name: "Total Hip Replacement", url: "/hip-replacement/total-hip-replacement" },
      { name: "Partial Hip Replacement", url: "/hip-replacement/partial-hip-replacement" },
      { name: "Hip Revision Surgery", url: "/hip-replacement/hip-revision-surgery" },
    ]
  },
  {
    name: "Spine Surgery",
    url: "/spine-surgery",
    icon: Activity,
    color: "teal",
    description: "Expert Spinal Care",
    sublinks: [
      { name: "Disc Surgery", url: "/spine-surgery/disc-surgery" },
      { name: "Spinal Fusion", url: "/spine-surgery/spinal-fusion" },
      { name: "Laminectomy", url: "/spine-surgery/laminectomy" },
    ]
  },
  {
    name: "Cancer Care",
    url: "/cancer-care",
    icon: Heart,
    color: "rose",
    description: "Comprehensive Oncology",
    sublinks: [
      { name: "Surgical Oncology", url: "/cancer-care/surgical-oncology" },
      { name: "Medical Oncology", url: "/cancer-care/medical-oncology" },
      { name: "Cancer Screening", url: "/cancer-care/screening" },
    ]
  },
];

const colorClasses = {
  purple: { bg: "bg-purple-100", text: "text-purple-600", hover: "hover:bg-purple-50" },
  blue: { bg: "bg-blue-100", text: "text-blue-600", hover: "hover:bg-blue-50" },
  teal: { bg: "bg-teal-100", text: "text-teal-600", hover: "hover:bg-teal-50" },
  rose: { bg: "bg-rose-100", text: "text-rose-600", hover: "hover:bg-rose-50" },
};

export default function MegaMenu({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div 
      className="absolute top-full left-0 w-screen bg-white shadow-2xl border-t z-50"
      style={{ marginLeft: 'calc(-50vw + 50%)' }}
      onMouseLeave={onClose}
    >
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-4 gap-8">
          {specialtyHubs.map((hub) => {
            const colors = colorClasses[hub.color];
            return (
              <div key={hub.url} className="group">
                {/* Hub Header */}
                <Link 
                  to={hub.url}
                  onClick={onClose}
                  className={`flex items-center gap-3 p-3 rounded-xl ${colors.hover} transition-colors mb-4`}
                >
                  <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <hub.icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                      {hub.name}
                    </h3>
                    <p className="text-xs text-slate-500">{hub.description}</p>
                  </div>
                </Link>
                
                {/* Sublinks */}
                <div className="space-y-1 pl-3 border-l-2 border-slate-100 ml-6">
                  {hub.sublinks.map((sublink) => (
                    <Link
                      key={sublink.url}
                      to={sublink.url}
                      onClick={onClose}
                      className="flex items-center gap-2 py-2 px-3 text-sm text-slate-600 hover:text-purple-700 hover:bg-slate-50 rounded-lg transition-colors"
                    >
                      <ChevronRight className="w-3 h-3" />
                      {sublink.name}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 pt-6 border-t flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="text-sm text-slate-500">Need help choosing?</span>
            <a href="tel:9130561222" className="flex items-center gap-2 text-purple-700 font-semibold hover:text-purple-800">
              <Phone className="w-4 h-4" />
              Call 9130 561 222
            </a>
          </div>
          <Link 
            to="/contact"
            onClick={onClose}
            className="flex items-center gap-2 bg-amber-500 text-slate-900 font-semibold px-6 py-3 rounded-full hover:bg-amber-600 transition-colors"
          >
            <Calendar className="w-4 h-4" />
            Book Appointment
          </Link>
        </div>
      </div>
    </div>
  );
}

// Export hub data for use in mobile menu
export { specialtyHubs };
