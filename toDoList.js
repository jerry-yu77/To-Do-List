var app = angular.module('myApp', []);

app.controller('myCtrl', function ($scope) {
  $scope.tasks = [];
  var taskCount = 0;
  $scope.submitTask = function () {
    if(taskCount < 15) {
      $scope.tasks.unshift({
        name: $scope.task,
        checked: false
      });
      $scope.task = '';
      taskCount++;
    }else{
      alert("Maybe you should finish and remove some tasks first.")
    }

  }
  $scope.moveTask = function (index, checked, task) {
    if (checked === true) {
      $scope.tasks.splice(index, 1);
      $scope.tasks.push({name: task.name,
                         checked: true});
    } else {
      $scope.tasks.splice(index, 1);
      $scope.tasks.unshift({name: task.name,
                            checked: false});
    }
  }
  $scope.removeTask = function (index) {
    $scope.tasks.splice(index, 1);
    taskCount--;
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