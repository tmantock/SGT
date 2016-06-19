app.controller("studentController", ["studentTableService", function(studentTableService){
  var self = this;
  self.students = studentTableService.students;
  console.log(self.students);
}]);
