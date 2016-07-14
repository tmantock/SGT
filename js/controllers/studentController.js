app.controller("studentController", ["studentTableService", function(studentTableService) {
    var self = this;
    self.assignmentArray = [];
    self.average = 0;
    self.student = {};
    self.newStudent = {};
    self.editStudent = {};
    self.students = studentTableService.students;
    self.students.$loaded().then(function() {
        var number = 0;
        for (var i = 0; i < self.students.length; i++) {
            self.students[i].grade = parseInt(self.students[i].grade);
            self.assignmentArray.push(self.students[i].assignment);
            number += self.students[i].grade;
        }
        number = number / self.students.length;
        self.average = number.toFixed(0);
    });
    self.sortType = 'name';
    self.sortReverse = false;
    self.search = '';
    self.modalText = '';

    self.addStudent = function() {
        if (self.newStudent.name !== '' && self.newStudent.assignment !== '' && self.newStudent.grade !== '') {
            var name = toTitleCase(self.newStudent.name);
            var assignment = toTitleCase(self.newStudent.assignment);
            if (gradeReg(self.newStudent.grade) && nameReg(name) && assignmentReg(assignment)) {
                self.students.$add(self.student).then(function(ref) {
                    console.log("Added: ", ref.key());
                });
                clearInputs();
            } else {
                self.modalText = "Error: Please input a valid Name, Assignment, and Grade";
                $("#modal").modal("show");
            }
        } else {
            self.modalText = "Error: Please input a Name, Assignment, and Grade in the input field";
            $("#modal").modal("show");
        }

    };

    self.editStudentObject = function(student) {
        self.editStudent.name = student.name;
        self.editStudent.assignment = student.assignment;
        self.editStudent.grade = student.grade;
        self.student = student;
        $("#edit-modal").modal("show");
    };

    self.confirmStudentEdit = function() {
        console.log(self.editStudent);
        if (self.editStudent.name !== '' && self.editStudent.assignment !== '' && self.editStudent.grade !== '') {
            var name = toTitleCase(self.editStudent.name);
            var assignment = toTitleCase(self.editStudent.assignment);
            var grade = self.editStudent.grade;
            console.log(grade);
            if (gradeReg(grade) && nameReg(name) && assignmentReg(assignment)) {
                self.student.name = self.editStudent.name;
                self.student.assignment = self.editStudent.assignment;
                self.student.grade = self.editStudent.grade;
                self.students.$save(self.student).then(function(ref) {
                    console.log("Edited: " + ref.key());
                });
                clearInputs();
            } else {
                self.modalText = "Error: Please input a valid Name, Assignment, and Grade";
                $("#modal").modal("show");
            }
        } else {
            self.modalText = "Error: Please input a Name, Assignment, and Grade in the input field";
            $("#modal").modal("show");
        }

    };

    self.dangerCheck = function(grade) {
        if (parseInt(grade) <= 60) {
            return true;
        } else {
            return false;
        }
    };

    self.warningCheck = function(grade) {
        if (parseInt(grade) >= 61 && parseInt(grade) <= 72) {
            return true;
        } else {
            return false;
        }
    };

    self.deleteStudent = function(student) {
        self.students.$remove(student).then(function (ref) {
          console.log("Removed: " , ref);
        });
    };
}]);

function nameReg(string) {
    var exp = /^[a-z ,.'-]+$/i;
    var test = exp.test(string);
    console.log("Name Reg: ", test);
    return test;
}

function assignmentReg(string) {
    var exp = /^[a-zA-Z 0-9\#]*$/.test(string);
    console.log("Assignment Reg: ", exp);
    return exp;
}

function gradeReg(string) {
    console.log(string);
    var exp = /^[0-9]{1,3}$/.test(string);
    console.log("Grade Reg: ", exp);
    return exp;
}

function clearInputs() {
    $('input').val('');
}

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
