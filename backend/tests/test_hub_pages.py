"""
Backend API tests for Hub & Spoke architecture - Specialty Hub pages
Tests: 301 redirects, doctors filtering by specialty, and related endpoints
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestHealthEndpoint:
    """Health check endpoint tests"""
    
    def test_health_check(self):
        """Test API health status"""
        response = requests.get(f"{BASE_URL}/api/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        print("PASS: Health check endpoint working")


class TestDoctorsAPI:
    """Doctors API tests - crucial for Meet The Experts section"""
    
    def test_get_all_doctors(self):
        """Test fetching all doctors"""
        response = requests.get(f"{BASE_URL}/api/doctors")
        assert response.status_code == 200
        doctors = response.json()
        assert isinstance(doctors, list)
        assert len(doctors) > 0
        print(f"PASS: Found {len(doctors)} doctors")
    
    def test_doctors_have_required_fields(self):
        """Verify doctors have all fields needed for MeetTheExperts component"""
        response = requests.get(f"{BASE_URL}/api/doctors")
        doctors = response.json()
        
        required_fields = ["id", "name", "title", "department", "qualification", 
                          "experience", "specializations", "image"]
        
        for doctor in doctors:
            for field in required_fields:
                assert field in doctor, f"Doctor {doctor.get('name')} missing field: {field}"
        print("PASS: All doctors have required fields")
    
    def test_orthopedic_doctors_exist(self):
        """Verify orthopedic doctors exist for knee/hip/spine hub pages"""
        response = requests.get(f"{BASE_URL}/api/doctors")
        doctors = response.json()
        
        orthopedic_doctors = [d for d in doctors if d.get("department") == "Orthopedics"]
        assert len(orthopedic_doctors) > 0, "No orthopedic doctors found"
        print(f"PASS: Found {len(orthopedic_doctors)} orthopedic doctors")
    
    def test_general_surgery_doctors_exist(self):
        """Verify general surgery doctors exist for cancer care hub"""
        response = requests.get(f"{BASE_URL}/api/doctors")
        doctors = response.json()
        
        surgery_doctors = [d for d in doctors if d.get("department") == "General Surgery"]
        assert len(surgery_doctors) > 0, "No general surgery doctors found"
        print(f"PASS: Found {len(surgery_doctors)} general surgery doctors")
    
    def test_get_single_doctor(self):
        """Test fetching a single doctor by ID"""
        response = requests.get(f"{BASE_URL}/api/doctors/dr-gajanan-deshmukh")
        assert response.status_code == 200
        doctor = response.json()
        assert doctor["name"] == "Dr. Gajanan Deshmukh"
        assert doctor["department"] == "Orthopedics"
        print("PASS: Single doctor fetch working")
    
    def test_doctor_not_found(self):
        """Test 404 for non-existent doctor"""
        response = requests.get(f"{BASE_URL}/api/doctors/non-existent-doctor")
        assert response.status_code == 404
        print("PASS: 404 returned for non-existent doctor")


class Test301Redirects:
    """Tests for 301 redirects from old URLs to new hub pages"""
    
    def test_orthopedics_redirect(self):
        """Test redirect from /api/redirect/orthopedics to /knee-replacement"""
        response = requests.get(f"{BASE_URL}/api/redirect/orthopedics", allow_redirects=False)
        assert response.status_code == 301
        # The location should be relative path
        assert "/knee-replacement" in response.headers.get("location", "")
        print("PASS: Orthopedics redirect returns 301")
    
    def test_joint_replacement_redirect(self):
        """Test redirect from /api/redirect/joint-replacement to /knee-replacement"""
        response = requests.get(f"{BASE_URL}/api/redirect/joint-replacement", allow_redirects=False)
        assert response.status_code == 301
        assert "/knee-replacement" in response.headers.get("location", "")
        print("PASS: Joint replacement redirect returns 301")
    
    def test_bone_surgery_redirect(self):
        """Test redirect from /api/redirect/bone-surgery to /knee-replacement"""
        response = requests.get(f"{BASE_URL}/api/redirect/bone-surgery", allow_redirects=False)
        assert response.status_code == 301
        assert "/knee-replacement" in response.headers.get("location", "")
        print("PASS: Bone surgery redirect returns 301")
    
    def test_oncology_redirect(self):
        """Test redirect from /api/redirect/oncology to /cancer-care"""
        response = requests.get(f"{BASE_URL}/api/redirect/oncology", allow_redirects=False)
        assert response.status_code == 301
        assert "/cancer-care" in response.headers.get("location", "")
        print("PASS: Oncology redirect returns 301")
    
    def test_cancer_treatment_redirect(self):
        """Test redirect from /api/redirect/cancer-treatment to /cancer-care"""
        response = requests.get(f"{BASE_URL}/api/redirect/cancer-treatment", allow_redirects=False)
        assert response.status_code == 301
        assert "/cancer-care" in response.headers.get("location", "")
        print("PASS: Cancer treatment redirect returns 301")
    
    def test_back_surgery_redirect(self):
        """Test redirect from /api/redirect/back-surgery to /spine-surgery"""
        response = requests.get(f"{BASE_URL}/api/redirect/back-surgery", allow_redirects=False)
        assert response.status_code == 301
        assert "/spine-surgery" in response.headers.get("location", "")
        print("PASS: Back surgery redirect returns 301")
    
    def test_spine_care_redirect(self):
        """Test redirect from /api/redirect/spine-care to /spine-surgery"""
        response = requests.get(f"{BASE_URL}/api/redirect/spine-care", allow_redirects=False)
        assert response.status_code == 301
        assert "/spine-surgery" in response.headers.get("location", "")
        print("PASS: Spine care redirect returns 301")


class TestAppointmentsAPI:
    """Appointments API tests - critical for booking CTAs on hub pages"""
    
    def test_create_appointment(self):
        """Test creating a new appointment via hub page CTA"""
        appointment_data = {
            "patient_name": "TEST_Hub_Patient",
            "phone": "9876543210",
            "email": "test@example.com",
            "department": "orthopedics",
            "preferred_date": "2026-03-15",
            "preferred_time": "10:00 AM",
            "message": "Knee replacement consultation",
            "is_esic": False
        }
        response = requests.post(f"{BASE_URL}/api/appointments", json=appointment_data)
        assert response.status_code == 200
        data = response.json()
        assert data["patient_name"] == "TEST_Hub_Patient"
        assert data["department"] == "orthopedics"
        print("PASS: Appointment created successfully")
    
    def test_create_appointment_esic_patient(self):
        """Test creating appointment for ESIC patient"""
        appointment_data = {
            "patient_name": "TEST_ESIC_Patient",
            "phone": "9876543211",
            "department": "surgery",
            "preferred_date": "2026-03-16",
            "preferred_time": "11:00 AM",
            "is_esic": True
        }
        response = requests.post(f"{BASE_URL}/api/appointments", json=appointment_data)
        assert response.status_code == 200
        data = response.json()
        assert data["is_esic"] == True
        print("PASS: ESIC appointment created")
    
    def test_get_appointments(self):
        """Test fetching appointments list"""
        response = requests.get(f"{BASE_URL}/api/appointments")
        assert response.status_code == 200
        appointments = response.json()
        assert isinstance(appointments, list)
        print(f"PASS: Fetched {len(appointments)} appointments")


class TestServicesAPI:
    """Services API tests"""
    
    def test_get_services(self):
        """Test fetching all services"""
        response = requests.get(f"{BASE_URL}/api/services")
        assert response.status_code == 200
        services = response.json()
        assert isinstance(services, list)
        assert len(services) > 0
        print(f"PASS: Found {len(services)} services")
    
    def test_orthopedics_service_exists(self):
        """Verify orthopedics service exists"""
        response = requests.get(f"{BASE_URL}/api/services/orthopedics")
        assert response.status_code == 200
        service = response.json()
        assert service["name"] == "Orthopedics"
        print("PASS: Orthopedics service exists")


class TestSitemapAndRobots:
    """Test sitemap and robots.txt include hub pages"""
    
    def test_sitemap_includes_hub_pages(self):
        """Verify sitemap includes specialty hub pages"""
        response = requests.get(f"{BASE_URL}/api/sitemap.xml")
        assert response.status_code == 200
        sitemap_content = response.text
        
        # Check all hub pages are in sitemap
        hub_pages = ["/knee-replacement", "/hip-replacement", "/spine-surgery", "/cancer-care"]
        for hub_page in hub_pages:
            assert hub_page in sitemap_content, f"Hub page {hub_page} not in sitemap"
        print("PASS: All hub pages in sitemap")
    
    def test_robots_allows_hub_pages(self):
        """Verify robots.txt allows hub pages"""
        response = requests.get(f"{BASE_URL}/api/robots.txt")
        assert response.status_code == 200
        robots_content = response.text
        
        hub_pages = ["knee-replacement", "hip-replacement", "spine-surgery", "cancer-care"]
        for hub_page in hub_pages:
            assert hub_page in robots_content, f"Hub page {hub_page} not in robots.txt"
        print("PASS: All hub pages allowed in robots.txt")


class TestHospitalInfo:
    """Hospital info API tests"""
    
    def test_get_hospital_info(self):
        """Test fetching hospital information"""
        response = requests.get(f"{BASE_URL}/api/hospital-info")
        assert response.status_code == 200
        info = response.json()
        assert info["name"] == "Sunshine Hospital"
        assert "phones" in info
        print("PASS: Hospital info retrieved")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
