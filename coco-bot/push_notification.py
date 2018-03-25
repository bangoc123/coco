import os
import requests

from fbmq import Page

from dotenv import load_dotenv
load_dotenv()

page = Page(os.getenv("FB_TOKEN"))

def send_message(uid, message):
    page.send(uid, message)

def push_noti(users, message):
    for uid in users:
        send_message(uid, message)
