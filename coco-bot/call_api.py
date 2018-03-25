import os
from pprint import pprint
import requests

from dotenv import load_dotenv
load_dotenv()

HOST = os.getenv("BACKEND_HOST")


def post(endpoint, data=None):
    """
    Make a post API call
    """
    r = requests.post(HOST + endpoint, json=data)
    return r.status_code


def create_issue(user):
    """
    Create new issue to backend
    """
    data = {
        "issue": {
            "lat": user.loc["lat"],
            "lng": user.loc["lon"],
            "user": user.profile_detail,
            "image": user.image,
            "text": user.text,
            "content": []
        }
    }
    r = post("issues", data)
    pprint(data)
    pprint(r)
    return r
