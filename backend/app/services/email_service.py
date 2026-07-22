import os
import smtplib

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


def send_password_reset_email(
    recipient_email: str,
    recipient_name: str,
    reset_token: str,
):

    frontend_url = os.getenv("FRONTEND_URL")

    reset_link = (
        f"{frontend_url}/reset-password?token={reset_token}"
    )

    sender_email = os.getenv("SMTP_EMAIL")
    sender_password = os.getenv("SMTP_PASSWORD")

    msg = MIMEMultipart("alternative")

    msg["Subject"] = "Reset your SentinelAI password"
    msg["From"] = sender_email
    msg["To"] = recipient_email

    html = f"""
    <html>
        <body style="font-family:Arial,sans-serif;">
            <h2>SentinelAI Password Reset</h2>

            <p>Hello {recipient_name},</p>

            <p>We received a request to reset your password.</p>

            <p>
                <a
                    href="{reset_link}"
                    style="
                        background:#2563eb;
                        color:white;
                        padding:12px 20px;
                        text-decoration:none;
                        border-radius:6px;
                    "
                >
                    Reset Password
                </a>
            </p>

            <p>This link expires in <b>30 minutes</b>.</p>

            <p>If you didn't request this, simply ignore this email.</p>

        </body>
    </html>
    """

    msg.attach(MIMEText(html, "html"))

    print("Connecting to Gmail SMTP...")

    with smtplib.SMTP("smtp.gmail.com", 587) as server:

        server.starttls()

        server.login(
            sender_email,
            sender_password,
        )

        server.sendmail(
            sender_email,
            recipient_email,
            msg.as_string(),
        )

    print("Email sent successfully!")