from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from fastapi import BackgroundTasks, HTTPException
from dotenv import load_dotenv
import os
from typing import List
from email_validator import validate_email, EmailNotValidError

# Load the environment variables from .env file
load_dotenv()

SEND_PORT = 587
# Configure email settings using environment variables
conf = ConnectionConfig(
    MAIL_USERNAME=os.getenv("MAIL_USERNAME"),
    MAIL_PASSWORD=os.getenv("MAIL_PASSWORD"),
    MAIL_FROM=os.getenv("MAIL_USERNAME"),
    MAIL_PORT=SEND_PORT,
    MAIL_SERVER=os.getenv("MAIL_SERVER"),
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True,
)


async def send_email(recipients: List[str], subject: str, body: str):
    message = MessageSchema(
        subject=subject,
        recipients=recipients,  # List of recipients
        body=body,
        subtype="plain",
    )

    fm = FastMail(conf)
    # Send email asynchronously
    # background_tasks.add_task(fm.send_message, message)
    try:
        # Attempt to send the email
        await fm.send_message(message)
        return {"message": "Email has been sent successfully"}

    except Exception as e:
        # If there was an error, log the exception and return an error message
        raise HTTPException(
            status_code=500, detail=f"Failed to send email: {str(e)}, {str(conf)}"
        )


def is_valid_email(email):
    try:
        # Validate and parse email
        validate_email(email)
        return True
    except EmailNotValidError:
        return False
