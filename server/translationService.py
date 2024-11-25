import os
import requests
from dotenv import load_dotenv
from flask import Flask, request, jsonify

TRANSLATION_API_KEY = os.getenv('DEEPL_API_KEY')
DEEPL_URL = 'https://api-free.deepl.com/v2/translate'

def fetch_translation(text, lang):
    response = requests.post(
        DEEPL_URL,
        data={
            'auth_key': TRANSLATION_API_KEY,
            'text': text,
            'target_lang': lang,
        }
    )

    if response.status_code == 200:
        # Split translations back into an array and return
        return response.json()['translations'][0]['text'].split("\n")
    else:
        # Handle translation failure
        return {'error': f'Translation failed: {response.status_code}'}
