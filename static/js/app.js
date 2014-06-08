function isInt(event) {
  event = (event) ? event : window.event;
  var charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;
}

var scheduleApp = angular.module('scheduleApp', []);

scheduleApp.controller('scheduleCtrl',
  function ($scope, $http) {

    var coursesPerSemester = 7;
    var numSemesters = 10;
    var NO_COURSE = 00000;

    $scope.createSemester = function () {
      semestercourses = [];
      for (var i = 0; i < coursesPerSemester; i++) {
        semestercourses[i] = {"id": NO_COURSE, "course": "", "place": i, "units": 0};
      };
      return semestercourses;
    }

    $scope.data = {};
    $scope.data.units = 0;
    $scope.data.semesters = [
      {
          "id": 0,
          "semester": "Freshman Fall",
          "courses": $scope.createSemester()
      },
      {
          "id": 1,
          "semester": "Freshman Spring",
          "courses": $scope.createSemester()
      },
      {
          "id": 2,
          "semester": "Sophomore Fall",
          "courses": $scope.createSemester()
      },
      {
          "id": 3,
          "semester": "Sophomore Spring",
          "courses": $scope.createSemester()
      },
      {
          "id": 4,
          "semester": "Junior Fall",
          "courses": $scope.createSemester()
      },
      {
          "id": 5,
          "semester": "Junior Spring",
          "courses": $scope.createSemester()
      },
      {
          "id": 6,
          "semester": "Senior Fall",
          "courses": $scope.createSemester()
      },
      {
          "id": 7,
          "semester": "Senior Spring",
          "courses": $scope.createSemester()
      },
      {
          "id": 8,
          "semester": "5th Year Fall",
          "courses": $scope.createSemester()
      },
      {
          "id": 9,
          "semester": "5th Year Spring",
          "courses": $scope.createSemester()
      }
    ];

    $scope.getSeason = function (semester) {
    }

    $scope.enteredCourse = "";
    $scope.selectedSemester = $scope.data.semesters[0];

    $scope.updateSemester = function (semester) {
      $scope.selectedSemester = semester;
    };
    
    $scope.checkSeason = function (semester, course) {
      flag = false;
      if (semester["id"] % 2 == 0) {
        fallval = false;
        $http.get('/fall/' + course).
          success(function (data) {
            flag = true;
            console.log("happen first");
          })
      }
      else if (semester["id"] % 2 == 1) {
        var springval = false;
        $http.get('/spring/' + course).
          success(function (data) {
            flag = true;
          })
      }
      console.log("happen second");
      return flag;
    };
    
    $scope.addCourse = function (course) {
      if (parseInt(course) < 10000 ||
          parseInt(course) > 99999) {
        alert("Invalid Course");
        return;
      }
      if ($scope.checkSeason($scope.selectedSemester, course)) {
        alert("No such class this semester");
        return;
      }
      for (var i = 0; i < coursesPerSemester; i++) {
        if ($scope.selectedSemester.courses[i].id == NO_COURSE) {
          $scope.selectedSemester.courses[i].id = parseInt(course);
          $scope.selectedSemester.courses[i].course = course;
          $scope.selectedSemester.courses[i].place = i;
          $scope.selectedSemester.courses[i].units = 12;
          $scope.update();
          return;
        };
      };
    };
    $scope.deleteCourse = function (semesterCourses, removedCourse) {
      semesterCourses[removedCourse.place].id = NO_COURSE;
      semesterCourses[removedCourse.place].course = "";
      semesterCourses[removedCourse.place].units = 0;
      $scope.update();
    };
    
    $scope.data.precollegecredits = "0";
    
    $.getJSON("../static/MAJORS.json", function(data) {
      $scope.majors = data;
      $scope.data.selectedMajor = $scope.majors["SCS_CS_M"];
    });
    
    $scope.stuff = function () {
      var temp;
      $.getJSON("../static/MAJORS.json", function(data) {
        temp = data;
      });
      return temp;
    }
    
    $scope.countUnits = function (semesters) {
      var sum = 0;
      for (var i = 0; i < numSemesters; i++) {
        for (var j = 0; j < coursesPerSemester; j++) {
          sum += semesters[i].courses[j].units;
        };
      };
      return sum;
    };
    
    $scope.updateMajor = function (major) {
      $scope.data.selectedMajor = major;
      $scope.update();
    };

    $scope.countCompletedReqs = function (semesters, reqs) {
      var count = 0;
      for (var i = 0; i < reqs.length; i++) {
        var flag = 0;
        for (var j = 0; j < numSemesters && !flag; j++) {
          for (var k = 0; k < coursesPerSemester && !flag; k++) {
            if (semesters[j].courses[k].course == reqs[i]) {
              flag = 1;
            };
          };
        };
        count += flag;
      };
      return count;
    }

    $scope.update = function () {
      var summary = "You have " + ($scope.countUnits($scope.data.semesters) + parseInt($scope.data.precollegecredits)).toString() + " units out of " + $scope.data.selectedMajor.min_units + " minimum units.\n\n";

      for (var i = 0; i < $scope.data.selectedMajor.requirements.length; i++) {
        summary += $scope.data.selectedMajor.requirements[i].id + ":  ";
        var completed = $scope.countCompletedReqs($scope.data.semesters, $scope.data.selectedMajor.requirements[i].available_courses);
        summary += completed.toString() + " of " + $scope.data.selectedMajor.requirements[i].num_required_courses.toString() + " completed\n";
      };

      $scope.summary = summary;
      $scope.warnings = "Warnings:\n";
    };

    $scope.save = function (username) {
      var userURL = '/user/' + username;
      $http.put(userURL, $scope.data).
        success(function (data) {
          // uh what do i put here?
        })
    };
    $scope.load = function (username) {
      var userURL = '/user/' + username;
      $http.get(userURL).
        success(function (data) {
          $scope.data = data;
        })
      $scope.update();
    };

  }
)
