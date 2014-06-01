from flask import Flask, render_template, request, jsonify
import os
import apis

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


############## Some hard-coding for now

SCS_CS_MAJOR = {
    'name': 'SCS - Computer Science',
    'min_units': 360,
    'requirements': [
        {
            'id': 'Imperative Programming',
            'num_required_courses': 1,
            'available_courses': [
                15122
            ]
        },
        {
            'id': 'Functional Programming',
            'num_required_courses': 1,
            'available_courses': [
                15150
            ]
        },
        {
            'id': 'Par & Seq Data Structures',
            'num_required_courses': 1,
            'available_courses': [
                15210
            ]
        },
        {
            'id': 'Intro to Computer Systems',
            'num_required_courses': 1,
            'available_courses': [
                15213
            ]
        },
        {
            'id': 'Great Theoretical Ideas',
            'num_required_courses': 1,
            'available_courses': [
                15251
            ]
        },
        {
            'id': 'Algorithm Design & Analysis',
            'num_required_courses': 1,
            'available_courses': [
                15451
            ]
        },
        {
            'id': 'Algorithms & Complexity Elective',
            'num_required_courses': 1,
            'available_courses': [
                15-354,
                15-355,
                15-453,
                15-455,
                21-301,
                21-484
            ]
        },
        {
            'id': 'Applications Elective',
            'num_required_courses': 1,
            'available_courses': [
                02-450,
                05-391,
                05-431,
                10-601,
                11-411,
                15-313,
                15-322,
                15-323,
                15-381,
                15-415,
                15-462,
                16-384,
                16-385
            ]
        },
        {
            'id': 'Logics & Languages Elective',
            'num_required_courses': 1,
            'available_courses': [
                15-312,
                15-317,
                15-414,
                15-424,
                21-300,
                80-311
            ]
        },
        {
            'id': 'Logics & Languages Elective',
            'num_required_courses': 1,
            'available_courses': [
                15-410,
                15-411,
                15-418,
                15-440,
                15-441
            ]
        },
        {
            'id': 'SCS Electives',
            'num_required_courses': 2,
            'available_courses': [
            ]
        }
    ]
}

MAJORS = [SCS_CS_MAJOR]

@app.route('/majors', methods = ['GET'])
def get_majors():
    if request.method == 'GET':
        return jsonify({'Majors': MAJORS})

@app.route('/majors/<major>', methods = ['GET'])
def get_major(major):
    if request.method == 'GET':
        return jsonify({'Major': MAJORS[0]})

############## end of hard-coding


if __name__ == "__main__":
    # Bind to PORT if defined, otherwise default to 5000.
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)

