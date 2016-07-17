//student input directive for storing the html template for the student input form
app.directive("studentInfo", function() {
    return {
        restrict: 'E',
        scope: true,
        templateUrl: 'js/directives/studentInfo.html',
        link: function($scope, $element, $attr) {
          angular.element($element).append($scope[$attr.ngModel]);
    }
    };
});
