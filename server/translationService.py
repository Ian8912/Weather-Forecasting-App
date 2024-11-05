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
        # Split the translated texts back into an array
        translations = response.json()['translations'][0]['text'].split("\n")
        return jsonify({'translated_texts': translations})
    else:
        return jsonify({'error': 'Translation failed'}), response.status_code