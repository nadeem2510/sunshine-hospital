#!/usr/bin/env python3
"""
Sunshine Hospital - GMB Auto-Post Script
Uses Claude AI to generate engaging Google My Business posts
and publishes them via Google Business Profile API

SETUP INSTRUCTIONS:
==================
1. Go to: https://console.cloud.google.com/
2. Create new project: "sunshine-hospital-gmb"
3. Enable "My Business Business Information API" + "My Business Posts API"
4. Create OAuth 2.0 credentials (Desktop App type)
5. Download client_secrets.json -> put in same folder as this script
6. pip install google-auth google-auth-oauthlib google-auth-httplib2 google-api-python-client anthropic python-dotenv
7. First run: python gmb_automation.py --auth
8. Get location ID: python gmb_automation.py --get-locations
9. Set GMB_LOCATION_ID in .env file
10. Schedule: python gmb_automation.py --post-type health_tip

WEEKLY SCHEDULE (recommended cron):
0 10 * * 1 python gmb_automation.py --post-type health_tip
0 10 * * 2 python gmb_automation.py --post-type doctor_spotlight
0 10 * * 3 python gmb_automation.py --post-type service_highlight
0 10 * * 4 python gmb_automation.py --post-type esic_awareness
0 10 * * 5 python gmb_automation.py --post-type seasonal

.env file needed:
ANTHROPIC_API_KEY=sk-ant-...
GMB_LOCATION_ID=accounts/123456/locations/789012
"""

import os
import json
import argparse
import pickle
import sys
from datetime import datetime
from pathlib import Path

# ========================
# HOSPITAL CONFIGURATION
# ========================
HOSPITAL_INFO = {
    "name": "Sunshine Hospital",
    "location": "Chhatrapati Sambhajinagar (Aurangabad), Maharashtra",
    "phone": "91305 61222",
    "website": "https://www.sunshinehospital.org",
    "specialties": [
        "ESIC Cashless Treatment", "Spine Surgery", "Cancer Surgery",
        "Knee Replacement", "Hip Replacement", "ICU", "Trauma Care",
        "General Surgery", "Orthopedics", "General Medicine"
    ],
    "doctors": [
        "Dr. Nadeem Shaikh - Director & Consulting Physician",
        "Dr. Gajanan Deshmukh - Orthopedic Surgeon",
        "Dr. Mubasheer Qazi - Spine Surgeon",
        "Dr. Ajeya Ukadgaonkar - Laparoscopic Surgeon",
        "Dr. Rahul Ruikar - General Surgeon",
        "Dr. Aakash Gore - General Medicine",
        "Dr. Saleha Kausar - Gynecology",
        "Dr. Rachna Pole - Gynecology",
    ],
    "schemes": ["ESIC", "MJPJAY", "PMJAY (Ayushman Bharat)"],
}

SCOPES = ["https://www.googleapis.com/auth/business.manage"]
TOKEN_FILE = "gmb_token.pickle"
CREDENTIALS_FILE = "client_secrets.json"


# ========================
# GOOGLE OAUTH
# ========================
def get_gmb_credentials():
    """Get or refresh Google OAuth 2.0 credentials."""
    creds = None

    if Path(TOKEN_FILE).exists():
        with open(TOKEN_FILE, "rb") as f:
            creds = pickle.load(f)

    if not creds or not creds.valid:
        try:
            from google.auth.transport.requests import Request
            from google_auth_oauthlib.flow import InstalledAppFlow
        except ImportError:
            print("ERROR: Install google-auth-oauthlib:")
            print("  pip install google-auth google-auth-oauthlib google-auth-httplib2 google-api-python-client")
            return None

        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            if not Path(CREDENTIALS_FILE).exists():
                print(f"ERROR: {CREDENTIALS_FILE} not found!")
                print("Download from Google Cloud Console > APIs & Services > Credentials")
                return None
            flow = InstalledAppFlow.from_client_secrets_file(CREDENTIALS_FILE, SCOPES)
            creds = flow.run_local_server(port=0)

        with open(TOKEN_FILE, "wb") as f:
            pickle.dump(creds, f)
        print(f"Token saved to {TOKEN_FILE}")

    return creds


# ========================
# CLAUDE AI POST GENERATOR
# ========================
def generate_gmb_post(post_type: str, custom_context: str = None) -> dict:
    """
    Use Claude AI to generate an engaging GMB post.
    Returns dict with summary, callToAction, languageCode.
    """
    try:
        import anthropic
    except ImportError:
        print("ERROR: Install anthropic: pip install anthropic")
        return None

    api_key = os.getenv("ANTHROPIC_API_KEY")
    if not api_key:
        print("ERROR: ANTHROPIC_API_KEY not set in .env or environment")
        return None

    client = anthropic.Anthropic(api_key=api_key)

    current_month = datetime.now().strftime("%B")
    specs = ", ".join(HOSPITAL_INFO["specialties"][:5])
    docs = "\n".join([f"  - {d}" for d in HOSPITAL_INFO["doctors"]])
    schemes = ", ".join(HOSPITAL_INFO["schemes"])

    prompts = {
        "health_tip": f"""Write a Google My Business post for {HOSPITAL_INFO["name"]} in {HOSPITAL_INFO["location"]}.
Topic: A practical, actionable health tip (choose from: joint health, diabetes, spine care, women's health, ESIC benefits, monsoon health)
Requirements:
- 150-200 words, warm and helpful tone
- Mention our specialties: {specs}
- Mention cashless treatment: {schemes}
- End with: Book appointment - Call {HOSPITAL_INFO["phone"]} or visit {HOSPITAL_INFO["website"]}
- Add 3-5 relevant hashtags at the end
Output: Only the post text, no labels.""",

        "doctor_spotlight": f"""Write a Google My Business doctor spotlight post for {HOSPITAL_INFO["name"]}.
Choose one doctor and highlight them:
{docs}
Requirements:
- 150-180 words, professional yet warm tone
- Highlight their expertise and specialization
- Mention cashless treatment availability ({schemes})
- End with: Book with [Doctor Name] - Call {HOSPITAL_INFO["phone"]}
- Add hashtags: #SunshineHospital #[Specialty] #Sambhajinagar
Output: Only the post text, no labels.""",

        "service_highlight": f"""Write a Google My Business service spotlight post for {HOSPITAL_INFO["name"]} in {HOSPITAL_INFO["location"]}.
Choose one service: {", ".join(HOSPITAL_INFO["specialties"])}
Requirements:
- 150-180 words, informative tone
- Explain what the service treats and benefits to patients
- Mention 100% cashless under {schemes}
- Strong CTA: Call {HOSPITAL_INFO["phone"]} or visit {HOSPITAL_INFO["website"]}
- Hashtags related to the service and location
Output: Only the post text, no labels.""",

        "esic_awareness": f"""Write a Google My Business post about ESIC cashless treatment at {HOSPITAL_INFO["name"]}.
Requirements:
- 150-200 words, simple language (mix of English + a few Marathi/Hindi words is fine)
- Educate ESIC workers: all surgeries, OPD, emergencies are FREE with E-Pehchan card
- Mention: ICU, trauma, orthopedics, spine surgery - all covered
- Hospital location: Waluj & Chikalthana area, Sambhajinagar
- CTA: Just walk in with your E-Pehchan card or call {HOSPITAL_INFO["phone"]}
- Hashtags: #ESIC #ESICSambhajinagar #CashlessTreatment #SunshineHospital
Output: Only the post text, no labels.""",

        "seasonal": f"""Write a seasonal health awareness Google My Business post for {HOSPITAL_INFO["name"]}.
Current month: {current_month}
Requirements:
- 150-180 words based on {current_month} health concerns
- Summer: heat stroke, dehydration, skin issues
- Monsoon: infections, mosquito diseases, waterborne illness
- Winter: joint pain, respiratory, cold & flu
- Tie it to our services: {specs}
- Mention cashless treatment: {schemes}
- CTA: {HOSPITAL_INFO["phone"]} | {HOSPITAL_INFO["website"]}
- Relevant seasonal hashtags
Output: Only the post text, no labels.""",

        "custom": custom_context or f"Write an engaging GMB post for {HOSPITAL_INFO['name']} in {HOSPITAL_INFO['location']}. Include CTA: {HOSPITAL_INFO['phone']}",
    }

    prompt = prompts.get(post_type, prompts["health_tip"])

    print(f"Generating '{post_type}' post with Claude AI...")

    message = client.messages.create(
        model="claude-opus-4-5",
        max_tokens=600,
        messages=[{"role": "user", "content": prompt}],
    )

    post_text = message.content[0].text.strip()

    cta_map = {
        "health_tip": "LEARN_MORE",
        "doctor_spotlight": "BOOK",
        "service_highlight": "BOOK",
        "esic_awareness": "LEARN_MORE",
        "seasonal": "CALL",
        "custom": "LEARN_MORE",
    }

    return {
        "summary": post_text,
        "languageCode": "en-IN",
        "callToAction": {
            "actionType": cta_map.get(post_type, "LEARN_MORE"),
            "url": HOSPITAL_INFO["website"],
        },
    }


# ========================
# GMB API OPERATIONS
# ========================
def get_locations(creds):
    """List all GMB accounts and locations to find Location ID."""
    try:
        from googleapiclient.discovery import build
    except ImportError:
        print("ERROR: pip install google-api-python-client")
        return

    print("\nFetching your Google My Business locations...")
    print("=" * 50)

    service = build("mybusinessaccountmanagement", "v1", credentials=creds)
    accounts_result = service.accounts().list().execute()

    if "accounts" not in accounts_result:
        print("No GMB accounts found. Make sure Business Profile API is enabled.")
        return

    info_service = build("mybusinessbusinessinformation", "v1", credentials=creds)

    for account in accounts_result["accounts"]:
        account_name = account["name"]
        print(f"\nAccount: {account_name}")
        print(f"  Type: {account.get('type', 'N/A')}")

        try:
            locations = info_service.accounts().locations().list(
                parent=account_name,
                readMask="name,title,phoneNumbers,storefrontAddress"
            ).execute()

            if "locations" in locations:
                for loc in locations["locations"]:
                    print(f"\n  LOCATION FOUND:")
                    print(f"    Location ID : {loc['name']}")
                    print(f"    Title       : {loc.get('title', 'N/A')}")
                    phone = loc.get("phoneNumbers", {}).get("primaryPhone", "N/A")
                    print(f"    Phone       : {phone}")
                    print(f"\n  *** ADD TO .env: ***")
                    print(f"  GMB_LOCATION_ID={loc['name']}")
            else:
                print("  No locations found in this account.")
        except Exception as e:
            print(f"  Error fetching locations: {e}")


def post_to_gmb(creds, location_id: str, post_data: dict) -> dict:
    """Publish a post to Google My Business via Posts API."""
    try:
        from googleapiclient.discovery import build
    except ImportError:
        print("ERROR: pip install google-api-python-client")
        return None

    print(f"\nPublishing post to GMB location: {location_id}")

    # Use the My Business Posts API
    service = build(
        "mybusiness",
        "v4",
        credentials=creds,
        discoveryServiceUrl="https://mybusiness.googleapis.com/$discovery/rest?version=v4",
    )

    post_body = {
        "languageCode": post_data.get("languageCode", "en-IN"),
        "summary": post_data["summary"],
        "topicType": "STANDARD",
        "callToAction": post_data.get(
            "callToAction",
            {"actionType": "LEARN_MORE", "url": HOSPITAL_INFO["website"]},
        ),
    }

    result = (
        service.accounts()
        .locations()
        .localPosts()
        .create(parent=location_id, body=post_body)
        .execute()
    )

    return result


# ========================
# MAIN CLI
# ========================
def main():
    parser = argparse.ArgumentParser(
        description="Sunshine Hospital GMB Auto-Poster powered by Claude AI",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # First time setup:
  python gmb_automation.py --auth
  python gmb_automation.py --get-locations

  # Generate post without publishing:
  python gmb_automation.py --post-type health_tip --dry-run

  # Publish a post:
  python gmb_automation.py --post-type esic_awareness

  # Custom post:
  python gmb_automation.py --post-type custom --custom-context "Announce new spine surgery OPD every Tuesday 4-6 PM"

  # Show weekly schedule:
  python gmb_automation.py --schedule
        """,
    )

    parser.add_argument("--auth", action="store_true", help="Run OAuth authentication")
    parser.add_argument("--get-locations", action="store_true", help="List GMB Location IDs")
    parser.add_argument(
        "--post-type",
        choices=["health_tip", "doctor_spotlight", "service_highlight", "esic_awareness", "seasonal", "custom"],
        help="Type of GMB post to generate",
    )
    parser.add_argument("--custom-context", type=str, help="Context for custom post type")
    parser.add_argument("--dry-run", action="store_true", help="Generate post but do NOT publish")
    parser.add_argument("--schedule", action="store_true", help="Show recommended weekly schedule")

    args = parser.parse_args()

    print("Sunshine Hospital - GMB Auto-Poster")
    print("Powered by Claude AI")
    print("=" * 45)

    # Load .env
    try:
        from dotenv import load_dotenv
        load_dotenv()
        print("Loaded .env file")
    except ImportError:
        pass

    if args.schedule:
        print("\nRECOMMENDED WEEKLY GMB POSTING SCHEDULE")
        print("=" * 50)
        schedule = [
            ("Monday    10 AM", "health_tip", "Health tip / awareness"),
            ("Tuesday   10 AM", "doctor_spotlight", "Doctor spotlight"),
            ("Wednesday 10 AM", "service_highlight", "Service highlight"),
            ("Thursday  10 AM", "esic_awareness", "ESIC cashless awareness"),
            ("Friday    10 AM", "seasonal", "Seasonal health tip"),
        ]
        for day, ptype, desc in schedule:
            print(f"  {day} : {desc}")
            print(f"           python gmb_automation.py --post-type {ptype}")
            print()
        print("CRON SETUP (add to crontab -e):")
        print("  0 10 * * 1 cd /path/to/script && python gmb_automation.py --post-type health_tip")
        print("  0 10 * * 2 cd /path/to/script && python gmb_automation.py --post-type doctor_spotlight")
        print("  0 10 * * 3 cd /path/to/script && python gmb_automation.py --post-type service_highlight")
        print("  0 10 * * 4 cd /path/to/script && python gmb_automation.py --post-type esic_awareness")
        print("  0 10 * * 5 cd /path/to/script && python gmb_automation.py --post-type seasonal")
        return

    creds = get_gmb_credentials()
    if not creds:
        print("\nFailed to get credentials. Run: python gmb_automation.py --auth")
        return

    if args.auth:
        print("\nAuthentication successful! Token saved to gmb_token.pickle")
        print("Next step: python gmb_automation.py --get-locations")
        return

    if args.get_locations:
        get_locations(creds)
        return

    if args.post_type:
        post_data = generate_gmb_post(args.post_type, args.custom_context)
        if not post_data:
            return

        print("\nGENERATED POST PREVIEW:")
        print("=" * 50)
        print(post_data["summary"])
        print("=" * 50)
        print(f"CTA: {post_data['callToAction']['actionType']} -> {post_data['callToAction']['url']}")
        print(f"Language: {post_data['languageCode']}")
        print(f"Word count: {len(post_data['summary'].split())}")

        if args.dry_run:
            print("\nDRY RUN - Post NOT published.")
            print("Remove --dry-run flag to publish.")
            return

        location_id = os.getenv("GMB_LOCATION_ID")
        if not location_id:
            print("\nERROR: GMB_LOCATION_ID not set!")
            print("Run: python gmb_automation.py --get-locations")
            print("Then add to .env: GMB_LOCATION_ID=accounts/XXX/locations/YYY")
            return

        result = post_to_gmb(creds, location_id, post_data)
        if result:
            print(f"\nPost published successfully!")
            print(f"  Post ID : {result.get('name', 'N/A')}")
            print(f"  State   : {result.get('state', 'N/A')}")
        else:
            print("\nFailed to publish post.")
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
