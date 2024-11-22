import json
from flask import Flask, request, jsonify, Blueprint
from pywebpush import webpush, WebPushException

app = Flask(__name__)

# Replace with your private VAPID key details
VAPID_PUBLIC_KEY = "<Your Public VAPID Key>"
VAPID_PRIVATE_KEY = "<Your Private VAPID Key>"

# Example: A list to store user subscriptions
subscriptions = []

# Create a Blueprint for notifications
notifications_bp = Blueprint('notifications', __name__)

@app.route('/subscribe', methods=['POST'])
def subscribe():
    subscription = request.get_json()
    subscriptions.append(subscription)
    return jsonify({"message": "Subscription added successfully"}), 201

def send_push_notification(title, body):
    for subscription in subscriptions:
        try:
            webpush(
                subscription_info=subscription,
                data=json.dumps({"title": title, "body": body}),
                vapid_private_key=VAPID_PRIVATE_KEY,
                vapid_claims={"sub": "mailto:your-email@example.com"}
            )
        except WebPushException as ex:
            print("Web push failed: {}", repr(ex))

@app.route('/trigger-notification', methods=['POST'])
def trigger_notification():
    data = request.get_json()
    title = data.get('title', 'Weather Alert')
    body = data.get('body', 'Check the latest weather update!')

    send_push_notification(title, body)
    return jsonify({"message": "Notifications sent"}), 200