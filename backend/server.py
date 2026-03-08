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

# Doctor Data
DOCTORS = [
    {
        "id": "dr-nadim-sheikh",
        "name": "Dr. Nadim Sheikh",
        "title": "Director & Consulting Physician",
        "department": "General Medicine",
        "qualification": "MBBS, MD (Medicine)",
        "experience": "15+ Years",
        "specializations": ["Internal Medicine", "Diabetes Management", "Hypertension", "General Health"],
        "image": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
        "schedule": {
            "days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "timing": "10:00 AM - 6:00 PM"
        },
        "about": "Dr. Nadim Sheikh is the founder and Director of Sunshine Hospital. With over 15 years of experience in internal medicine, he is dedicated to providing quality healthcare to the community of Chhatrapati Sambhajinagar."
    },
    {
        "id": "dr-mangesh-rajput",
        "name": "Dr. Mangesh Rajput",
        "title": "Consultant Orthopedic Surgeon",
        "department": "Orthopedics",
        "qualification": "MBBS, MS (Ortho), Fellowship in Joint Replacement",
        "experience": "12+ Years",
        "specializations": ["Joint Replacement", "Trauma Surgery", "Sports Injuries", "Arthroscopy"],
        "image": "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop",
        "schedule": {
            "days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "timing": "11:00 AM - 5:00 PM"
        },
        "about": "Dr. Mangesh Rajput is a highly skilled orthopedic surgeon specializing in joint replacement and trauma surgery. He has performed over 1000+ successful surgeries and is known for his expertise in minimally invasive techniques."
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
        "image": "https://images.unsplash.com/photo-1766299892683-d50398e31823?crop=entropy&cs=srgb&fm=jpg&q=85",
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
        "image": "https://images.unsplash.com/photo-1762190042520-27e1d74d1f2b?crop=entropy&cs=srgb&fm=jpg&q=85",
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
        "image": "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&h=600&fit=crop",
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
        "image": "https://images.unsplash.com/photo-1688736867121-b8adc15233d9?crop=entropy&cs=srgb&fm=jpg&q=85",
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
        "image": "https://images.unsplash.com/photo-1659353888906-adb3e0041693?crop=entropy&cs=srgb&fm=jpg&q=85",
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
