app.directive("studentInfo", function(){
  return {
    restrict: 'E',
    scope: {
      info: '='
    },
    templateUrl: 'js/directives/studentInfo.html'
  };
});
