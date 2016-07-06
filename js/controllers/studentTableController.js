app.controller("studentTableController",["asdf",function (asdf) {
  var self = this;
  self.students = asdf.list;

  self.editStudent = function (student) {
    student.name = student.name + "123";
    self.students.$save(student).then(function (ref) {
      console.log("Ref: " , ref);
    });

  };
}]);
