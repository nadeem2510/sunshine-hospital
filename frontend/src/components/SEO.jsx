import { Helmet } from "react-helmet-async";

const SITE_NAME = "Sunshine Hospital";
const SITE_URL = "https://www.sunshinehospital.org";
const DEFAULT_IMAGE = "https://customer-assets.emergentagent.com/job_esic-cashless-med/artifacts/29y24j9j_Hospital%20Building%20Exterior.png";

// Base Organization Schema
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  "name": "Sunshine Hospital",
  "alternateName": "Sunshine Hospital Sambhajinagar",
  "url": SITE_URL,
  "logo": `${SITE_URL}/logo.png`,
  "image": DEFAULT_IMAGE,
  "description": "ESIC empaneled multispecialty hospital in Chhatrapati Sambhajinagar offering 24/7 emergency care, ICU, trauma center, orthopedics, and general surgery services.",
  "telephone": ["+91-9130561222", "+91-0240-2990699"],
  "email": "sunshinehospital21@gmail.com",
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
    "latitude": "19.8762",
    "longitude": "75.3433"
  },
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
      "description": "Emergency services only"
    }
  ],
  "medicalSpecialty": [
    "Emergency Medicine",
    "Orthopedics",
    "General Surgery",
    "Trauma Surgery",
    "Critical Care Medicine",
    "Internal Medicine"
  ],
  "availableService": [
    {
      "@type": "MedicalProcedure",
      "name": "ESIC Cashless Treatment"
    },
    {
      "@type": "MedicalProcedure", 
      "name": "MJPJAY/PMJAY Treatment"
    },
    {
      "@type": "MedicalProcedure",
      "name": "Trauma Care"
    },
    {
      "@type": "MedicalProcedure",
      "name": "Orthopedic Surgery"
    }
  ],
  "sameAs": [
    "https://www.facebook.com/sunshinehospitalsambhajinagar",
    "https://www.instagram.com/sunshinehospital"
  ]
};

// Local Business Schema for better local SEO
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "Hospital",
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
    "latitude": "19.8762",
    "longitude": "75.3433"
  },
  "areaServed": [
    "Waluj",
    "Chikalthana", 
    "MIDC Aurangabad",
    "Satara Parisar",
    "Cidco",
    "Chhatrapati Sambhajinagar"
  ]
};

export default function SEO({ 
  title, 
  description, 
  keywords,
  image,
  url,
  type = "website",
  schema,
  noindex = false
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} - ESIC Cashless Hospital in Sambhajinagar`;
  const metaDescription = description || "Sunshine Hospital is an ESIC empaneled multispecialty hospital in Chhatrapati Sambhajinagar offering 24/7 emergency care, ICU, trauma, orthopedics & cashless treatment.";
  const metaKeywords = keywords || "ESIC hospital Sambhajinagar, cashless treatment Aurangabad, hospital near Waluj, emergency hospital, orthopedic doctor, trauma center, MJPJAY hospital, PMJAY hospital";
  const metaImage = image || DEFAULT_IMAGE;
  const canonicalUrl = url ? `${SITE_URL}${url}` : SITE_URL;

  // Combine schemas
  const schemas = [organizationSchema, localBusinessSchema];
  if (schema) {
    schemas.push(schema);
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
      <meta name="geo.position" content="19.8762;75.3433" />
      <meta name="ICBM" content="19.8762, 75.3433" />

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
export const generateDoctorSchema = (doctor) => ({
  "@context": "https://schema.org",
  "@type": "Physician",
  "name": doctor.name,
  "image": doctor.image,
  "description": doctor.description || `${doctor.name} is a ${doctor.title} at Sunshine Hospital with ${doctor.experience} of experience.`,
  "medicalSpecialty": doctor.department,
  "worksFor": {
    "@type": "Hospital",
    "name": "Sunshine Hospital",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Chhatrapati Sambhajinagar",
      "addressRegion": "Maharashtra"
    }
  }
});

export const generateServiceSchema = (service) => ({
  "@context": "https://schema.org",
  "@type": "MedicalProcedure",
  "name": service.name,
  "description": service.description,
  "howPerformed": service.details,
  "procedureType": "http://schema.org/SurgicalProcedure",
  "bodyLocation": service.bodyArea || "Various",
  "provider": {
    "@type": "Hospital",
    "name": "Sunshine Hospital",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Chhatrapati Sambhajinagar"
    }
  }
});

export const generateBlogSchema = (blog) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": blog.title,
  "image": blog.featured_image,
  "datePublished": blog.created_at,
  "dateModified": blog.updated_at || blog.created_at,
  "author": {
    "@type": "Organization",
    "name": "Sunshine Hospital"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Sunshine Hospital",
    "logo": {
      "@type": "ImageObject",
      "url": `${SITE_URL}/logo.png`
    }
  },
  "description": blog.excerpt,
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `${SITE_URL}/blog/${blog.slug}`
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
