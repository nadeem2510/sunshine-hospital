import os
import json
import re
import urllib.request
from datetime import datetime, timezone

TOPICS = [
    {"topic": "ESIC Cashless Treatment Benefits for Industrial Workers in Sambhajinagar", "category": "esic_info", "keywords": ["ESIC cashless treatment Sambhajinagar", "ESIC hospital Waluj", "cashless treatment Chikalthana", "ESIC empanelled hospital"]},
    {"topic": "Spine Surgery in Sambhajinagar: Expert Care at Sunshine Hospital", "category": "surgery", "keywords": ["spine surgery Sambhajinagar", "back pain treatment Aurangabad", "disc herniation surgery", "ESIC spine surgery"]},
    {"topic": "Cancer Surgery at Sunshine Hospital: ESIC and MJPJAY Cashless Treatment", "category": "surgery", "keywords": ["cancer surgery Sambhajinagar", "oncology hospital Aurangabad", "ESIC cancer treatment", "cancer hospital Maharashtra"]},
    {"topic": "Kidney Stone Surgery: Minimally Invasive Laser Treatment in Sambhajinagar", "category": "surgery", "keywords": ["kidney stone surgery Sambhajinagar", "urolithiasis treatment", "laser kidney stone Aurangabad", "ESIC kidney treatment"]},
    {"topic": "Knee Replacement Surgery: Complete Guide for Patients in Sambhajinagar", "category": "orthopedics", "keywords": ["knee replacement Sambhajinagar", "joint replacement Aurangabad", "knee surgery cost", "ESIC knee replacement"]},
    {"topic": "MJPJAY and PMJAY: Complete Guide to Free Hospital Treatment in Maharashtra", "category": "esic_info", "keywords": ["MJPJAY hospital Sambhajinagar", "PMJAY Ayushman Bharat", "free treatment Maharashtra", "cashless hospital"]},
    {"topic": "Hip Replacement Surgery: When You Need It and What to Expect", "category": "orthopedics", "keywords": ["hip replacement Sambhajinagar", "hip surgery Aurangabad", "hip pain treatment", "ESIC hip replacement"]},
    {"topic": "24/7 Emergency Care: Sunshine Hospital Trauma Center Sambhajinagar", "category": "general_health", "keywords": ["emergency hospital Sambhajinagar", "24 hour hospital Aurangabad", "trauma center", "accident emergency"]},
]

def main():
    api_key = os.environ.get('ANTHROPIC_API_KEY')
    backend_url = os.environ.get('BACKEND_URL', 'https://sunshine-hospital-backend.onrender.com')
    
    if not api_key:
        print("ERROR: No ANTHROPIC_API_KEY secret found")
        exit(1)
    
    week_num = datetime.now(timezone.utc).isocalendar()[1]
    topic = TOPICS[week_num % len(TOPICS)]
    print(f"Generating blog: {topic['topic']}")
    
    prompt = f"""Write a detailed SEO-optimized medical blog post for Sunshine Hospital's website.

Topic: {topic['topic']}
Hospital: Sunshine Hospital, Chhatrapati Sambhajinagar (Aurangabad), Maharashtra, India
Phone: 91305 61222
Target Keywords: {', '.join(topic['keywords'])}

Requirements:
- Professional medical writing style in English
- 600-800 words of content
- Use HTML tags: <h2>, <p>, <ul>, <li>
- Mention that ESIC, MJPJAY, PMJAY cashless treatment is available at Sunshine Hospital
- End with a call-to-action paragraph with phone number 91305 61222
- Focus on helping patients understand when and why to seek treatment

Return ONLY a valid JSON object with no other text or markdown:
{{
  "title": "SEO title under 70 characters",
  "slug": "url-friendly-slug",
  "excerpt": "150-160 character meta description for Google",
  "content": "<h2>Introduction</h2><p>...</p>... full HTML content",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"]
}}"""

    payload = json.dumps({
        "model": "claude-haiku-4-5-20251001",
        "max_tokens": 2500,
        "messages": [{"role": "user", "content": prompt}]
    }).encode('utf-8')
    
    req = urllib.request.Request(
        'https://api.anthropic.com/v1/messages',
        data=payload,
        headers={
            'Content-Type': 'application/json',
            'x-api-key': api_key,
            'anthropic-version': '2023-06-01'
        },
        method='POST'
    )
    
    print("Calling Claude API...")
    with urllib.request.urlopen(req, timeout=60) as resp:
        result = json.loads(resp.read().decode('utf-8'))
    
    text = result['content'][0]['text'].strip()
    json_match = re.search(r'\{[\s\S]*\}', text)
    if not json_match:
        print("ERROR: Could not extract JSON from Claude response")
        print("Response:", text[:500])
        exit(1)
    
    blog = json.loads(json_match.group())
    
    date_str = datetime.now(timezone.utc).strftime('%Y-%m')
    slug = blog['slug'].strip('-') + '-' + date_str
    
    post_data = json.dumps({
        "title": blog['title'],
        "slug": slug,
        "excerpt": blog['excerpt'],
        "content": blog['content'],
        "category": topic['category'],
        "author_id": "sunshine-hospital",
        "tags": blog.get('tags', []),
        "is_published": True,
        "featured_image": "https://www.sunshinehospital.org/logo.png"
    }).encode('utf-8')
    
    req2 = urllib.request.Request(
        f'{backend_url}/api/blogs',
        data=post_data,
        headers={'Content-Type': 'application/json'},
        method='POST'
    )
    
    print(f"Publishing to {backend_url}/api/blogs ...")
    with urllib.request.urlopen(req2, timeout=60) as resp2:
        result2 = json.loads(resp2.read().decode('utf-8'))
        print(f"SUCCESS: {result2.get('title')}")
        print(f"URL: https://www.sunshinehospital.org/blog/{result2.get('slug')}")

if __name__ == '__main__':
    main()
