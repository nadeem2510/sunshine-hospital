import requests
import sys
from datetime import datetime
import json

class SunshineHospitalAPITester:
    def __init__(self, base_url="https://esic-cashless-med.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.failures = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            
            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                return True, response.json() if response.content else {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}...")
                self.failures.append({
                    "test": name,
                    "endpoint": endpoint,
                    "expected": expected_status,
                    "actual": response.status_code,
                    "response": response.text[:200]
                })
                return False, {}

        except requests.exceptions.RequestException as e:
            print(f"❌ Failed - Connection Error: {str(e)}")
            self.failures.append({
                "test": name,
                "endpoint": endpoint,
                "error": str(e)
            })
            return False, {}

    def test_health_endpoints(self):
        """Test basic health and info endpoints"""
        print("\n" + "="*50)
        print("TESTING BASIC ENDPOINTS")
        print("="*50)
        
        # Test root endpoint
        self.run_test("Root API", "GET", "api/", 200)
        
        # Test health check
        self.run_test("Health Check", "GET", "api/health", 200)
        
        # Test hospital info
        self.run_test("Hospital Info", "GET", "api/hospital-info", 200)

    def test_doctors_api(self):
        """Test doctors API endpoints"""
        print("\n" + "="*50)
        print("TESTING DOCTORS API")
        print("="*50)
        
        # Get all doctors
        success, doctors_data = self.run_test("Get All Doctors", "GET", "api/doctors", 200)
        
        if success and doctors_data:
            print(f"   Found {len(doctors_data)} doctors")
            
            # Test individual doctor endpoints
            for doctor in doctors_data[:2]:  # Test first 2 doctors
                doctor_id = doctor.get('id')
                if doctor_id:
                    self.run_test(f"Get Doctor {doctor_id}", "GET", f"api/doctors/{doctor_id}", 200)
            
            # Test non-existent doctor
            self.run_test("Get Non-existent Doctor", "GET", "api/doctors/invalid-id", 404)

    def test_services_api(self):
        """Test services API endpoints"""
        print("\n" + "="*50)
        print("TESTING SERVICES API")
        print("="*50)
        
        # Get all services
        success, services_data = self.run_test("Get All Services", "GET", "api/services", 200)
        
        if success and services_data:
            print(f"   Found {len(services_data)} services")
            
            # Test individual service endpoints
            for service in services_data[:3]:  # Test first 3 services
                service_slug = service.get('slug')
                if service_slug:
                    self.run_test(f"Get Service {service_slug}", "GET", f"api/services/{service_slug}", 200)
            
            # Test non-existent service
            self.run_test("Get Non-existent Service", "GET", "api/services/invalid-slug", 404)

    def test_appointments_api(self):
        """Test appointments API"""
        print("\n" + "="*50)
        print("TESTING APPOINTMENTS API")
        print("="*50)
        
        # Create appointment
        appointment_data = {
            "patient_name": f"Test Patient {datetime.now().strftime('%H%M%S')}",
            "phone": "9876543210",
            "email": "test@example.com",
            "department": "general_medicine",
            "preferred_date": "2024-12-25",
            "preferred_time": "10:00 AM",
            "message": "Test appointment",
            "is_esic": False
        }
        
        success, response = self.run_test("Create Appointment", "POST", "api/appointments", 200, appointment_data)
        
        if success:
            print(f"   Appointment ID: {response.get('id', 'N/A')}")
        
        # Get appointments
        self.run_test("Get All Appointments", "GET", "api/appointments", 200)

    def test_esic_inquiry_api(self):
        """Test ESIC inquiry API"""
        print("\n" + "="*50)
        print("TESTING ESIC INQUIRY API")
        print("="*50)
        
        # Create ESIC inquiry
        esic_data = {
            "name": f"Test User {datetime.now().strftime('%H%M%S')}",
            "phone": "9876543210",
            "has_epehchan": True,
            "has_referral": True,
            "esic_number": "12345678901234567890",
            "employer_name": "Test Company",
            "message": "Test ESIC inquiry"
        }
        
        success, response = self.run_test("Create ESIC Inquiry", "POST", "api/esic-inquiry", 200, esic_data)
        
        if success:
            print(f"   Inquiry ID: {response.get('id', 'N/A')}")
            print(f"   Eligible: {response.get('is_eligible', 'N/A')}")
        
        # Get ESIC inquiries
        self.run_test("Get All ESIC Inquiries", "GET", "api/esic-inquiries", 200)

    def test_contact_api(self):
        """Test contact form API"""
        print("\n" + "="*50)
        print("TESTING CONTACT API")
        print("="*50)
        
        # Create contact
        contact_data = {
            "name": f"Test Contact {datetime.now().strftime('%H%M%S')}",
            "phone": "9876543210",
            "email": "contact@example.com",
            "subject": "Test Subject",
            "message": "This is a test contact message"
        }
        
        success, response = self.run_test("Create Contact", "POST", "api/contact", 200, contact_data)
        
        if success:
            print(f"   Contact ID: {response.get('id', 'N/A')}")

    def test_data_validation(self):
        """Test API validation with invalid data"""
        print("\n" + "="*50)
        print("TESTING DATA VALIDATION")
        print("="*50)
        
        # Test appointment with missing fields
        invalid_appointment = {
            "patient_name": "",  # Empty name
            "phone": "123",  # Too short
            "department": "invalid_dept"  # Invalid department
        }
        self.run_test("Invalid Appointment Data", "POST", "api/appointments", 422, invalid_appointment)
        
        # Test ESIC inquiry with missing required fields
        invalid_esic = {
            "name": "",  # Empty name
            "phone": ""  # Empty phone
        }
        self.run_test("Invalid ESIC Data", "POST", "api/esic-inquiry", 422, invalid_esic)

    def run_all_tests(self):
        """Run all API tests"""
        print("🏥 SUNSHINE HOSPITAL API TESTING")
        print(f"🌐 Testing against: {self.base_url}")
        print("⏰ Started at:", datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
        
        # Run test suites
        self.test_health_endpoints()
        self.test_doctors_api() 
        self.test_services_api()
        self.test_appointments_api()
        self.test_esic_inquiry_api()
        self.test_contact_api()
        self.test_data_validation()
        
        # Print final results
        print("\n" + "="*60)
        print("🎯 FINAL TEST RESULTS")
        print("="*60)
        print(f"✅ Tests passed: {self.tests_passed}/{self.tests_run}")
        print(f"❌ Tests failed: {len(self.failures)}")
        success_rate = (self.tests_passed / self.tests_run * 100) if self.tests_run > 0 else 0
        print(f"📊 Success rate: {success_rate:.1f}%")
        
        if self.failures:
            print("\n🚨 FAILED TESTS:")
            for i, failure in enumerate(self.failures, 1):
                print(f"{i}. {failure['test']} - {failure['endpoint']}")
                if 'expected' in failure:
                    print(f"   Expected: {failure['expected']}, Got: {failure['actual']}")
                if 'error' in failure:
                    print(f"   Error: {failure['error']}")
        
        return self.tests_passed == self.tests_run

def main():
    tester = SunshineHospitalAPITester()
    success = tester.run_all_tests()
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())