from flask import Flask, render_template
from flask_testing import TestCase

app = Flask(__name__)

@app.route('/')
def landing_page():
    return render_template('landing_page.html')

class TestLandingPage(TestCase):
    def create_app(self):
        # Configures Flask app for testing purposes
        app.config['TESTING'] = True
        return app
    
    def test_landing_page_renders(self):
        # Simulate a request to the landing page
        response = self.client.get('/')
        self.assert200(response)  # Assert that page loads with status code 200
        self.assert_template_used('landing_page.html')

if __name__ == '__main__':
    import unittest
    unittest.main()