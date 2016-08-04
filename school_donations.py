from flask import Flask
from flask import render_template
from pymongo import MongoClient
import json


app = Flask(__name__)

MONGODB_HOST = 'localhost'
MONGODB_PORT = 27017
DBS_NAME = 'donorsUSA'
COLLECTION_NAME = 'projects'
FIELDS = {'funding_status': True, 
          'school_state': True, 
          'resource_type': True, 
          'poverty_level': True,
          'date_posted': True, 
          'total_donations': True, 
          'primary_focus_area': True,
          'grade_level': True, 
          'teacher_prefix': True, 
          'total_price_excluding_optional_support': True,
          'students_reached': True, 
          'primary_focus_subject': True, 
          'num_donors': True,
          'school_metro': True, 
          '_id': False}

# Route to display charts
@app.route("/")
def index():
    return render_template("main.html")

# Route to display a detailed data table with data selectors
@app.route("/detail")
def detail():
    return render_template("detail.html")

@app.route("/donorsUS/projects")
def donor_projects():
    connection = MongoClient(MONGODB_HOST, MONGODB_PORT)
    collection = connection[DBS_NAME][COLLECTION_NAME]
    projects = collection.find(projection=FIELDS, limit=55000)
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects)
    connection.close()
    return json_projects


if __name__ == "__main__":
    app.run(debug=True)
