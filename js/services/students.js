app.service("studentTableService", ["$firebaseArray", function($firebaseArray) {
    var self = this,
        firebaseRef = new Firebase("https://studentgrade.firebaseio.com/students");
    self.students = new $firebaseArray(firebaseRef);
    self.inputs = ["id", "name", "grade", "guardians", "courses"];

    self.addStudent = function(student) {
        firebaseRef.push({
            id: student.id,
            name: student.name,
            grade: student.grade,
            courses: ''
        });
    };

    self.addCourse = function(student, courseObj) {
        console.log('in edit function', courseObj);
        var studentFirebaseRef = firebaseRef.child(student).child('courses');
        studentFirebaseRef.update(courseObj);
    };

    self.editStudent = function (key, studentObj) {
      var studentFirebaseRef = firebaseRef.child(key);
      studentFirebaseRef.update({
        name: toTitleCase(studentObj.newName),
        grade: toTitleCase(studentObj.newGrade)
      });
    };

    self.editCourse = function (course, courseObj, courseObject) {
      var studentFirebaseRef = firebaseRef.child(course).child('courses').child(courseObj);
      studentFirebaseRef.update({
        instructor: toTitleCase(courseObject.newInstructor),
        course: toTitleCase(courseObject.newCourse),
        grade: courseObject.newGrade
      });
    };

    self.deleteStudent = function(key, index) {
        firebaseRef.child(key).remove();
    };

    self.deleteCourse = function(key, index) {
        firebaseRef.child(key).child('courses').child(index).remove();
    };

    self.getStudentInfo = function(key) {
        var studentInfo = {};
        firebaseRef.once("value", function(snapshot) {
            studentInfo.name = snapshot.child(key).child('name');
            studentInfo.grade = snapshot.child(key).child('grade');
            studentInfo.id = snapshot.child(key).child('id');
            studentInfo.guardians = snapshot.child(key).child('guardians');
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
