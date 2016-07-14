app.service("studentTableService", ["$firebaseArray", function($firebaseArray) {
    var self = this,
        firebaseRef = new Firebase("https://studentgrade.firebaseio.com/students");
    self.students = $firebaseArray(firebaseRef);
}]);
