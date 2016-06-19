app.service("studentTableService", ["$firebaseArray", function($firebaseArray){
  var self = this,
  firebaseRef = new Firebase("https://studentgrade.firebaseio.com/students");
  self.students = new $firebaseArray(firebaseRef);
  self.inputs = ["sName","sGrade","sGPA","gNameOne","gContactOne","gNameTwo","gContactTwo","sCourse","sCourseGrade"];

  self.add = function (student) {
    firebaseRef.push({
      name: student.name,
      course: student.grade,
      gpa: student.gpa
    });
  };

  self.delete = function (key) {
    firebaseRef.child(key).remove();
  };

  self.getStudentInfo = function (key) {
    var studentInfo = {};
    firebaseRef.once("value", function (snapshot) {
      studentInfo.name = snapshot.child(key).child('name');
      studentInfo.grade = snapshot.child(key).child('grade');
      studentInfo.gpa = snapshot.child(key).child('gpa');
      studentInfo.guardian = snapshot.child(key).child('guardians');
      studentInfo.courses = snapshot.child(key).child('courses');
    });
    return studentInfo;
  };

  self.edit = function(newStudent) {
    var student_edit = firebaseRef.child(newStudent.key);
    student_edit.update({
      name: newStudent.name,
      course: newStudent.grade,
      gpa: newStudent.gpa
    });
  };
}]);
