import pytest
from flask import Flask
from your_flask_app import app  # Replace with the actual Flask app import

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_index_route(client):
    """Test if the index route returns the correct response."""
    response = client.get('/')
    assert response.status_code == 200
    assert b"Welcome to the Weather App!" in response.data  # Modify with actual route
