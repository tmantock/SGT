app.controller("studentController", ["studentTableService", function(studentTableService) {
    var self = this;
    self.students = studentTableService.students;
    self.studentCount = 0;
    self.guardianList = true;
    self.courseList = true;
    self.students.$loaded().then(function() {
        self.studentCount = self.students.length;
    });
    self.student = {};
    self.student.id = randomID();
    self.student.name = '';
    self.student.grade = '';
    self.student.guardians = {
        primaryGuardian: {
            name: '',
            contact: '',
            relationship: '',
            obj: "primaryGuardian"
        },
        secondaryGuardian: {
            name: '',
            contact: '',
            relationship: '',
            obj: "secondaryGuardian"
        }
    };
    self.student.courses = {
        mathematics: {
            instructor: '',
            course: '',
            grade: '',
            obj: "mathematics"
        },
        english: {
            instructor: '',
            course: '',
            grade: '',
            obj: 'english'
        },
        science: {
            instructor: '',
            course: '',
            grade: '',
            obj: 'science'
        },
        elective: {
            instructor: '',
            course: '',
            grade: '',
            obj: 'elective'
        },
        language: {
            instructor: '',
            course: '',
            grade: '',
            obj: 'language'
        },
        physed: {
            instructor: '',
            course: '',
            grade: '',
            obj: 'physed'
        }
    };

    self.submit = function() {
        studentTableService.add(self.student);
        clearInputs();
    };

    self.deleteStudent = function(key) {
        studentTableService.deleteStudent(key.$id);
    };

    self.deleteGuardian = function(key, element) {
        studentTableService.deleteGuardian(key.$id, element);
    };

    self.deleteCourse = function(key, element) {
        studentTableService.deleteCourse(key.$id, element);
    };

    self.clearInputs = function() {
        clearInputs();
    };
}]);

function randomID() {
  var number = Math.floor(Math.random() * 90000) + 10000000;
  return number;
}

function clearInputs() {
    $('input').val('');
}
