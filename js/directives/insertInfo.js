app.directive("insertGuardian", ["$compile", function($compile){
  return {
    restrict: 'A',
    link: function(scope,element,attrs){
      console.log("Click for adding information");
      var elem = angular.element('<tr><td><input type="text" name="insertGuardianRelationship"</td><td><input type="text" name="insertGuardianName"</td><td><input type="text" name="insertGuardianContact"</td></tr>');
      $compile(elem)(scope);
      element.after(elem);
    }
  };
}]);
