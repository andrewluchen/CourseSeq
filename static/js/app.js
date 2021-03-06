function isInt(event) {
  event = (event) ? event : window.event;
  var charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;
}

var path_to_MAJORS = '../static/MAJORS.json';
var path_to_PREREQS = '../static/PREREQS.json';

var scheduleApp = angular.module('scheduleApp', []);

scheduleApp.controller('scheduleCtrl',
  function ($scope, $http) {
  
    /* Interface stuff */
  
    var coursesPerSemester = 7;
    var numSemesters = 10;

    $scope.createSemester = function () {
      semestercourses = [];
      for (var i = 0; i < coursesPerSemester; i++) {
        semestercourses[i] = {"id": "", "units": 0};
      }
      return semestercourses;
    }

    $scope.data = {};
    $scope.data.units = 0;
    $scope.data.semesters = [
      {
          "id": 0,
          "semester": "Pre-College 1",
          "courses": $scope.createSemester()
      },
      {
          "id": 1,
          "semester": "Pre-College 2",
          "courses": $scope.createSemester()
      },
      {
          "id": 2,
          "semester": "Freshman Fall",
          "courses": $scope.createSemester()
      },
      {
          "id": 3,
          "semester": "Freshman Spring",
          "courses": $scope.createSemester()
      },
      {
          "id": 4,
          "semester": "Sophomore Fall",
          "courses": $scope.createSemester()
      },
      {
          "id": 5,
          "semester": "Sophomore Spring",
          "courses": $scope.createSemester()
      },
      {
          "id": 6,
          "semester": "Junior Fall",
          "courses": $scope.createSemester()
      },
      {
          "id": 7,
          "semester": "Junior Spring",
          "courses": $scope.createSemester()
      },
      {
          "id": 8,
          "semester": "Senior Fall",
          "courses": $scope.createSemester()
      },
      {
          "id": 9,
          "semester": "Senior Spring",
          "courses": $scope.createSemester()
      },
      {
          "id": 10,
          "semester": "5th Year Fall",
          "courses": $scope.createSemester()
      },
      {
          "id": 11,
          "semester": "5th Year Spring",
          "courses": $scope.createSemester()
      }
    ]
    
    $scope.checkCourse = function (semester, course) {
      course.units = 0;
      if(!isFiveChar(course.id)){ return; };
      $scope.checkSeason(semester, course);
      $scope.checkPrereqs(semester, course);
    }

    var isFiveChar = function(str){
      return str.length == 5;
    }

    var FALL = 0
    var SPRING = 1
    $scope.getSeason = function (semester) {
      return semester["id"] % 2;
    }
    
    $scope.checkSeason = function (semester, course) {
      if ($scope.getSeason(semester) == FALL) {
        $http.get('/fall/'+course.id).
          success(function (data) {
            course.units = data.units;
          }).
          error(function (data) {
            alert("Class not offered this semester!");
          })
      }
      else if ($scope.getSeason(semester) == SPRING) {
        $http.get('/spring/'+course.id).
          success(function (data) {
            course.units = data.units;
          }).
          error(function (data) {
            alert("Class not offered this semester!");
          })
      }
      return false;
    }
    
    $scope.checkPrereqs = function (semester, course) {
      var prereq_groups = $scope.prerequisites[course.id];
      if (prereq_groups.length == 0) {
        return;
      }
      for (var k = 0; k < prereq_groups.length; k++) {
        var completed_in_group = 0;
        for (var l = 0; l < prereq_groups[k].length; l++) {
            var completed_course = 0;
            for (var i = 0; i < semester.id; i++) {
              for (var j = 0; j < coursesPerSemester; j++) {
                if ($scope.data.semesters[i].courses[j].id == prereq_groups[k][l]) {
                  completed_course = 1;
                }
              }
            }
            completed_in_group += completed_course;
        }
        if (completed_in_group == prereq_groups[k].length) {
          return;
        }
      }
      alert("This class has prerequisites");
    }
    
    /* save/load stuff */

    $scope.save = function (username) {
      var userURL = '/user/' + username;
      $http.put(userURL, $scope.data).
        success(function (data) {
          // uh what do i put here?
        })
    }
    $scope.load = function (username) {
      var userURL = '/user/' + username;
      $http.get(userURL).
        success(function (data) {
          $scope.data = data;
        })
      $scope.update();
    }

    /* Course data stuff */

    $http.get(path_to_MAJORS)
      .then(function(response){
        $scope.majors = response.data;
        $scope.data.selectedMajor = $scope.majors["SCS_CS_M"];
      })
    
    $scope.updateMajor = function (major) {
      $scope.data.selectedMajor = major;
      $scope.update();
    }
    
    /* Prereq stuff */

    $http.get(path_to_PREREQS)
      .then(function(response){
        $scope.prerequisites = response.data;
      })

    
    /* Details ouptut stuff */
    
    $scope.countUnits = function (semesters) {
      var sum = 0;
      for (var i = 0; i < numSemesters; i++) {
        for (var j = 0; j < coursesPerSemester; j++) {
          sum += semesters[i].courses[j].units;
        }
      }
      return sum;
    }

    $scope.reqCompletion = function (semesters, req_groups, needed) {
      var completed = 0;
      var courses = [];
      for (var k = 0; k < req_groups.length; k++) {
        var completed_in_group = 0;
        for (var l = 0; l< req_groups[k].length; l++) {
            var completed_course = 0;
            for (var i = 0; i < numSemesters; i++) {
              for (var j = 0; j < coursesPerSemester; j++) {
                if (semesters[i].courses[j].id == req_groups[k][l]) {
                  completed_course = 1;
                }
              }
            }
            completed_in_group += completed_course;
        }
        if (completed_in_group == req_groups[k].length) {
          completed += 1;
          courses = courses.concat(req_groups[k]);
        }
        if (completed >= needed) {
          return courses;
        }
      }
      return "Not Completed";
    }

    $scope.update = function () {
      var summary = "You have " + ($scope.countUnits($scope.data.semesters)).toString() + " units out of " + $scope.data.selectedMajor.min_units + " minimum units.\n\n";

      for (var i = 0; i < $scope.data.selectedMajor.requirements.length; i++) {
        var requirement = $scope.data.selectedMajor.requirements[i];
        summary += requirement.id + ":  ";
        var usedCourses = $scope.reqCompletion($scope.data.semesters, requirement.reqs_available, requirement.num_required_courses);
        summary += usedCourses.toString() + "\n";
      }

      $scope.summary = summary;
      $scope.warnings = "Warnings:\n";
    }

  }
)
