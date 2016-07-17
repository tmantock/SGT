//create a service to hold the exteral logic/data for the student database.
//Service is used to connect with Firebase and convert the data into an array to be used with ng-repeat
app.service("studentTableService", ["$firebaseArray", function($firebaseArray) {
    //variable self is declared and set equal to this, so this is never lost track of
    var self = this,
    //connection to firebse
        firebaseRef = new Firebase("https://studentgrade.firebaseio.com/students");
    //the firebase array is set to a variable for use with teh studentController
    self.students = $firebaseArray(firebaseRef);
}]);
