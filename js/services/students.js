app.service("studentTableService", ["$firebaseArray", function($firebaseArray) {
//     var self = this,
//         firebaseStudents = new Firebase("https://studentgrade.firebaseio.com/students"),
//         firebaseCourses = new Firebase("https://studentgrade.firebaseio.com/courses"),
//         firebaseTeachers = new Firebase("https://studentgrade.firebaseio.com/teachers"),
//         firebaseParents = new Firebase("https://studentgrade.firebaseio.com/parents");
//     self.students = new $firebaseArray(firebaseStudents);
//     self.courses = new $firebaseArray(firebaseCourses);
//     self.teachers = new $firebaseArray(firebaseTeachers);
//     self.parents = new $firebaseArray(firebaseParents);
//
//     self.compileStudents = function () {
//       var tableArray = [];
//       var student = {};
//       for(var i = 0; i < self.students.length; i++){
//         var studentObj = self.students[i];
//         var id = studentObj.$id;
//         student.firebase = id;
//         student.id = studentObj.id;
//         student.name = studentObj.name;
//         student.grade = studentObj.grade;
//         for(var x = 0; x < self.parents.length; x++){
//           student.mother = {
//             name: self.parents[x][id].mother.name,
//             contact: self.parents[x][id].mother.contact
//           };
//
//           student.father = {
//             name: self.parents[x][id].father.name,
//             contact: self.parents[x][id].father.contact,
//           };
//         }
//         console.log(self.courses);
//         var courses = {};
//
//         for(var k = 0; k < self.courses.length; k++){
//           if(self.courses[k].students.hasOwnProperty(id)){
//             var course = self.courses[k].course;
//             var instructor = self.courses[k].instructor;
//             for(var t = 0; t < self.teachers.length; t++){
//               if(self.teachers[t].id == instructor){
//                 courses[course] = {
//                   instructor: self.teachers[t].name,
//                   course: course,
//                   grade: self.courses[k].students[id]
//                 };
//               }
//             }
//
//           }
//         }
//         student.courses = courses;
//         tableArray.push(student);
//       }
//       console.log(tableArray);
//       console.log("running");
//     };
//
//     self.compileStudents();
//
//     self.addStudent = function(student) {
//         firebaseStudents.push({
//             id: student.id,
//             name: student.name,
//             grade: student.grade,
//         });
//     };
//
//     self.addGuardian = function(student, relationship, guardianObj) {
//         var studentRefId = student;
//         firebaseParents.add({
//           relationship : {
//             name: guardianObj.name,
//             contact: guardianObj.contact
//           }
//         });
//     };
//
//     self.addCourse = function(student, course, courseObj) {
//         var studentRefId = student;
//         var courseRef = firebaseCourses.child(course).child('students');
//         courseRef.add({
//           student : courseObj.grade
//         });
//     };
//
//     self.editStudent = function (key, studentObj) {
//       var studentFirebaseRef = firebaseStudents.child(key);
//       studentFirebaseRef.update({
//         name: toTitleCase(studentObj.newName),
//         grade: toTitleCase(studentObj.newGrade)
//       });
//     };
//
//     self.editGuardian = function (student, relationship, guardianObject) {
//       var guardianRef = firebaseParents.child(student).child('relationship');
//       guardianRef.update({
//         name: toTitleCase(guardianObject.newName),
//         contact: guardianObject.newContact
//       });
//     };
//
//     self.editCourse = function (course, courseObj, student) {
//       var courseRef = firebaseCourses.child(course).child('students');
//       studentFirebaseRef.update({
//         student : courseObj.grade
//       });
//     };
//
//     self.deleteStudent = function(key, index) {
//         firebaseStudents.child(key).remove();
//     };
//
//     self.deleteGuardian = function(key, index) {
//         firebaseParents.child(key).remove();
//     };
//
//     self.deleteCourse = function(course, index) {
//         firebaseCourses.child(course).child('students').child(index).remove();
//     };
//
 }]);

app.service("courses", ["$firebaseArray", function ($firebaseArray) {

}]);

app.service("parents", ["$firebaseArray", function ($firebaseArray) {

}]);

app.service("asdf", ["$firebaseArray", "$timeout", function ($firebaseArray,$timeout) {
  var self = this,
  firebaseStudentRef = new Firebase("https://studentgrade.firebaseio.com/students");
  self.list = $firebaseArray(firebaseStudentRef);

  firebaseStudentRef.on('child_changed', function (snapshot) {
    console.log("Child changed");
    console.log(snapshot.val());
    console.log(snapshot.key());
  });

}]);

app.service("instructors", ["$firebaseArray", function ($firebaseArray) {

}]);
