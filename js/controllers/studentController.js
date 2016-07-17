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
        //conditional for determing of the student object's properties are undefined or empty
        if (self.newStudent.name.trim() !== '' && self.newStudent.assignment.trim() !== '' && self.newStudent.grade.trim() !== '' && typeof self.newStudent.name !== 'undefined' && typeof self.newStudent.assignment !== 'undefined' && typeof self.newStudent.grade !== 'undefined') {
            //set name and assignment equal to the string returned from a capitalize function
            var name = self.toTitleCase(self.newStudent.name);
            var assignment = self.toTitleCase(self.newStudent.assignment);
            //conditional for determing if the name, assignment, and grade inputs pass a regex test
            if (self.gradeReg(self.newStudent.grade) && self.nameReg(name) && self.assignmentReg(assignment)) {
                //add the student to firebase
                self.students.$add(self.newStudent).then(function(ref) {
                    console.log("Added: ", ref.key());
                });
                //clear the input fields
                self.clearInputs();
            } else {
                //if the regex test was failed, then show the error message
                $("#modal").modal("show");
            }
            //if the fields are empty or undefined, then ask the user to input their information
        } else {
            self.modalText = "Error: Please input a Name, Assignment, and Grade in the input field";
            $("#modal").modal("show");
        }

    };

    //method for setting the input fields equal to the current values for the student. Takes in the student object from firebase as a parameter
    self.editStudentObject = function(student) {
        //the editStudent's key and values are set to that of the student object
        self.editStudent.name = student.name;
        self.editStudent.assignment = student.assignment;
        self.editStudent.grade = student.grade;
        //the empty student object is set to the student object form firebase
        self.student = student;
        //show the edit-student modal
        $("#edit-modal").modal("show");
    };

    //method for confirming to send an updated student to firbase
    self.confirmStudentEdit = function() {
      //conditional for determing if the object is undefined or empty
        if (self.editStudent.name !== '' && self.editStudent.assignment !== '' && self.editStudent.grade !== '' && typeof self.editStudent.name !== 'undefined' && typeof self.editStudent.assignment !== 'undefined' && typeof self.editStudent.grade !== 'undefined') {
            //name and grade are set to a capitalized string
            var name = self.toTitleCase(self.editStudent.name);
            var assignment = self.toTitleCase(self.editStudent.assignment);
            var grade = self.editStudent.grade;
            //conditional for determing if name, assignment, and grade pass a regex test
            if (self.gradeReg(grade) && self.nameReg(name) && self.assignmentReg(assignment)) {
                //the value of firebase student objects are set equal to the edit student object
                self.student.name = self.editStudent.name;
                self.student.assignment = self.editStudent.assignment;
                self.student.grade = self.editStudent.grade;
                //the updated student object is saved in firebase
                self.students.$save(self.student).then(function(ref) {
                    console.log("Edited: " + ref.key());
                });
                //inputs are cleared
                self.clearInputs();
                //if the regex test failed, then show the error message
            } else {
                $("#modal").modal("show");
            }
            //if the input values are blank or undefined, then ask the user to make an input
        } else {
            self.modalText = "Error: Please input a Name, Assignment, and Grade in the input field";
            $("#modal").modal("show");
        }

    };

    //dangerCheck method for checking if any student's grade are below a certain value
    //this will return true if the condition is met and activate an ng-class
    self.dangerCheck = function(grade) {
        if (parseInt(grade) <= 60) {
            return true;
        } else {
            return false;
        }
    };

    //warningCheck method for checking if any student's grade are below a certain value
    //this will return true if the condition is met and activate an ng-class
    self.warningCheck = function(grade) {
        if (parseInt(grade) >= 61 && parseInt(grade) <= 72) {
            return true;
        } else {
            return false;
        }
    };

    //deleteStudent method for deleting a student in firebase. Takes in the firebase student object as a parameter
    self.deleteStudent = function(student) {
        //student is deleted from the firebase Array
        self.students.$remove(student).then(function(ref) {
            console.log("Removed: ", ref);
        });
    };

    //clear input method loops through the newStudent and editStudent object and deletes the values for each key value
    self.clearInputs = function() {
        for (var index in self.newStudent) {
            self.newStudent[index] = '';
        }

        for (var input in self.editStudent) {
            self.editStudent[input] = '';
        }
    };

    //gradeReg method for checking that a grade input is valid
    self.gradeReg = function(string) {
        var number = parseInt(string);
        //regular expression checks if it is a nubmber and only allows a length of 3
        var exp = /^[0-9]{1,3}$/.test(string);
        //conditional for determing the accepted range for a grade
        if (exp === true && number <= 100) {
            return true;
        } else if (exp === true && number > 100) {
            self.modalText = "Error: Please enter a valid number from 0 to 100 (no decimals).";
            return false;
        } else if (exp === false) {
            return false;
        }
    };

    //nameReg method for checking the name input for a student
    self.nameReg = function(string) {
        //regular expression ignores case and allows periods, commas, hyphens, and apostraphes
        var exp = /^[a-z ,.'-]+$/i;
        var test = exp.test(string);
        if (test === false) {
            self.modalText = "Error: Please enter a valid name.";
        }
        return test;
    };

    //assignmentReg method for checking the assignment input
    self.assignmentReg = function(string) {
        //regular expression takes letters, numbersm and accepts #
        var exp = /^[a-zA-Z 0-9\#]*$/.test(string);
        if (exp === false) {
            self.modalText = "Error: Please enter a valid assignment. (# are allowed)";
        }
        return exp;
    };

    //toTitleCase method takes a string as a parameter and capitalizes the first letter of each word
    self.toTitleCase = function(str) {
        return str.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };
}]);
