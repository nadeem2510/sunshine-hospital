"""
One-shot migration: replace Emergent CDN image URLs in MongoDB Atlas
with self-hosted paths served from the React frontend's public/images/ folder.

Usage:
    pip install motor asyncio
    MONGO_URL="mongodb+srv://..." python migrate_image_urls.py
"""

import asyncio
import os
import sys

try:
    from motor.motor_asyncio import AsyncIOMotorClient
except ImportError:
    print("ERROR: Install motor first: pip install motor")
    sys.exit(1)

MONGO_URL = os.environ.get("MONGO_URL")
DB_NAME = os.environ.get("DB_NAME", "test_database")

if not MONGO_URL:
    print("ERROR: Set MONGO_URL environment variable to your MongoDB Atlas connection string.")
    print("  Example: MONGO_URL='mongodb+srv://user:pass@cluster.mongodb.net' python migrate_image_urls.py")
    sys.exit(1)

DOCTOR_IMAGE_MAP = {
    # old Emergent CDN URL fragment -> new self-hosted path
    "ffi1eteu_Dr%20Nadim%20Shaikh.png": "/images/doctors/dr-nadeem-shaikh.png",
    "e558rx4q_Dr%20Gajanan%20Deshmukh.png": "/images/doctors/dr-gajanan-deshmukh.png",
    "6gtcn8os_Dr%20Mubasheer%20Quazi.png": "/images/doctors/dr-mubasheer-qazi.png",
    "4t1c42vk_Dr%20Ajeya%20Ukadgaokar.png": "/images/doctors/dr-ajeya-ukadgaonkar.png",
    "0cs6fo5g_Dr%20Rahul%20Ruikar.png": "/images/doctors/dr-rahul-ruikar.png",
    "bzzoxaga_DR%20AAKASH%20GORE.jpeg": "/images/doctors/dr-aakash-gore.jpeg",
    "n6y9kh4g_Dr%20Saleha%20Kausar.png": "/images/doctors/dr-saleha-kausar.png",
    "rxhaft4d_Dr%20Rachna%20Pole.png": "/images/doctors/dr-rachna-pole.png",
}

SERVICE_IMAGE_MAP = {
    "uaeebm62_hospital%20reception%20view%202.jpeg": "/images/services/icu.jpeg",
    "ecs8c3fa_hospital%20front%20view.jpeg": "/images/services/trauma-center.jpeg",
    "p9gfbhd5_hospital%20reception%20view.jpeg": "/images/services/general-surgery.jpeg",
    "jvlmpt6c_WAITING%20AREA%202.jpeg": "/images/services/orthopedics.jpeg",
}

EMERGENT_PREFIX = "https://customer-assets.emergentagent.com/job_esic-cashless-med/artifacts/"


def resolve_new_url(old_url: str, image_map: dict) -> str | None:
    if not old_url or EMERGENT_PREFIX not in old_url:
        return None
    fragment = old_url.replace(EMERGENT_PREFIX, "")
    return image_map.get(fragment)


async def migrate():
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]

    # --- Doctors ---
    doctors_updated = 0
    async for doc in db.doctors.find({}):
        old_url = doc.get("image", "")
        new_url = resolve_new_url(old_url, DOCTOR_IMAGE_MAP)
        if new_url:
            result = await db.doctors.update_one(
                {"_id": doc["_id"]},
                {"$set": {"image": new_url}}
            )
            if result.modified_count:
                print(f"  doctors: {doc.get('name', doc['_id'])} -> {new_url}")
                doctors_updated += 1

    # --- Services ---
    services_updated = 0
    async for doc in db.services.find({}):
        old_url = doc.get("image", "")
        # icu and general-medicine share the same old URL; use slug to differentiate
        slug = doc.get("slug", doc.get("id", ""))
        if EMERGENT_PREFIX in (old_url or ""):
            fragment = old_url.replace(EMERGENT_PREFIX, "")
            if fragment == "uaeebm62_hospital%20reception%20view%202.jpeg":
                # two services share this image; pick based on slug
                if "general-medicine" in slug:
                    new_url = "/images/services/general-medicine.jpeg"
                else:
                    new_url = "/images/services/icu.jpeg"
            else:
                new_url = SERVICE_IMAGE_MAP.get(fragment)

            if new_url:
                result = await db.services.update_one(
                    {"_id": doc["_id"]},
                    {"$set": {"image": new_url}}
                )
                if result.modified_count:
                    print(f"  services: {doc.get('name', doc['_id'])} -> {new_url}")
                    services_updated += 1

    client.close()
    print(f"\nDone. Doctors updated: {doctors_updated}, Services updated: {services_updated}")


if __name__ == "__main__":
    print(f"Connecting to MongoDB ({DB_NAME})...")
    asyncio.run(migrate())
