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

app.controller("courseTableController", ["courses","instructors", function (courses,instructors) {
  var self = this;
  self.courses = courses.list;
  self.instructors = instructors.list;

  self.addCourse = function () {
    var course = {
      name: self.course.name,
      instructor: self.course.instructor
    };

    self.courses.$add(course).then(function (ref) {
      console.log("Ref: ", ref);
    });
  };
}]);

app.controller("parentTableController",["parents",function (parents) {
  var self = this;
  self.parents = parents.list;

  self.
}])
