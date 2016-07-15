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
        if (self.newStudent.name !== '' && self.newStudent.assignment !== '' && self.newStudent.grade !== '' && typeof self.newStudent.name !== 'undefined' && typeof self.newStudent.assignment !== 'undefined' && typeof self.newStudent.grade !== 'undefined') {
            var name = self.toTitleCase(self.newStudent.name);
            var assignment = self.toTitleCase(self.newStudent.assignment);
            if (self.gradeReg(self.newStudent.grade) && self.nameReg(name) && self.assignmentReg(assignment)) {
                self.students.$add(self.student).then(function(ref) {
                    console.log("Added: ", ref.key());
                });
                self.clearInputs();
            } else {
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
        if (self.editStudent.name !== '' && self.editStudent.assignment !== '' && self.editStudent.grade !== '' && typeof self.editStudent.name !== 'undefined' && typeof self.editStudent.assignment !== 'undefined' && typeof self.editStudent.grade !== 'undefined') {
            var name = self.toTitleCase(self.editStudent.name);
            var assignment = self.toTitleCase(self.editStudent.assignment);
            var grade = self.editStudent.grade;
            if (self.gradeReg(grade) && self.nameReg(name) && self.assignmentReg(assignment)) {
                self.student.name = self.editStudent.name;
                self.student.assignment = self.editStudent.assignment;
                self.student.grade = self.editStudent.grade;
                self.students.$save(self.student).then(function(ref) {
                    console.log("Edited: " + ref.key());
                });
                self.clearInputs();
            } else {
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
        self.students.$remove(student).then(function(ref) {
            console.log("Removed: ", ref);
        });
    };

    self.clearInputs = function() {
        for (var index in self.newStudent) {
            self.newStudent[index] = '';
        }

        for (var input in self.editStudent) {
            self.editStudent[input] = '';
        }
    };

    self.gradeReg = function(string) {
        var number = parseInt(string);
        var exp = /^[0-9]{1,3}$/.test(string);
        if (exp === true && number <= 100) {
            return true;
        } else if (exp === true && number > 100) {
            self.modalText = "Error: Please enter a valid number from 0 to 100 (no decimals).";
            return false;
        } else if (exp === false) {
            return false;
        }
    };

    self.nameReg = function(string) {
        var exp = /^[a-z ,.'-]+$/i;
        var test = exp.test(string);
        if (test === false) {
            self.modalText = "Error: Please enter a valid name.";
        }
        return test;
    };

    self.assignmentReg = function(string) {
        var exp = /^[a-zA-Z 0-9\#]*$/.test(string);
        if (exp === false) {
            self.modalText = "Error: Please enter a valid assignment. (# are allowed)";
        }
        return exp;
    };

    self.toTitleCase = function(str) {
        return str.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };
}]);
