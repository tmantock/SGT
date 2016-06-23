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

app.directive("guardianInfo", function() {
    return {
        restrict: 'E',
        scope: true,
        templateUrl: 'js/directives/guardianInfo.html',
        link: function($scope, $element, $attr) {
          angular.element($element).append($scope[$attr.ngModel]);
    }
    };
});

app.directive("courseInfo", function() {
    return {
        restrict: 'E',
        scope: true,
        templateUrl: 'js/directives/courseInfo.html',
        link: function($scope, $element, $attr) {
          angular.element($element).append($scope[$attr.ngModel]);
    }
    };
});
