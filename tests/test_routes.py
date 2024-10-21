import pytest
from flask import Flask
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'src'))

from server.app import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_weather_route_with_invalid_city(client):
    response = client.get('/weather?city=InvalidCity')
    assert response.status_code == 404
    data = response.get_json()
    assert 'error' in data
    assert data['error'] == 'City not found'

def test_weather_route_with_missing_coordinates(client):
    response = client.get('/weather')
    assert response.status_code == 400
    data = response.get_json()
    assert 'error' in data
    assert data['error'] == 'City or coordinates are required'

def test_weather_route(client):
    """Test the /weather route for valid response and data."""
    response = client.get('/weather')
    assert response.status_code == 200
    data = response.get_json()
    
    assert "location" in data
    assert "temperature_C" in data
    assert "temperature_F" in data
    assert "condition" in data
    assert "forecast" in data

def test_404(client):
    """Test for 404 response on a non-existent route."""
    response = client.get('/nonexistent')
    assert response.status_code == 404
