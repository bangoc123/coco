import os
import json
from pprint import pprint

from flask import Flask, request, abort
from fbmq import Attachment, Template, QuickReply, Page

from call_api import create_issue
from push_notification import push_noti

from dotenv import load_dotenv
load_dotenv()


page = Page(os.getenv("FB_TOKEN"))
user_database = []

app = Flask(__name__)


class User():
    def __init__(self, uid):
        self.uid = uid
        self.profile_detail = self.user_info(uid)
        self.loc = None
        self.image = None
        self.text = None
        self.in_create_issue = False

    def user_info(self, uid) -> dict:
        user = page.get_user_profile(uid)
        return {
            "uid": uid,
            "name": user.get("first_name", "") + " " + user.get("last_name", ""),
            "avatar": user.get("profile_pic", ""),
            "gender": user.get("gender", "")
            }

    def __repr__(self):
        return "<{}>".format(self.uid)


def check_user(uid):
    for user in user_database:
        if uid == user.uid:
            return True
    user_database.append(User(uid))
    return False


def get_user(uid):
    for user in user_database:
        if uid == user.uid:
            return user
    return None


@app.route('/webhook', methods=['GET'])
def validate():
    if request.args.get('hub.mode', '') == 'subscribe' and \
            request.args.get('hub.verify_token', '') == "fortheworld":

        print("Validating webhook")

        return request.args.get('hub.challenge', '')
    else:
        return 'Failed validation. Make sure the validation tokens match.'


@app.route('/webhook', methods=['POST'])
def webhook():
    payload = request.get_data(as_text=True)
    print(payload)
    page.handle_webhook(payload)

    return "ok"


@app.route("/push_noti", methods=["POST"])
def push_noti_handle():
    if not request.json:
        abort(400)
    data = request.get_json()
    users = data.get("users")
    message = data.get("message", "")
    print(type(users))
    pprint(users)
    if users:
        push_noti(users, message)

    return "ok"

@page.handle_message
def message_handler(event):
    """:type event: fbmq.Event"""
    uid = event.sender_id
    check_user(uid)  # check if user exist
    pprint(user_database)

    # MEDIA
    if event.message_attachments:
        type_ = event.message_attachments[0]["type"]
        payload = event.message_attachments[0]["payload"]
        print("type is ", type_)
        pprint(payload, width=2)

        if type_ == "location":
            loc = payload["coordinates"]
            lat = str(loc["lat"])
            lon = str(loc["long"])
            # in create issue
            get_user(uid).in_create_issue = True
            get_user(uid).loc = {"lat": lat, "lon": lon}
            page.send(uid, "Your location had been record.")
        elif type_ == "image":
            url = payload["url"]
            page.send(uid, "Your image had been record.")
            # in create issue
            get_user(uid).in_create_issue = True
            get_user(uid).image = url

    # TEXT
    elif event.message_text:
        text = event.message.get('text')

        if text == "hi":
            page.send(uid, "I got it")
            return
            
        if get_user(uid).in_create_issue == True:
            get_user(uid).text = text
            page.send(uid, "I got it")
            # Create issue
            create_issue(get_user(uid))
        else:
            # FALLBACK HERE
            page.send(uid, "What?")


# @page.handle_postback
# def postback_handler(event):
#     payload = event.postback_payload

@page.callback(['START_PAYLOAD'])
def start_callback(payload, event):
    """
    Getting started button
    """
    uid = event.sender_id
    check_user(uid)

    page.send(uid, "Hello! I will help you raise your voice.")
    page.send(uid, "All I need is your location, your photo and a small description.")


@page.after_send
def after_send(payload, response):
    """:type payload: fbmq.Payload"""
    print("complete")


if __name__ == "__main__":
    page.greeting("Welcome!")
    page.show_starting_button("START_PAYLOAD")
    app.run(port=3000)
