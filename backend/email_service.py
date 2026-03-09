import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import logging

logger = logging.getLogger(__name__)

SMTP_EMAIL = os.environ.get('SMTP_EMAIL')
SMTP_PASSWORD = os.environ.get('SMTP_PASSWORD')
NOTIFICATION_EMAIL = os.environ.get('NOTIFICATION_EMAIL', SMTP_EMAIL)

def send_email(to_email: str, subject: str, html_content: str, plain_content: str = None):
    """Send email via Gmail SMTP"""
    if not SMTP_EMAIL or not SMTP_PASSWORD:
        logger.error("SMTP credentials not configured")
        return False
    
    try:
        msg = MIMEMultipart('alternative')
        msg['Subject'] = subject
        msg['From'] = f"Sunshine Hospital <{SMTP_EMAIL}>"
        msg['To'] = to_email
        
        if plain_content:
            msg.attach(MIMEText(plain_content, 'plain'))
        msg.attach(MIMEText(html_content, 'html'))
        
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
            server.login(SMTP_EMAIL, SMTP_PASSWORD)
            server.sendmail(SMTP_EMAIL, to_email, msg.as_string())
        
        logger.info(f"Email sent successfully to {to_email}")
        return True
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")
        return False

def send_appointment_notification(appointment: dict):
    """Send appointment notification to hospital"""
    subject = f"🏥 New Appointment: {appointment['patient_name']} - {appointment['department']}"
    
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
            .header {{ background: linear-gradient(135deg, #6B21A8 0%, #7C3AED 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; }}
            .content {{ background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }}
            .field {{ margin-bottom: 15px; }}
            .label {{ font-weight: bold; color: #6B21A8; }}
            .value {{ margin-top: 5px; }}
            .esic-badge {{ background: #10B981; color: white; padding: 5px 10px; border-radius: 15px; font-size: 12px; }}
            .footer {{ background: #333; color: white; padding: 15px; text-align: center; border-radius: 0 0 10px 10px; font-size: 12px; }}
            .cta {{ background: #F59E0B; color: white; padding: 10px 20px; text-decoration: none; border-radius: 25px; display: inline-block; margin-top: 15px; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1 style="margin: 0;">📅 New Appointment Booking</h1>
                <p style="margin: 5px 0 0 0; opacity: 0.9;">Sunshine Hospital - Website Inquiry</p>
            </div>
            <div class="content">
                <div class="field">
                    <div class="label">👤 Patient Name</div>
                    <div class="value">{appointment['patient_name']}</div>
                </div>
                <div class="field">
                    <div class="label">📱 Phone Number</div>
                    <div class="value"><a href="tel:{appointment['phone']}">{appointment['phone']}</a></div>
                </div>
                <div class="field">
                    <div class="label">📧 Email</div>
                    <div class="value">{appointment.get('email', 'Not provided')}</div>
                </div>
                <div class="field">
                    <div class="label">🏥 Department</div>
                    <div class="value">{appointment['department']} {"<span class='esic-badge'>ESIC Patient</span>" if appointment.get('is_esic') else ""}</div>
                </div>
                <div class="field">
                    <div class="label">📆 Preferred Date</div>
                    <div class="value">{appointment['preferred_date']}</div>
                </div>
                <div class="field">
                    <div class="label">⏰ Preferred Time</div>
                    <div class="value">{appointment['preferred_time']}</div>
                </div>
                <div class="field">
                    <div class="label">💬 Message</div>
                    <div class="value">{appointment.get('message', 'No message')}</div>
                </div>
                <a href="tel:{appointment['phone']}" class="cta">📞 Call Patient Now</a>
            </div>
            <div class="footer">
                <p>This notification was sent from www.sunshinehospital.org</p>
                <p>Sunshine Hospital | Satara Parisar, Beed Bypass Road, Sambhajinagar</p>
            </div>
        </div>
    </body>
    </html>
    """
    
    plain_content = f"""
    NEW APPOINTMENT BOOKING
    =======================
    
    Patient Name: {appointment['patient_name']}
    Phone: {appointment['phone']}
    Email: {appointment.get('email', 'Not provided')}
    Department: {appointment['department']}
    ESIC Patient: {'Yes' if appointment.get('is_esic') else 'No'}
    Preferred Date: {appointment['preferred_date']}
    Preferred Time: {appointment['preferred_time']}
    Message: {appointment.get('message', 'No message')}
    
    --
    Sunshine Hospital Website
    """
    
    return send_email(NOTIFICATION_EMAIL, subject, html_content, plain_content)

def send_esic_inquiry_notification(inquiry: dict):
    """Send ESIC inquiry notification to hospital"""
    subject = f"📋 New ESIC Inquiry: {inquiry['name']}"
    
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
            .header {{ background: linear-gradient(135deg, #059669 0%, #10B981 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; }}
            .content {{ background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }}
            .field {{ margin-bottom: 15px; }}
            .label {{ font-weight: bold; color: #059669; }}
            .value {{ margin-top: 5px; }}
            .badge {{ padding: 5px 10px; border-radius: 15px; font-size: 12px; }}
            .badge-yes {{ background: #10B981; color: white; }}
            .badge-no {{ background: #EF4444; color: white; }}
            .footer {{ background: #333; color: white; padding: 15px; text-align: center; border-radius: 0 0 10px 10px; font-size: 12px; }}
            .cta {{ background: #F59E0B; color: white; padding: 10px 20px; text-decoration: none; border-radius: 25px; display: inline-block; margin-top: 15px; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1 style="margin: 0;">📋 New ESIC Eligibility Inquiry</h1>
                <p style="margin: 5px 0 0 0; opacity: 0.9;">From Website ESIC Form</p>
            </div>
            <div class="content">
                <div class="field">
                    <div class="label">👤 Name</div>
                    <div class="value">{inquiry['name']}</div>
                </div>
                <div class="field">
                    <div class="label">📱 Phone</div>
                    <div class="value"><a href="tel:{inquiry['phone']}">{inquiry['phone']}</a></div>
                </div>
                <div class="field">
                    <div class="label">🪪 Has E-Pehchan Card?</div>
                    <div class="value"><span class="badge {'badge-yes' if inquiry.get('has_epehchan') else 'badge-no'}">{'Yes ✓' if inquiry.get('has_epehchan') else 'No ✗'}</span></div>
                </div>
                <div class="field">
                    <div class="label">📄 Has Referral Letter?</div>
                    <div class="value"><span class="badge {'badge-yes' if inquiry.get('has_referral') else 'badge-no'}">{'Yes ✓' if inquiry.get('has_referral') else 'No ✗'}</span></div>
                </div>
                <div class="field">
                    <div class="label">🔢 ESIC Number</div>
                    <div class="value">{inquiry.get('esic_number', 'Not provided')}</div>
                </div>
                <div class="field">
                    <div class="label">💬 Query</div>
                    <div class="value">{inquiry.get('query', 'No additional query')}</div>
                </div>
                <a href="tel:{inquiry['phone']}" class="cta">📞 Call Patient Now</a>
            </div>
            <div class="footer">
                <p>This notification was sent from www.sunshinehospital.org</p>
            </div>
        </div>
    </body>
    </html>
    """
    
    return send_email(NOTIFICATION_EMAIL, subject, html_content)

def send_contact_notification(contact: dict):
    """Send contact form notification to hospital"""
    subject = f"📩 New Contact Message: {contact['name']}"
    
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
            .header {{ background: linear-gradient(135deg, #2563EB 0%, #3B82F6 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0; }}
            .content {{ background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }}
            .field {{ margin-bottom: 15px; }}
            .label {{ font-weight: bold; color: #2563EB; }}
            .value {{ margin-top: 5px; }}
            .message-box {{ background: white; padding: 15px; border-left: 4px solid #2563EB; margin-top: 10px; }}
            .footer {{ background: #333; color: white; padding: 15px; text-align: center; border-radius: 0 0 10px 10px; font-size: 12px; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1 style="margin: 0;">📩 New Contact Form Message</h1>
            </div>
            <div class="content">
                <div class="field">
                    <div class="label">👤 Name</div>
                    <div class="value">{contact['name']}</div>
                </div>
                <div class="field">
                    <div class="label">📧 Email</div>
                    <div class="value"><a href="mailto:{contact.get('email', '')}">{contact.get('email', 'Not provided')}</a></div>
                </div>
                <div class="field">
                    <div class="label">📱 Phone</div>
                    <div class="value"><a href="tel:{contact['phone']}">{contact['phone']}</a></div>
                </div>
                <div class="field">
                    <div class="label">📝 Subject</div>
                    <div class="value">{contact.get('subject', 'General Inquiry')}</div>
                </div>
                <div class="field">
                    <div class="label">💬 Message</div>
                    <div class="message-box">{contact.get('message', 'No message')}</div>
                </div>
            </div>
            <div class="footer">
                <p>This notification was sent from www.sunshinehospital.org</p>
            </div>
        </div>
    </body>
    </html>
    """
    
    return send_email(NOTIFICATION_EMAIL, subject, html_content)
