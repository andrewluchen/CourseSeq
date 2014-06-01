var scheduleApp = angular.module('scheduleApp', []);

scheduleApp.controller('scheduleCtrl',
  function ($scope, $http) {

    var coursesPerSemester = 7;
    var NO_COURSE = 00000;

    $scope.createSemester = function () {
      semestercourses = [];
      for (var i = 0; i < coursesPerSemester; i++) {
        semestercourses[i] = {"id": NO_COURSE, "course": "", "place": i};
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

    var YEAR = new Date().getFullYear() % 100;
    var NEITHER = '0';
    var BOTH = '1';
    var FALL_ONLY = 'F' + YEAR.toString();
    var SPRING_ONLY = 'S' + YEAR.toString();
    
    $scope.getSeason = function (semester) {
        
    }
    
//def check_season(course_id):
   // fallval = schedule.course(semester=FALL_ONLY, course_number=course_id)
   // springval = schedule.course(semester=SPRING_ONLY, course_number=course_id)
   // if (fallval and springval):
    //    return BOTH
   // elif (fallval):
   //     return FALL_ONLY
  //  elif (springval):
//        return SPRING_ONLY
//    return NEITHER


    
    $scope.enteredCourse = "";
    $scope.selectedSemester = $scope.data.semesters[0];

    $scope.updateSemester = function (semester) {
      $scope.selectedSemester = semester;
    };
    $scope.addCourse = function () {
      for (var i = 0; i < coursesPerSemester; i++) {
        if ($scope.selectedSemester.courses[i].id == NO_COURSE) {
          $scope.selectedSemester.courses[i].id = parseInt($scope.enteredCourse);
          $scope.selectedSemester.courses[i].course = $scope.enteredCourse;
          $scope.selectedSemester.courses[i].place = i;
          return;
        };
      };
    }
    $scope.deleteCourse = function (semesterCourses, removedCourse) {
      semesterCourses[removedCourse.place].id = NO_COURSE;
      semesterCourses[removedCourse.place].course = "";
    };

    $scope.username = "";

    $scope.save = function (username) {
      var userURL = '/user/' + username;
      $http.put(userURL, $scope.data).
        success(function (data) {
          // uh what do i put here?
        }
      )
    }
    $scope.load = function (username) {
      var userURL = '/user/' + username;
      $http.get(userURL).
        success(function (data) {
          $scope.data = data;
        }
      )
    }

  }
)
