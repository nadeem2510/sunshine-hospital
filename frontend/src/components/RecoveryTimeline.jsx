import { CheckCircle } from "lucide-react";

export default function RecoveryTimeline({ steps }) {
  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-purple-200" />
      
      <div className="space-y-8 md:space-y-0">
        {steps.map((step, index) => (
          <div 
            key={index} 
            className={`relative md:flex items-center ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            {/* Content */}
            <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
              <div className={`bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-600 md:border-l-0 ${
                index % 2 === 0 ? 'md:border-r-4' : 'md:border-l-4'
              }`}>
                <div className="inline-block bg-purple-100 text-purple-700 text-sm font-bold px-3 py-1 rounded-full mb-2">
                  {step.day}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-600">{step.description}</p>
              </div>
            </div>
            
            {/* Timeline Dot */}
            <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-purple-600 rounded-full items-center justify-center shadow-lg z-10">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            
            {/* Empty space for alternating layout */}
            <div className="hidden md:block md:w-1/2" />
          </div>
        ))}
      </div>
      
      {/* Final Success Indicator */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-6 py-3 rounded-full font-semibold">
          <CheckCircle className="w-5 h-5" />
          Back to Active Life!
        </div>
      </div>
    </div>
  );
}
