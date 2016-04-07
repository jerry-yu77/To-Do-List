var app = angular.module('myApp', []);

app.controller('myCtrl', function ($scope) {
  $scope.task;
  $scope.tasks = [];
  $scope.finishedTasks = [];
  $scope.submitTask = function () {
    $scope.tasks.push({name: $scope.task});
    $scope.task = '';
  }
  $scope.moveTask = function (index, checked, task) {
    if (checked === true) {
      $scope.tasks.splice(index, 1);
      $scope.finishedTasks.push({name: task.name});
    } else {
      $scope.finishedTasks.splice(index, 1);
      $scope.tasks.push({name: task.name});
    }
  }
  $scope.removeTask = function (index) {
    $scope.finishedTasks.splice(index, 1);
  }
});

app.directive('onEnter', function () {
  return function (scope, element, attrs) {

    element.bind("keydown keypress", function (event) {
      var keyCode = event.which || event.keyCode;

      // If enter key is pressed
      if (keyCode === 13) {
        scope.$apply(function () {
          // Evaluate the expression
          scope.$eval(attrs.onEnter);
        });
        event.preventDefault();
      }
    });
  };
});