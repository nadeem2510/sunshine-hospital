import { Helmet } from "react-helmet-async";

const SITE_NAME = "Sunshine Hospital";
const SITE_URL = "https://www.sunshinehospital.org";
const DEFAULT_IMAGE = "https://customer-assets.emergentagent.com/job_esic-cashless-med/artifacts/29y24j9j_Hospital%20Building%20Exterior.png";

// Enhanced MedicalBusiness Schema (E-E-A-T Compliant)
const medicalBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["MedicalBusiness", "Hospital", "MedicalOrganization"],
  "@id": `${SITE_URL}/#organization`,
  "name": "Sunshine Hospital",
  "alternateName": ["Sunshine Hospital Sambhajinagar", "Sunshine Hospital Aurangabad"],
  "url": SITE_URL,
  "logo": {
    "@type": "ImageObject",
    "url": `${SITE_URL}/logo.png`,
    "width": "200",
    "height": "200"
  },
  "image": {
    "@type": "ImageObject",
    "url": DEFAULT_IMAGE,
    "width": "1200",
    "height": "630",
    "caption": "Sunshine Hospital Building - Multispecialty Hospital in Sambhajinagar"
  },
  "description": "ESIC empaneled multispecialty hospital in Chhatrapati Sambhajinagar offering 24/7 emergency care, ICU, trauma center, orthopedics, and cashless treatment under ESIC, MJPJAY, and PMJAY schemes.",
  "slogan": "Quality Healthcare for All",
  "foundingDate": "2015",
  "telephone": ["+91-9130561222", "+91-0240-2990699"],
  "email": "sunshinecashless@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Plot No 7, Gut 36, Satara Parisar, Opp Patel Lawns, Beed Bypass Road",
    "addressLocality": "Chhatrapati Sambhajinagar",
    "addressRegion": "Maharashtra",
    "postalCode": "431001",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "19.853523",
    "longitude": "75.310582"
  },
  "hasMap": "https://maps.app.goo.gl/SvNZ93US42FUhZ166",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "10:00",
      "closes": "20:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Sunday"],
      "opens": "00:00",
      "closes": "23:59",
      "description": "Emergency services 24/7"
    }
  ],
  "priceRange": "$$",
  "currenciesAccepted": "INR",
  "paymentAccepted": ["Cash", "Credit Card", "Debit Card", "UPI", "ESIC Cashless", "MJPJAY", "PMJAY", "Insurance TPA"],
  "areaServed": [
    {"@type": "City", "name": "Chhatrapati Sambhajinagar"},
    {"@type": "City", "name": "Aurangabad"},
    {"@type": "AdministrativeArea", "name": "Waluj MIDC"},
    {"@type": "AdministrativeArea", "name": "Chikalthana"},
    {"@type": "AdministrativeArea", "name": "Cidco"}
  ],
  "sameAs": [
    "https://www.facebook.com/sunshinehospitalsambhajinagar",
    "https://www.instagram.com/sunshinehospital"
  ],
  "knowsAbout": [
    "ESIC Cashless Treatment",
    "MJPJAY Treatment",
    "PMJAY Ayushman Bharat",
    "Orthopedic Surgery",
    "Trauma Care",
    "General Surgery",
    "Critical Care Medicine"
  ],
  "hasCredential": [
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Government Empanelment",
      "name": "ESIC Empanelled Hospital"
    },
    {
      "@type": "EducationalOccupationalCredential", 
      "credentialCategory": "Government Empanelment",
      "name": "MJPJAY Empanelled Hospital"
    },
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Government Empanelment", 
      "name": "PMJAY (Ayushman Bharat) Empanelled Hospital"
    }
  ]
};

// MedicalSpecialty Schema
const medicalSpecialtySchemas = [
  {
    "@context": "https://schema.org",
    "@type": "MedicalSpecialty",
    "name": "Orthopedics",
    "alternateName": "Orthopedic Surgery",
    "description": "Specialized treatment for bone, joint, and muscle conditions including knee replacement, hip replacement, and trauma surgery.",
    "relevantSpecialty": "http://schema.org/Musculoskeletal"
  },
  {
    "@context": "https://schema.org",
    "@type": "MedicalSpecialty",
    "name": "General Surgery",
    "description": "Comprehensive surgical care including laparoscopic surgery, hernia repair, and abdominal surgeries.",
    "relevantSpecialty": "http://schema.org/Surgical"
  },
  {
    "@context": "https://schema.org",
    "@type": "MedicalSpecialty",
    "name": "Critical Care Medicine",
    "alternateName": "ICU Care",
    "description": "Advanced intensive care unit with modern life support systems and 24/7 critical care specialists."
  },
  {
    "@context": "https://schema.org",
    "@type": "MedicalSpecialty",
    "name": "Emergency Medicine",
    "alternateName": "Trauma Care",
    "description": "24/7 emergency and trauma care services with rapid response team and modern equipment."
  }
];

// Local Business Schema for better local SEO
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "Hospital",
  "@id": `${SITE_URL}/#hospital`,
  "name": "Sunshine Hospital",
  "image": DEFAULT_IMAGE,
  "priceRange": "$$",
  "telephone": "+91-9130561222",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Plot No 7, Gut 36, Satara Parisar",
    "addressLocality": "Chhatrapati Sambhajinagar",
    "addressRegion": "Maharashtra",
    "postalCode": "431001",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "19.853523",
    "longitude": "75.310582"
  },
  "areaServed": [
    "Waluj",
    "Chikalthana", 
    "MIDC Aurangabad",
    "Satara Parisar",
    "Cidco",
    "Chhatrapati Sambhajinagar"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "reviewCount": "250",
    "bestRating": "5",
    "worstRating": "1"
  }
};

export default function SEO({ 
  title, 
  description, 
  keywords,
  image,
  url,
  type = "website",
  schema,
  breadcrumbs,
  noindex = false
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} - ESIC Cashless Hospital in Sambhajinagar`;
  const metaDescription = description || "Sunshine Hospital is an ESIC empaneled multispecialty hospital in Chhatrapati Sambhajinagar offering 24/7 emergency care, ICU, trauma, orthopedics & cashless treatment.";
  const metaKeywords = keywords || "ESIC hospital Sambhajinagar, cashless treatment Aurangabad, hospital near Waluj, emergency hospital, orthopedic doctor, trauma center, MJPJAY hospital, PMJAY hospital";
  const metaImage = image || DEFAULT_IMAGE;
  const canonicalUrl = url ? `${SITE_URL}${url}` : SITE_URL;

  // Combine schemas - include all enhanced schemas
  const schemas = [medicalBusinessSchema, localBusinessSchema, ...medicalSpecialtySchemas];
  if (schema) {
    // Handle both single schema and array of schemas
    if (Array.isArray(schema)) {
      schemas.push(...schema);
    } else {
      schemas.push(schema);
    }
  }
  
  // Add breadcrumb schema if provided
  if (breadcrumbs && breadcrumbs.length > 0) {
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": `${SITE_URL}${item.url}`
      }))
    };
    schemas.push(breadcrumbSchema);
  }

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Robots */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />

      {/* Additional SEO Tags */}
      <meta name="author" content="Sunshine Hospital" />
      <meta name="geo.region" content="IN-MH" />
      <meta name="geo.placename" content="Chhatrapati Sambhajinagar" />
      <meta name="geo.position" content="19.853523;75.310582" />
      <meta name="ICBM" content="19.853523, 75.310582" />

      {/* Schema.org Structured Data */}
      {schemas.map((s, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
}

// Export schema generators for specific pages

// Enhanced Physician Schema (E-E-A-T Compliant)
export const generateDoctorSchema = (doctor) => ({
  "@context": "https://schema.org",
  "@type": "Physician",
  "@id": `${SITE_URL}/doctors/${doctor.id}`,
  "name": doctor.name,
  "image": {
    "@type": "ImageObject",
    "url": doctor.image,
    "caption": `${doctor.name} - ${doctor.title} at Sunshine Hospital`
  },
  "description": doctor.description || `${doctor.name} is a ${doctor.title} at Sunshine Hospital with ${doctor.experience} of experience.`,
  "jobTitle": doctor.title,
  "medicalSpecialty": {
    "@type": "MedicalSpecialty",
    "name": doctor.department
  },
  "knowsAbout": doctor.specializations || [doctor.department],
  "alumniOf": doctor.education || "Medical College",
  "worksFor": {
    "@type": "Hospital",
    "@id": `${SITE_URL}/#hospital`,
    "name": "Sunshine Hospital",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Chhatrapati Sambhajinagar",
      "addressRegion": "Maharashtra"
    }
  },
  "availableService": {
    "@type": "MedicalProcedure",
    "name": `${doctor.department} Consultation`
  }
});

// Enhanced Service Schema
export const generateServiceSchema = (service) => ({
  "@context": "https://schema.org",
  "@type": "MedicalProcedure",
  "@id": `${SITE_URL}/services/${service.slug}`,
  "name": service.name,
  "description": service.description,
  "howPerformed": service.details,
  "procedureType": "http://schema.org/SurgicalProcedure",
  "bodyLocation": service.bodyArea || "Various",
  "preparation": "Consultation with specialist required",
  "followup": "Post-operative care and rehabilitation",
  "provider": {
    "@type": "Hospital",
    "@id": `${SITE_URL}/#hospital`,
    "name": "Sunshine Hospital",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Chhatrapati Sambhajinagar"
    }
  },
  "potentialAction": {
    "@type": "ReserveAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${SITE_URL}/contact`,
      "actionPlatform": ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"]
    },
    "result": {
      "@type": "Reservation",
      "name": "Book Appointment"
    }
  }
});

// Enhanced Blog Schema with Author Box (E-E-A-T Compliant)
export const generateBlogSchema = (blog, author) => ({
  "@context": "https://schema.org",
  "@type": "MedicalWebPage",
  "mainEntity": {
    "@type": "Article",
    "headline": blog.title,
    "image": {
      "@type": "ImageObject",
      "url": blog.featured_image,
      "caption": blog.title
    },
    "datePublished": blog.created_at,
    "dateModified": blog.updated_at || blog.created_at,
    "author": author ? {
      "@type": "Person",
      "@id": `${SITE_URL}/doctors/${author.id}`,
      "name": author.name,
      "jobTitle": author.title,
      "image": author.image,
      "worksFor": {
        "@type": "Hospital",
        "name": "Sunshine Hospital"
      },
      "knowsAbout": author.specializations || [author.department]
    } : {
      "@type": "Organization",
      "name": "Sunshine Hospital"
    },
    "publisher": {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      "name": "Sunshine Hospital",
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/logo.png`
      }
    },
    "description": blog.excerpt,
    "articleSection": blog.category,
    "keywords": blog.tags?.join(", "),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${blog.slug}`
    },
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", "h2", ".article-summary"]
    }
  },
  "reviewedBy": author ? {
    "@type": "Person",
    "name": author.name,
    "jobTitle": author.title
  } : undefined,
  "lastReviewed": blog.updated_at || blog.created_at,
  "medicalAudience": {
    "@type": "MedicalAudience",
    "audienceType": "Patient"
  }
});

export const generateFAQSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

// Advanced Hub Page Schema - MedicalSpecialty with nested MedicalProcedure
export const generateHubSchema = (hubData) => {
  const SITE_URL = "https://www.sunshinehospital.org";
  
  return {
    "@context": "https://schema.org",
    "@type": "MedicalSpecialty",
    "@id": `${SITE_URL}${hubData.url}#specialty`,
    "name": hubData.name,
    "alternateName": hubData.alternateName || hubData.name,
    "description": hubData.description,
    "url": `${SITE_URL}${hubData.url}`,
    "image": hubData.heroImage,
    "medicalSpecialty": hubData.medicalSpecialtyType || "Orthopedic",
    "relevantSpecialty": {
      "@type": "MedicalSpecialty",
      "name": hubData.parentSpecialty || "Orthopedics"
    },
    "isAcceptingNewPatients": true,
    "availableService": hubData.procedures?.map(proc => ({
      "@type": "MedicalProcedure",
      "@id": `${SITE_URL}${hubData.url}/${proc.slug}`,
      "name": proc.name,
      "description": proc.description,
      "procedureType": "http://schema.org/SurgicalProcedure",
      "howPerformed": proc.howPerformed || "Performed under anesthesia by experienced surgeons",
      "preparation": proc.preparation || "Pre-operative assessment, blood tests, imaging",
      "followup": proc.followup || "Post-operative physiotherapy and rehabilitation",
      "status": "http://schema.org/ActiveActionStatus",
      "typicalAgeRange": proc.ageRange || "40-80",
      "bodyLocation": proc.bodyLocation || hubData.bodyLocation,
      "outcome": proc.outcome || "Pain relief and improved mobility",
      "risks": proc.risks || ["Infection", "Blood clots", "Implant complications"],
      "procedureType": "http://schema.org/SurgicalProcedure"
    })) || [],
    "provider": {
      "@type": "Hospital",
      "@id": `${SITE_URL}/#hospital`,
      "name": "Sunshine Hospital",
      "image": "https://customer-assets.emergentagent.com/job_esic-cashless-med/artifacts/29y24j9j_Hospital%20Building%20Exterior.png",
      "telephone": "+91-9130561222",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Plot No 7, Gut 36, Satara Parisar, Opp Patel Lawns, Beed Bypass Road",
        "addressLocality": "Chhatrapati Sambhajinagar",
        "addressRegion": "Maharashtra",
        "postalCode": "431001",
        "addressCountry": "IN"
      }
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "19.853523",
        "longitude": "75.310582"
      },
      "geoRadius": "100000"
    },
    "aggregateRating": hubData.rating ? {
      "@type": "AggregateRating",
      "ratingValue": hubData.rating.value || "4.8",
      "reviewCount": hubData.rating.count || "150",
      "bestRating": "5"
    } : undefined
  };
};

// Generate Procedure Schema for individual procedure pages
export const generateProcedureSchema = (procedure, hubUrl) => {
  const SITE_URL = "https://www.sunshinehospital.org";
  
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "@id": `${SITE_URL}${hubUrl}/${procedure.slug}`,
    "name": procedure.name,
    "description": procedure.description,
    "url": `${SITE_URL}${hubUrl}/${procedure.slug}`,
    "image": procedure.image,
    "procedureType": "http://schema.org/SurgicalProcedure",
    "bodyLocation": procedure.bodyLocation,
    "howPerformed": procedure.howPerformed || "Surgical procedure performed under anesthesia",
    "preparation": procedure.preparation || "Pre-operative assessment and medical clearance",
    "followup": procedure.followup || "Post-operative rehabilitation and follow-up visits",
    "status": "http://schema.org/ActiveActionStatus",
    "study": procedure.studies ? procedure.studies.map(study => ({
      "@type": "MedicalStudy",
      "name": study.name,
      "outcome": study.outcome
    })) : undefined,
    "possibleTreatment": procedure.alternatives?.map(alt => ({
      "@type": "MedicalTherapy",
      "name": alt
    })),
    "contraindication": procedure.contraindications?.map(c => ({
      "@type": "MedicalContraindication",
      "name": c
    })),
    "provider": {
      "@type": "Hospital",
      "@id": `${SITE_URL}/#hospital`,
      "name": "Sunshine Hospital"
    }
  };
};
