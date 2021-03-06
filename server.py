from flask import Flask, render_template, request, jsonify
import os
import json
import apis
from datetime import date

app = Flask(__name__)
schedule = apis.Scheduling(app_id='983c5cd2-3cc1-4cd4-91d1-64a1404f6eea',
                           app_secret_key='NYdwCIRZ3U1qt89PIxNnq89kCYjYygZagWgugJgA8XylomsFgOKrvvD2')

# Don't interfere with AngularJS
app.jinja_env.variable_start_string = '{|'
app.jinja_env.variable_end_string = '|}'


# HomePage
@app.route('/')
def index():
    return render_template('index.html')

users = {}

# User save data
@app.route('/user/<username>', methods = ['GET', 'PUT'])
def user(username):
    if request.method == 'GET':
        return jsonify(users[username])
    if request.method == 'PUT':
        users[username] = request.json
        return jsonify(users[username])


YEAR = date.today().year % 100;
NEITHER = '0';
BOTH = '1';
FALL_ONLY = 'F' + str(YEAR);
SPRING_ONLY = 'S' + str(YEAR);

FALLVALS = {};
SPRINGVALS = {};

@app.route('/fall/<int:course>', methods = ['GET'])
def getFallCourse(course):
    if request.method == 'GET':
        if (course in FALLVALS):
            return jsonify(FALLVALS[course])
        fallval = schedule.course(semester=FALL_ONLY, course_number=course)
        if (fallval):
            FALLVALS[course] = fallval
            return jsonify(fallval)

@app.route('/spring/<int:course>', methods = ['GET'])
def getSpringCourse(course):
    if request.method == 'GET':
        if course in SPRINGVALS:
            return jsonify(SPRINGVALS[course])
        springval = schedule.course(semester=SPRING_ONLY, course_number=course)
        if (springval):
            SPRINGVALS[course] = springval
            return jsonify(springval)


PREREQS = json.load(open('static/PREREQS.json'))

@app.route('/prereqs', methods = ['GET'])
def get_prereqs():
    if request.method == 'GET':
        return jsonify(PREREQS)


SCS_CS_MAJOR = json.load(open('static/SCS_CS_MAJOR.json'))
MAJORS = {"SCS_CS_M": SCS_CS_MAJOR}

with open('static/MAJORS.json', 'w') as f:
  json.dump(MAJORS, f)

@app.route('/majors', methods = ['GET'])
def get_majors():
    if request.method == 'GET':
        return jsonify({'Majors': MAJORS})

@app.route('/majors/<major>', methods = ['GET'])
def get_major(major):
    if request.method == 'GET':
        return jsonify(MAJORS["SCS_CS_M"])

if __name__ == "__main__":
    # Bind to PORT if defined, otherwise default to 5000.
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)

