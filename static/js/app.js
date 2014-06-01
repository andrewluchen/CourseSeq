var scheduleApp = angular.module('scheduleApp', []);

scheduleApp.controller('scheduleCtrl',
  function ($scope, $http) {

  var classesPerSemester = 7;

  $scope.createSemester = function(){
    semesterClasses = [];
    for (var i = 0; i < classesPerSemester; i++) {
      semesterClasses[i] = {"id": 00000, "class": "asdf"};
    };
    return semesterClasses;
  }

  $scope.semesters = [
    {
        "id": 0,
        "semester": "Freshman Fall",
        "classes": $scope.createSemester()
    },
    {
        "id": 1,
        "semester": "Freshman Spring",
        "classes": $scope.createSemester()
    },
    {
        "id": 2,
        "semester": "Sophomore Fall",
        "classes": $scope.createSemester()
    },
    {
        "id": 3,
        "semester": "Sophomore Spring",
        "classes": $scope.createSemester()
    },
    {
        "id": 4,
        "semester": "Junior Fall",
        "classes": $scope.createSemester()
    },
    {
        "id": 5,
        "semester": "Junior Spring",
        "classes": $scope.createSemester()
    },
    {
        "id": 6,
        "semester": "Senior Fall",
        "classes": $scope.createSemester()
    },
    {
        "id": 7,
        "semester": "Senior Spring",
        "classes": $scope.createSemester()
    },
    {
        "id": 8,
        "semester": "5th Year Fall",
        "classes": $scope.createSemester()
    },
    {
        "id": 9,
        "semester": "5th Year Spring",
        "classes": $scope.createSemester()
    }
  ];
  
  $scope.enteredClass = "";
  $scope.selectedSemester = $scope.semesters[0];

  $scope.updateSemester = function(semester){
    $scope.selectedSemester = semester;
  }
  $scope.addClass = function(){
    $scope.selectedSemester.classes[0] = {"id": parseInt($scope.enteredClass), "class": $scope.enteredClass};
    console.log($scope.selectedSemester.classes[0].id);
  }

  }
)
