from celery import shared_task
from django.core.mail import send_mail
import os

@shared_task
def send_mail_task(subject,message,recipient_list):
            send_mail(
            subject=subject,
            message=message,
            from_email=os.getenv('EMAIL_HOST_USER'),
            recipient_list=recipient_list,
            fail_silently=False
        )