//studentController is declared with the studentTableService as a dependency
app.controller("studentController", ["studentTableService", function(studentTableService) {
    //variable self is declared and set to this to keep track of this
    var self = this;
    //assignmentArray is declared to hold the list of assignments for autocomplete on html forms
    self.assignmentArray = [];
    //average is declared and initially set to 0 to show the average grade
    self.average = 0;
    //an empty student object is declared for later use
    self.student = {};
    //empty new student object is delacred to store user inputs for new students to be sent to firebase
    self.newStudent = {};
    //empty editStudent object is declared to store user inputs for an updated student to be sent to firebase
    self.editStudent = {};
    //student array for the studentController is set to the student array retrieved from firebase by the studentTableService
    self.students = studentTableService.students;
    //Once the students have been loaded from firebase, the average grade is set and the assignment from each student is pushed to the assignment array
    self.students.$loaded().then(function() {
        //number is declared and set to zero so the grade for each student can be added to it
        var number = 0;
        //for loop for iterating over the student array
        for (var i = 0; i < self.students.length; i++) {
            //convert the grade into a Javascript number
            self.students[i].grade = parseInt(self.students[i].grade);
            //push the assignment for the student into an the assignment array
            self.assignmentArray.push(self.students[i].assignment);
            //student grade is added to the number variable
            number += self.students[i].grade;
        }
        //number is divided by the number of grades to get the average
        number = number / self.students.length;
        //average is set to number and set to have no decimal points
        self.average = number.toFixed(0);
    });
    //sorType is set to the student name by default
    self.sortType = 'name';
    //sortReverse is set to false by default
    self.sortReverse = false;
    //search variable is set to an empty string by default
    self.search = '';
    //modalText for error messages is set to an empty string by default
    self.modalText = '';

    //addStudent method is declared to add students to the database
    self.addStudent = function() {
      //conditional for determining if the student object's properties are undefined or empty
      //if not undefined or empty then
        if (self.newStudent.name !== '' && self.newStudent.assignment !== '' && self.newStudent.grade !== '' && typeof self.newStudent.name !== 'undefined' && typeof self.newStudent.assignment !== 'undefined' && typeof self.newStudent.grade !== 'undefined' ) {
            //name is set to the string
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
        if (self.editStudent.name !== '' && self.editStudent.assignment !== '' && self.editStudent.grade !== '' && typeof self.editStudent.name !== 'undefined' && typeof self.editStudent.assignment !== 'undefined' && typeof self.editStudent.grade !== 'undefined') {
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
