angular
  .module('toDoApp', [])
  .controller('ToDoCtrl', ToDoCtrl)
  .directive('onEnter', onEnter);

function ToDoCtrl($scope) {
  $scope.tasks      = [];
  var taskCount     = 0;
  $scope.submitTask = submitTask;
  $scope.moveTask   = moveTask;
  $scope.removeTask = removeTask;

  function submitTask() {
    //only allow 15 tasks on page
    if (taskCount < 15) {
      //new task added to beginning of tasks[]
      $scope.tasks.unshift({
        name: $scope.task,
        checked: false
      });
      $scope.task = '';
      taskCount++;
    } else {
      alert("Maybe you should finish and remove some tasks first.");
    }
  }

  function moveTask(index, checked, task) {
    //move checked task to end of tasks[]
    if (checked === true) {
      $scope.tasks.splice(index, 1);
      $scope.tasks.push({
        name: task.name,
        checked: true
      });
      //move unchecked task to beginning of tasks[]
    } else {
      $scope.tasks.splice(index, 1);
      $scope.tasks.unshift({
        name: task.name,
        checked: false
      });
    }
  }

  function removeTask(index) {
    $scope.tasks.splice(index, 1);
    taskCount--;
  }
}

function onEnter() {
  return function (scope, element, attrs) {

    element.bind("keydown keypress", function (event) {
      var keyCode = event.which || event.keyCode;

      // If enter key is pressed
      if (keyCode === 13) {
        scope.$evalAsync(function () {
          // Evaluate the expression
          scope.$eval(attrs.onEnter);
        });
        event.preventDefault();
      }
    });
  };
}