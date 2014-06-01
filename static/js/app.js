var scheduleApp = angular.module('scheduleApp', []);

scheduleApp.controller('scheduleCtrl',
  function ($scope) {

  $scope.semesters = [
    {
        "id": 0,
        "semester": "Freshman Fall"
    },
    {
        "id": 1,
        "semester": "Freshman Spring"
    },
    {
        "id": 2,
        "semester": "Sophomore Fall"
    },
    {
        "id": 3,
        "semester": "Sophomore Spring"
    },
    {
        "id": 4,
        "semester": "Junior Fall"
    },
    {
        "id": 5,
        "semester": "Junior Spring"
    },
    {
        "id": 6,
        "semester": "Senior Fall"
    },
    {
        "id": 7,
        "semester": "Senior Spring"
    },
    {
        "id": 8,
        "semester": "5th Year Fall"
    },
    {
        "id": 9,
        "semester": "5th Year Spring"
    },
  ];
  
  $scope.selectedSemester = $scope.semesters[0];

  $scope.updateSemester = function(semester){
    $scope.selectedSemester = semester;
  }
  }
)
