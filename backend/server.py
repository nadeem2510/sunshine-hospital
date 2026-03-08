from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from enum import Enum

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Sunshine Hospital API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Enums
class AppointmentStatus(str, Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    COMPLETED = "completed"
    CANCELLED = "cancelled"

class Department(str, Enum):
    GENERAL_MEDICINE = "general_medicine"
    ORTHOPEDICS = "orthopedics"
    ICU = "icu"
    SURGERY = "surgery"
    TRAUMA = "trauma"

# Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Appointment Models
class AppointmentCreate(BaseModel):
    patient_name: str = Field(..., min_length=2, max_length=100)
    phone: str = Field(..., min_length=10, max_length=15)
    email: Optional[str] = None
    department: Department
    preferred_date: str
    preferred_time: str
    message: Optional[str] = None
    is_esic: bool = False

class Appointment(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    patient_name: str
    phone: str
    email: Optional[str] = None
    department: Department
    preferred_date: str
    preferred_time: str
    message: Optional[str] = None
    is_esic: bool = False
    status: AppointmentStatus = AppointmentStatus.PENDING
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# ESIC Inquiry Models
class ESICInquiryCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    phone: str = Field(..., min_length=10, max_length=15)
    has_epehchan: bool
    has_referral: bool
    esic_number: Optional[str] = None
    employer_name: Optional[str] = None
    message: Optional[str] = None

class ESICInquiry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    has_epehchan: bool
    has_referral: bool
    esic_number: Optional[str] = None
    employer_name: Optional[str] = None
    message: Optional[str] = None
    is_eligible: bool = False
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# Contact Form Models
class ContactCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    phone: str = Field(..., min_length=10, max_length=15)
    email: Optional[str] = None
    subject: str
    message: str

class Contact(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    email: Optional[str] = None
    subject: str
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# Blog Models
class BlogCategory(str, Enum):
    GENERAL_HEALTH = "general_health"
    ORTHOPEDICS = "orthopedics"
    CARDIOLOGY = "cardiology"
    SURGERY = "surgery"
    NUTRITION = "nutrition"
    MENTAL_HEALTH = "mental_health"
    WOMENS_HEALTH = "womens_health"
    ESIC_INFO = "esic_info"

class BlogPostCreate(BaseModel):
    title: str = Field(..., min_length=5, max_length=200)
    slug: str = Field(..., min_length=5, max_length=200)
    excerpt: str = Field(..., min_length=20, max_length=500)
    content: str = Field(..., min_length=100)
    category: BlogCategory
    author_id: str
    featured_image: Optional[str] = None
    tags: List[str] = []
    is_published: bool = False

class BlogPost(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    slug: str
    excerpt: str
    content: str
    category: BlogCategory
    author_id: str
    author_name: Optional[str] = None
    featured_image: Optional[str] = None
    tags: List[str] = []
    is_published: bool = False
    views: int = 0
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    category: Optional[BlogCategory] = None
    featured_image: Optional[str] = None
    tags: Optional[List[str]] = None
    is_published: Optional[bool] = None

# Sample Blog Posts Data
SAMPLE_BLOGS = [
    {
        "id": "understanding-esic-benefits",
        "title": "Understanding ESIC Benefits: A Complete Guide for Workers",
        "slug": "understanding-esic-benefits",
        "excerpt": "Learn about the comprehensive health benefits available to ESIC cardholders and their families. Know your rights and how to avail cashless treatment.",
        "content": """<h2>What is ESIC?</h2>
<p>The Employees' State Insurance Corporation (ESIC) is a social security organization that provides medical, cash, maternity, disability, and dependent benefits to insured employees and their dependents.</p>

<h2>Who is Eligible?</h2>
<p>Employees earning up to Rs. 21,000 per month working in factories and establishments with 10 or more employees are covered under ESIC. The scheme covers the employee and their dependents including spouse, children, and dependent parents.</p>

<h2>Key Benefits</h2>
<ul>
<li><strong>Medical Benefits:</strong> Full medical care for the insured person and their family</li>
<li><strong>Sickness Benefit:</strong> Cash compensation during certified sickness</li>
<li><strong>Maternity Benefit:</strong> Paid leave during pregnancy and childbirth</li>
<li><strong>Disablement Benefit:</strong> Monthly payments for employment injury</li>
</ul>

<h2>How to Avail Cashless Treatment at Sunshine Hospital</h2>
<p>As an ESIC empanelled hospital, Sunshine Hospital provides seamless cashless treatment. Simply bring your E-Pehchan card and referral letter from the ESIC dispensary to our ESIC desk.</p>""",
        "category": "esic_info",
        "author_id": "dr-nadeem-shaikh",
        "author_name": "Dr. Nadeem Shaikh",
        "featured_image": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=400&fit=crop",
        "tags": ["ESIC", "Insurance", "Healthcare", "Workers Rights"],
        "is_published": True,
        "views": 245
    },
    {
        "id": "knee-replacement-guide",
        "title": "Total Knee Replacement: What You Need to Know",
        "slug": "knee-replacement-guide",
        "excerpt": "Everything about knee replacement surgery - from preparation to recovery. Learn when it's needed and what to expect during the procedure.",
        "content": """<h2>When is Knee Replacement Needed?</h2>
<p>Total Knee Replacement (TKR) is recommended when knee pain significantly affects your daily activities and conservative treatments like medication, physiotherapy, and injections no longer provide relief.</p>

<h2>Common Conditions Requiring TKR</h2>
<ul>
<li>Severe osteoarthritis</li>
<li>Rheumatoid arthritis</li>
<li>Post-traumatic arthritis</li>
<li>Severe knee injury</li>
</ul>

<h2>The Procedure</h2>
<p>During TKR, the damaged cartilage and bone are replaced with metal and plastic components. The surgery typically takes 1-2 hours and is performed under spinal or general anesthesia.</p>

<h2>Recovery Timeline</h2>
<p>Most patients can walk with support within 24 hours after surgery. Full recovery takes 3-6 months with proper physiotherapy. At Sunshine Hospital, our orthopedic team ensures comprehensive post-operative care.</p>

<h2>Why Choose Sunshine Hospital?</h2>
<p>Dr. Gajanan Deshmukh, our consultant orthopedic surgeon, has performed numerous successful joint replacement surgeries with excellent outcomes.</p>""",
        "category": "orthopedics",
        "author_id": "dr-gajanan-deshmukh",
        "author_name": "Dr. Gajanan Deshmukh",
        "featured_image": "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=400&fit=crop",
        "tags": ["Orthopedics", "Knee Replacement", "Surgery", "Joint Pain"],
        "is_published": True,
        "views": 189
    },
    {
        "id": "diabetes-management-tips",
        "title": "Managing Diabetes: Daily Tips for Better Health",
        "slug": "diabetes-management-tips",
        "excerpt": "Practical advice for managing diabetes effectively through diet, exercise, and medication. Take control of your blood sugar levels.",
        "content": """<h2>Understanding Diabetes</h2>
<p>Diabetes is a chronic condition affecting how your body processes blood sugar. With proper management, you can lead a healthy, active life.</p>

<h2>Daily Management Tips</h2>
<h3>1. Monitor Blood Sugar Regularly</h3>
<p>Keep track of your blood sugar levels as advised by your doctor. This helps you understand how food, activity, and medication affect your levels.</p>

<h3>2. Follow a Balanced Diet</h3>
<ul>
<li>Choose complex carbohydrates over simple sugars</li>
<li>Include plenty of vegetables and fiber</li>
<li>Control portion sizes</li>
<li>Avoid sugary drinks and processed foods</li>
</ul>

<h3>3. Stay Active</h3>
<p>Regular physical activity helps control blood sugar. Aim for at least 30 minutes of moderate exercise most days of the week.</p>

<h3>4. Take Medications as Prescribed</h3>
<p>Never skip or change your diabetes medication without consulting your doctor.</p>

<h2>When to Seek Medical Help</h2>
<p>Visit your doctor immediately if you experience extremely high or low blood sugar, persistent symptoms, or any complications.</p>""",
        "category": "general_health",
        "author_id": "dr-nadeem-shaikh",
        "author_name": "Dr. Nadeem Shaikh",
        "featured_image": "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=400&fit=crop",
        "tags": ["Diabetes", "Health Tips", "Lifestyle", "Diet"],
        "is_published": True,
        "views": 312
    },
    {
        "id": "laparoscopic-surgery-benefits",
        "title": "Benefits of Laparoscopic Surgery: Minimally Invasive Approach",
        "slug": "laparoscopic-surgery-benefits",
        "excerpt": "Discover why laparoscopic surgery is preferred over traditional open surgery for many procedures. Smaller incisions, faster recovery.",
        "content": """<h2>What is Laparoscopic Surgery?</h2>
<p>Laparoscopic surgery, also known as minimally invasive surgery, uses small incisions and a camera (laparoscope) to perform surgical procedures. This approach has revolutionized modern surgery.</p>

<h2>Advantages Over Open Surgery</h2>
<ul>
<li><strong>Smaller Incisions:</strong> 0.5-1 cm cuts instead of large incisions</li>
<li><strong>Less Pain:</strong> Reduced post-operative discomfort</li>
<li><strong>Faster Recovery:</strong> Return to normal activities sooner</li>
<li><strong>Shorter Hospital Stay:</strong> Often discharged within 24-48 hours</li>
<li><strong>Less Scarring:</strong> Minimal cosmetic impact</li>
<li><strong>Lower Infection Risk:</strong> Reduced exposure of internal organs</li>
</ul>

<h2>Common Laparoscopic Procedures at Sunshine Hospital</h2>
<ul>
<li>Gallbladder removal (Cholecystectomy)</li>
<li>Appendix removal (Appendectomy)</li>
<li>Hernia repair</li>
<li>Gynecological surgeries</li>
</ul>

<h2>Is Laparoscopic Surgery Right for You?</h2>
<p>Dr. Mubasheer Qazi, our consultant laparoscopic surgeon, can evaluate your condition and recommend the best surgical approach for your needs.</p>""",
        "category": "surgery",
        "author_id": "dr-mubasheer-qazi",
        "author_name": "Dr. Mubasheer Qazi",
        "featured_image": "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&h=400&fit=crop",
        "tags": ["Surgery", "Laparoscopy", "Minimally Invasive", "Recovery"],
        "is_published": True,
        "views": 156
    }
]

# Doctor Data - Real doctors from Sunshine Hospital
DOCTORS = [
    {
        "id": "dr-nadeem-shaikh",
        "name": "Dr. Nadeem Shaikh",
        "title": "Director & Consulting Physician",
        "department": "General Medicine",
        "qualification": "MBBS, MD (Medicine)",
        "experience": "15+ Years",
        "specializations": ["Internal Medicine", "Diabetes Management", "Hypertension", "Fever & Infections"],
        "image": "https://customer-assets.emergentagent.com/job_esic-cashless-med/artifacts/ffi1eteu_Dr%20Nadim%20Shaikh.png",
        "schedule": {
            "days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "timing": "10:00 AM - 6:00 PM"
        },
        "about": "Dr. Nadeem Shaikh is the founder and Director of Sunshine Hospital. With extensive experience in internal medicine, he leads the hospital's mission to provide quality healthcare to the community of Chhatrapati Sambhajinagar."
    },
    {
        "id": "dr-gajanan-deshmukh",
        "name": "Dr. Gajanan Deshmukh",
        "title": "Consultant Orthopedic Surgeon",
        "department": "Orthopedics",
        "qualification": "MBBS, MS, DNB (Orthopedics)",
        "experience": "12+ Years",
        "specializations": ["Joint Replacement", "Spine Surgery", "Trauma Surgery", "Arthroscopy", "ACL Reconstruction"],
        "image": "https://customer-assets.emergentagent.com/job_esic-cashless-med/artifacts/e558rx4q_Dr%20Gajanan%20Deshmukh.png",
        "schedule": {
            "days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "timing": "10:00 AM - 5:00 PM"
        },
        "about": "Dr. Gajanan Deshmukh is a highly skilled orthopedic surgeon specializing in joint replacement, spine surgery, and trauma care. He has performed numerous successful surgeries including Total Knee Replacement, Total Hip Replacement, and ACL surgeries."
    },
    {
        "id": "dr-mubasheer-qazi",
        "name": "Dr. Mubasheer Qazi",
        "title": "Consultant General & Laparoscopic Surgeon",
        "department": "General Surgery",
        "qualification": "MBBS, MS (General Surgery)",
        "experience": "10+ Years",
        "specializations": ["Laparoscopic Surgery", "Cancer Surgery", "Hernia Repair", "Gallbladder Surgery", "Piles Surgery"],
        "image": "https://customer-assets.emergentagent.com/job_esic-cashless-med/artifacts/6gtcn8os_Dr%20Mubasheer%20Quazi.png",
        "schedule": {
            "days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "timing": "10:00 AM - 5:00 PM"
        },
        "about": "Dr. Mubasheer Qazi is an experienced general and laparoscopic surgeon specializing in minimally invasive procedures. He performs various surgeries including appendectomy, hernia repair, gallbladder removal, and cancer surgeries."
    },
    {
        "id": "dr-ajeya-ukadgaonkar",
        "name": "Dr. Ajeya Ukadgaonkar",
        "title": "Interventional Cardiologist",
        "department": "Cardiology",
        "qualification": "MBBS, MD, DNB (Cardiology)",
        "experience": "10+ Years",
        "specializations": ["Interventional Cardiology", "Angioplasty", "Heart Disease Management", "Cardiac Catheterization"],
        "image": "https://customer-assets.emergentagent.com/job_esic-cashless-med/artifacts/4t1c42vk_Dr%20Ajeya%20Ukadgaokar.png",
        "schedule": {
            "days": ["Monday", "Wednesday", "Friday", "Saturday"],
            "timing": "11:00 AM - 4:00 PM"
        },
        "about": "Dr. Ajeya Ukadgaonkar is an interventional cardiologist with expertise in diagnosing and treating heart conditions. He specializes in angioplasty, stenting, and other cardiac interventions."
    },
    {
        "id": "dr-rahul-ruikar",
        "name": "Dr. Rahul Ruikar",
        "title": "Consultant Nephrologist",
        "department": "Nephrology",
        "qualification": "MD, DM (Nephrology)",
        "experience": "8+ Years",
        "specializations": ["Kidney Disease", "Dialysis", "Kidney Transplant Care", "Hypertension"],
        "image": "https://customer-assets.emergentagent.com/job_esic-cashless-med/artifacts/0cs6fo5g_Dr%20Rahul%20Ruikar.png",
        "schedule": {
            "days": ["Tuesday", "Thursday", "Saturday"],
            "timing": "11:00 AM - 3:00 PM"
        },
        "about": "Dr. Rahul Ruikar is a skilled nephrologist specializing in kidney disorders, dialysis management, and comprehensive care for patients with renal conditions."
    },
    {
        "id": "dr-aakash-gore",
        "name": "Dr. Aakash Gore",
        "title": "Consultant Chest Physician & Pulmonologist",
        "department": "Pulmonology",
        "qualification": "MBBS, MD (Pulmonary Medicine)",
        "experience": "8+ Years",
        "specializations": ["Respiratory Diseases", "Asthma", "COPD", "Sleep Disorders", "Lung Infections"],
        "image": "https://customer-assets.emergentagent.com/job_esic-cashless-med/artifacts/bzzoxaga_DR%20AAKASH%20GORE.jpeg",
        "schedule": {
            "days": ["Monday", "Wednesday", "Friday"],
            "timing": "10:00 AM - 2:00 PM"
        },
        "about": "Dr. Aakash Gore is a pulmonologist and chest physician with expertise in treating respiratory conditions including asthma, COPD, pneumonia, and other lung diseases."
    },
    {
        "id": "dr-saleha-kausar",
        "name": "Dr. Saleha Kausar",
        "title": "Consultant Gynecologist",
        "department": "Gynecology",
        "qualification": "MBBS, MS (Obstetrics & Gynecology)",
        "experience": "10+ Years",
        "specializations": ["Obstetrics", "Gynecological Surgery", "High-Risk Pregnancy", "Infertility"],
        "image": "https://customer-assets.emergentagent.com/job_esic-cashless-med/artifacts/n6y9kh4g_Dr%20Saleha%20Kausar.png",
        "schedule": {
            "days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "timing": "10:00 AM - 5:00 PM"
        },
        "about": "Dr. Saleha Kausar is an experienced gynecologist providing comprehensive women's healthcare including prenatal care, delivery, and gynecological surgeries."
    },
    {
        "id": "dr-rachna-pole",
        "name": "Dr. Rachna Pole",
        "title": "Consultant Psychiatrist",
        "department": "Psychiatry",
        "qualification": "MBBS, MD (Psychiatry)",
        "experience": "8+ Years",
        "specializations": ["Depression", "Anxiety", "Stress Management", "Addiction Treatment"],
        "image": "https://customer-assets.emergentagent.com/job_esic-cashless-med/artifacts/rxhaft4d_Dr%20Rachna%20Pole.png",
        "schedule": {
            "days": ["Monday", "Wednesday", "Friday"],
            "timing": "11:00 AM - 3:00 PM"
        },
        "about": "Dr. Rachna Pole is a psychiatrist specializing in mental health care including treatment of depression, anxiety, stress-related disorders, and addiction."
    }
]

# Services Data
SERVICES = [
    {
        "id": "icu",
        "name": "Intensive Care Unit (ICU)",
        "slug": "icu",
        "short_description": "24/7 critical care with advanced life support systems",
        "description": "Our state-of-the-art ICU is equipped with the latest monitoring equipment and life support systems. Our team of intensivists and critical care nurses provide round-the-clock care for critically ill patients.",
        "features": [
            "24/7 Intensivist Coverage",
            "Advanced Ventilator Support",
            "Multi-Parameter Monitoring",
            "Central Line & Arterial Line Management",
            "Dialysis Support"
        ],
        "image": "https://customer-assets.emergentagent.com/job_esic-cashless-med/artifacts/uaeebm62_hospital%20reception%20view%202.jpeg",
        "icon": "HeartPulse"
    },
    {
        "id": "trauma",
        "name": "Trauma Center",
        "slug": "trauma-center",
        "short_description": "Emergency trauma care with rapid response team",
        "description": "Our Trauma Center is equipped to handle all types of emergencies including road accidents, industrial injuries, and other trauma cases. We have a dedicated trauma team available 24/7.",
        "features": [
            "24/7 Emergency Response",
            "Fully Equipped Trauma Bay",
            "Immediate Surgical Intervention",
            "Blood Bank Facility",
            "Ambulance Services"
        ],
        "image": "https://customer-assets.emergentagent.com/job_esic-cashless-med/artifacts/ecs8c3fa_hospital%20front%20view.jpeg",
        "icon": "Ambulance"
    },
    {
        "id": "surgery",
        "name": "General Surgery",
        "slug": "general-surgery",
        "short_description": "Advanced surgical procedures with experienced surgeons",
        "description": "Our General Surgery department offers a wide range of surgical procedures including laparoscopic surgery, hernia repair, appendectomy, and more. Our surgeons are experienced in both open and minimally invasive techniques.",
        "features": [
            "Laparoscopic Surgery",
            "Hernia Repair",
            "Appendectomy",
            "Cholecystectomy",
            "Cancer Surgery"
        ],
        "image": "https://customer-assets.emergentagent.com/job_esic-cashless-med/artifacts/p9gfbhd5_hospital%20reception%20view.jpeg",
        "icon": "Stethoscope"
    },
    {
        "id": "orthopedics",
        "name": "Orthopedics",
        "slug": "orthopedics",
        "short_description": "Complete bone and joint care from fractures to joint replacement",
        "description": "Our Orthopedics department provides comprehensive care for all musculoskeletal conditions. From fracture management to complex joint replacement surgeries, our team offers expert care.",
        "features": [
            "Joint Replacement Surgery",
            "Fracture Management",
            "Sports Injury Treatment",
            "Arthroscopic Surgery",
            "Spine Care"
        ],
        "image": "https://customer-assets.emergentagent.com/job_esic-cashless-med/artifacts/jvlmpt6c_WAITING%20AREA%202.jpeg",
        "icon": "Bone"
    },
    {
        "id": "general-medicine",
        "name": "General Medicine",
        "slug": "general-medicine",
        "short_description": "Comprehensive primary and preventive healthcare",
        "description": "Our General Medicine department provides comprehensive medical care for adults. From routine health checkups to management of chronic conditions, we offer personalized care for all your health needs.",
        "features": [
            "Health Checkups",
            "Diabetes Management",
            "Hypertension Care",
            "Respiratory Conditions",
            "Infectious Diseases"
        ],
        "image": "https://customer-assets.emergentagent.com/job_esic-cashless-med/artifacts/uaeebm62_hospital%20reception%20view%202.jpeg",
        "icon": "Activity"
    }
]

# Hospital Info
HOSPITAL_INFO = {
    "name": "Sunshine Hospital",
    "tagline": "Fair With Quality Care",
    "phones": ["9130561222", "02402990699"],
    "email": "sunshinehospital21@gmail.com",
    "address": {
        "line1": "Plot No 7, Gut 36, Satara Parisar",
        "line2": "Opp Patel Lawns, Beed Bypass Road",
        "city": "Chhatrapati Sambhajinagar",
        "pincode": "431001",
        "state": "Maharashtra"
    },
    "esic_areas": ["Waluj", "Chikalthana", "MIDC Area", "Satara", "Cidco"],
    "working_hours": {
        "opd": "10:00 AM - 8:00 PM",
        "emergency": "24/7"
    }
}

# API Routes
@api_router.get("/")
async def root():
    return {"message": "Sunshine Hospital API", "version": "1.0.0"}

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now(timezone.utc).isoformat()}

# Hospital Info
@api_router.get("/hospital-info")
async def get_hospital_info():
    return HOSPITAL_INFO

# Doctors
@api_router.get("/doctors")
async def get_doctors():
    return DOCTORS

@api_router.get("/doctors/{doctor_id}")
async def get_doctor(doctor_id: str):
    for doctor in DOCTORS:
        if doctor["id"] == doctor_id:
            return doctor
    raise HTTPException(status_code=404, detail="Doctor not found")

# Services
@api_router.get("/services")
async def get_services():
    return SERVICES

@api_router.get("/services/{service_slug}")
async def get_service(service_slug: str):
    for service in SERVICES:
        if service["slug"] == service_slug:
            return service
    raise HTTPException(status_code=404, detail="Service not found")

# Appointments
@api_router.post("/appointments", response_model=Appointment)
async def create_appointment(input: AppointmentCreate):
    appointment = Appointment(**input.model_dump())
    doc = appointment.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.appointments.insert_one(doc)
    return appointment

@api_router.get("/appointments", response_model=List[Appointment])
async def get_appointments():
    appointments = await db.appointments.find({}, {"_id": 0}).to_list(1000)
    for appt in appointments:
        if isinstance(appt['created_at'], str):
            appt['created_at'] = datetime.fromisoformat(appt['created_at'])
    return appointments

# ESIC Inquiries
@api_router.post("/esic-inquiry", response_model=ESICInquiry)
async def create_esic_inquiry(input: ESICInquiryCreate):
    # Determine eligibility based on documents
    is_eligible = input.has_epehchan and input.has_referral
    inquiry = ESICInquiry(**input.model_dump(), is_eligible=is_eligible)
    doc = inquiry.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.esic_inquiries.insert_one(doc)
    return inquiry

@api_router.get("/esic-inquiries", response_model=List[ESICInquiry])
async def get_esic_inquiries():
    inquiries = await db.esic_inquiries.find({}, {"_id": 0}).to_list(1000)
    for inq in inquiries:
        if isinstance(inq['created_at'], str):
            inq['created_at'] = datetime.fromisoformat(inq['created_at'])
    return inquiries

# Contact Form
@api_router.post("/contact", response_model=Contact)
async def create_contact(input: ContactCreate):
    contact = Contact(**input.model_dump())
    doc = contact.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.contacts.insert_one(doc)
    return contact

# Blog endpoints
@api_router.get("/blogs")
async def get_blogs(category: Optional[str] = None, published_only: bool = True):
    # First check if we have blogs in DB
    db_blogs = await db.blogs.find({}, {"_id": 0}).to_list(100)
    
    if not db_blogs:
        # Return sample blogs if no DB blogs exist
        blogs = SAMPLE_BLOGS.copy()
    else:
        blogs = db_blogs
    
    # Filter by category if provided
    if category:
        blogs = [b for b in blogs if b.get("category") == category]
    
    # Filter by published status
    if published_only:
        blogs = [b for b in blogs if b.get("is_published", False)]
    
    # Sort by created_at (newest first)
    blogs.sort(key=lambda x: x.get("created_at", ""), reverse=True)
    
    return blogs

@api_router.get("/blogs/{slug}")
async def get_blog(slug: str):
    # Check DB first
    blog = await db.blogs.find_one({"slug": slug}, {"_id": 0})
    
    if not blog:
        # Check sample blogs
        for b in SAMPLE_BLOGS:
            if b["slug"] == slug:
                return b
        raise HTTPException(status_code=404, detail="Blog post not found")
    
    # Increment views
    await db.blogs.update_one({"slug": slug}, {"$inc": {"views": 1}})
    blog["views"] = blog.get("views", 0) + 1
    
    return blog

@api_router.post("/blogs", response_model=BlogPost)
async def create_blog(input: BlogPostCreate):
    # Check if slug already exists
    existing = await db.blogs.find_one({"slug": input.slug})
    if existing:
        raise HTTPException(status_code=400, detail="Blog with this slug already exists")
    
    # Get author name
    author_name = None
    for doc in DOCTORS:
        if doc["id"] == input.author_id:
            author_name = doc["name"]
            break
    
    blog = BlogPost(**input.model_dump(), author_name=author_name)
    doc = blog.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    doc['updated_at'] = doc['updated_at'].isoformat()
    
    await db.blogs.insert_one(doc)
    return blog

@api_router.put("/blogs/{slug}")
async def update_blog(slug: str, input: BlogPostUpdate):
    existing = await db.blogs.find_one({"slug": slug}, {"_id": 0})
    if not existing:
        raise HTTPException(status_code=404, detail="Blog post not found")
    
    update_data = {k: v for k, v in input.model_dump().items() if v is not None}
    update_data["updated_at"] = datetime.now(timezone.utc).isoformat()
    
    await db.blogs.update_one({"slug": slug}, {"$set": update_data})
    
    updated = await db.blogs.find_one({"slug": slug}, {"_id": 0})
    return updated

@api_router.delete("/blogs/{slug}")
async def delete_blog(slug: str):
    result = await db.blogs.delete_one({"slug": slug})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return {"message": "Blog post deleted successfully"}

@api_router.get("/blog-categories")
async def get_blog_categories():
    return [
        {"value": "general_health", "label": "General Health"},
        {"value": "orthopedics", "label": "Orthopedics"},
        {"value": "cardiology", "label": "Cardiology"},
        {"value": "surgery", "label": "Surgery"},
        {"value": "nutrition", "label": "Nutrition"},
        {"value": "mental_health", "label": "Mental Health"},
        {"value": "womens_health", "label": "Women's Health"},
        {"value": "esic_info", "label": "ESIC Information"}
    ]

# Status endpoints (existing)
@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
