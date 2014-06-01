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

PREREQS = {
    "15110": {
        "prerequisites": [
        ],
        "corequisites": [
        ]
    },
    "15112": {
        "prerequisites": [
        ],
        "corequisites": [
        ]
    },
    "15121": {
        "prerequisites": [
            "15112"
        ],
        "corequisites": [
            "21127"
        ]
    },
    "15122": {
        "prerequisites": [
            "15112"
        ],
        "corequisites": [
            "21127"
        ]
    },
    "15150": {
        "prerequisites": [
            "15112",
            "21127"
        ],
        "corequisites": [
        ]
    },
    "15210": {
        "prerequisites": [
            "15122",
            "15150"
        ],
        "corequisites": [
        ]
    },
    "15211": {
        "prerequisites": [
            "21127",
            "15121"
        ],
        "corequisites": [
        ]
    },
    "15213": {
        "prerequisites": [
        ],
        "corequisites": [
        ]
    },
    "15251": {
        "prerequisites": [
        ],
        "corequisites": [
        ]
    },
    "15451": {
        "prerequisites": [
        ],
        "corequisites": [
        ]
    },
    "15150": {
        "prerequisites": [
        ],
        "corequisites": [
        ]
    },
    "15150": {
        "prerequisites": [
        ],
        "corequisites": [
        ]
    },
    "15150": {
        "prerequisites": [
        ],
        "corequisites": [
        ]
    }
}

@app.route('/prereqs', methods = ['GET'])
def get_prereqs():
    if request.method == 'GET':
        return jsonify(PREREQS)


SCS_CS_MAJOR = {
    'name': 'SCS - Computer Science',
    'min_units': 360,
    'requirements': [
        {
            'id': 'Imperative Programming',
            'num_required_courses': 1,
            'available_courses': [
                "15122"
            ]
        },
        {
            'id': 'Functional Programming',
            'num_required_courses': 1,
            'available_courses': [
                "15150"
            ]
        },
        {
            'id': 'Par & Seq Data Structures',
            'num_required_courses': 1,
            'available_courses': [
                "15210"
            ]
        },
        {
            'id': 'Intro to Computer Systems',
            'num_required_courses': 1,
            'available_courses': [
                "15213"
            ]
        },
        {
            'id': 'Great Theoretical Ideas',
            'num_required_courses': 1,
            'available_courses': [
                "15251"
            ]
        },
        {
            'id': 'Algorithm Design & Analysis',
            'num_required_courses': 1,
            'available_courses': [
                "15451"
            ]
        },
        {
            'id': 'Algorithms & Complexity Elective',
            'num_required_courses': 1,
            'available_courses': [
                "15354",
                "15355",
                "15453",
                "15455",
                "21301",
                "21484"
            ]
        },
        {
            'id': 'Applications Elective',
            'num_required_courses': 1,
            'available_courses': [
                "02450",
                "05391",
                "05431",
                "10601",
                "11411",
                "15313",
                "15322",
                "15323",
                "15381",
                "15415",
                "15462",
                "16384",
                "16385"
            ]
        },
        {
            'id': 'Logics & Languages Elective',
            'num_required_courses': 1,
            'available_courses': [
                "15312",
                "15317",
                "15414",
                "15424",
                "21300",
                "80311"
            ]
        },
        {
            'id': 'Logics & Languages Elective',
            'num_required_courses': 1,
            'available_courses': [
                "15410",
                "15411",
                "15418",
                "15440",
                "15441"
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

MAJORS = {"SCS_CS_M": SCS_CS_MAJOR}

@app.route('/majors', methods = ['GET'])
def get_majors():
    if request.method == 'GET':
        return jsonify({'Majors': MAJORS})

@app.route('/majors/<major>', methods = ['GET'])
def get_major(major):
    if request.method == 'GET':
        return jsonify(MAJORS["SCS_CS_M"])

############## end of hard-coding


if __name__ == "__main__":
    # Bind to PORT if defined, otherwise default to 5000.
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)

