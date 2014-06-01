var scheduleApp = angular.module('scheduleApp', []);

scheduleApp.controller('scheduleCtrl',
  function ($scope, $http) {

    var coursesPerSemester = 7;
    var NO_COURSE = 00000;

    $scope.createSemester = function(){
      semestercourses = [];
      for (var i = 0; i < coursesPerSemester; i++) {
        semestercourses[i] = {"id": NO_COURSE, "course": "", "place": i};
      };
      return semestercourses;
    }

    $scope.semesters = [
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
    
    $scope.enteredCourse = "";
    $scope.selectedSemester = $scope.semesters[0];

    $scope.updateSemester = function(semester){
      $scope.selectedSemester = semester;
    };
    $scope.addCourse = function(){
      for (var i = 0; i < coursesPerSemester; i++) {
        if ($scope.selectedSemester.courses[i].id == NO_COURSE) {
          $scope.selectedSemester.courses[i].id = parseInt($scope.enteredCourse);
          $scope.selectedSemester.courses[i].course = $scope.enteredCourse;
          $scope.selectedSemester.courses[i].place = i;
          return;
        };
      };
    }
    $scope.deleteCourse = function(semesterCourses, removedCourse){
      semesterCourses[removedCourse.place].id = NO_COURSE;
      semesterCourses[removedCourse.place].course = "";
    };

    $scope.username = "";

    $scope.save = function(){
      return;
    }

  }
)