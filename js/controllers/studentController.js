//studentController is declared with the studentTableService as a dependency
app.controller("studentController", [
    "studentTableService",
    function(studentTableService) {
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
            self.updateInformation()
        });

        self.students.$watch(function(event) {
            self.updateInformation();
        })
        //sorType is set to the student name by default
        self.sortType = 'name';
        //sortReverse is set to false by default
        self.sortReverse = false;
        //search variable is set to an empty string by default
        self.search = '';
        //modalText for error messages is set to an empty string by default
        self.modalText = '';
        //method for udpating the Class grade average displayed on the top of the home page and updtaing the autocomplete list
        //function has no parameters and returns nothing
        self.updateInformation = function() {
            //number is declared and set to zero so the grade for each student can be added to it
            var number = 0;
            //for loop for iterating over the student array
            for (var i = 0; i < self.students.length; i++) {
                //convert the grade into a Javascript number
                self.students[i].grade = parseInt(self.students[i].grade);
                //student grade is added to the number variable
                number += self.students[i].grade;
                if(self.assignmentArray.indexOf(self.students[i].assignment) === -1){
                  //push the assignment for the student into an the assignment array
                  self.assignmentArray.push(self.students[i].assignment);
                }
            }
            //number is divided by the number of grades to get the average
            number = number / self.students.length;
            //average is set to number and set to have no decimal points
            self.average = number.toFixed(0);
        }

        //addStudent method is declared to add students to the database
        //function has no parameters and returns nothing
        self.addStudent = function() {
            //conditional for determing of the student object's properties are undefined or empty
            if (self.newStudent.name.trim() !== '' && self.newStudent.assignment.trim() !== '' && self.newStudent.grade.trim() !== '' && typeof self.newStudent.name !== 'undefined' && typeof self.newStudent.assignment !== 'undefined' && typeof self.newStudent.grade !== 'undefined') {
                //set name and assignment equal to the string returned from a capitalize function
                var name = self.toTitleCase(self.newStudent.name);
                var assignment = self.toTitleCase(self.newStudent.assignment);
                //conditional for determing if the name, assignment, and grade inputs pass a regex test
                if (self.gradeReg(self.newStudent.grade) && self.nameReg(name) && self.assignmentReg(assignment)) {
                    //add the student to firebase
                    self.newStudent.name = name;
                    self.newStudent.assignment = assignment;
                    self.students.$add(self.newStudent).then(function(ref) {
                        console.log("Added: ", ref.key());
                    });
                    //clear the input fields
                    self.clearInputs();
                } else {
                    //if the regex test was failed, then show the error message
                    $(".error-modal-text").html(self.modalText);
                    $("#modal").modal("show");
                }
                //if the fields are empty or undefined, then ask the user to input their information
            } else {
                self.modalText = "Error: Please input a Name, Assignment, and Grade in the input field";
                $(".error-modal-text").html(self.modalText);
                $("#modal").modal("show");
            }

        };

        //method for setting the input fields equal to the current values for the student. Takes in the student object from firebase as a parameter
        //function takes a student object as a parameter and returns nothing
        self.editStudentObject = function(student) {
            //Some students are locked for demostrative puposes. Conditional checks if student is locked and either allows the function to contiue or displays an error message before exiting the function.
            if (student.locked === true) {
                self.modalText = "Warning: This student is locked for demostration purposes. Please try adding a student or trying another. All net new students are editable and deletable.";
                $(".error-modal-text").html(self.modalText);
                $("#modal").modal("show");
                return;
            }
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
        //function has no parameters and returns nothing
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
                    self.editStudent.name = name;
                    self.editStudent.assignment = assignment;
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
                    $(".error-modal-text").html(self.modalText);
                    $("#modal").modal("show");
                }
                //if the input values are blank or undefined, then ask the user to make an input
            } else {
                self.modalText = "Error: Please input a Name, Assignment, and Grade in the input field";
                $(".error-modal-text").html(self.modalText);
                $("#modal").modal("show");
            }

        };

        //dangerCheck method for checking if any student's grade are below a certain value
        //this will return true if the condition is met and activate an ng-class
        //function takes a string as parameter and returns a boolean
        self.dangerCheck = function(grade) {
            if (parseInt(grade) <= 60) {
                return true;
            } else {
                return false;
            }
        };

        //warningCheck method for checking if any student's grade are below a certain value
        //this will return true if the condition is met and activate an ng-class
        //function takes a string as a paramater and returns a boolean
        self.warningCheck = function(grade) {
            if (parseInt(grade) >= 61 && parseInt(grade) <= 72) {
                return true;
            } else {
                return false;
            }
        };

        //deleteStudent method for deleting a student in firebase. Takes in the firebase student object as a parameter
        //function takes a student object as parameter and returns nothing
        self.deleteStudent = function(student) {
            //Some students are locked for demostrative puposes. Conditional checks if student is locked and either allows the function to contiue or displays an error message before exiting the function.
            if (student.locked === true) {
                self.modalText = "Warning: This student is locked for demostration purposes. Please try adding a student or trying another. All net new students are editable and deletable.";
                $(".error-modal-text").html(self.modalText);
                $("#modal").modal("show");
                return;
            }
            //student is deleted from the firebase Array
            self.students.$remove(student).then(function(ref) {
                console.log("Removed: ", ref);
            });
        };

        //clear input method loops through the newStudent and editStudent object and deletes the values for each key value
        //this function has no parameters and returns nothing
        self.clearInputs = function() {
            for (var index in self.newStudent) {
                self.newStudent[index] = '';
            }

            for (var input in self.editStudent) {
                self.editStudent[input] = '';
            }
        };

        //gradeReg method for checking that a grade input is valid
        //takes a string as a parameter and returns a boolean
        self.gradeReg = function(string) {
            var number = parseInt(string);
            //regular expression checks if it is a nubmber and only allows a length of 3
            var exp = /^[0-9]{1,3}$/.test(string);
            //conditional for determing the accepted range for a grade
            if (exp === true) {
                if (number > 0 && number <= 100) {
                    return true;
                } else if (number > 100 || number < 0) {
                    console.log(number);
                    self.modalText = "Error: Please enter a valid number from 0 to 100 (no decimals).";
                    return false;
                }

            } else if (exp === false) {
                self.modalText = "Error: Please enter a valid number from 0 to 100 (no decimals).";
                return false;
            }
        };

        //nameReg method for checking the name input for a student
        //takes a string as a parameter and returns a boolean
        self.nameReg = function(string) {
            //regular expression ignores case and allows periods, commas, hyphens, and apostraphes
            var exp = /^[a-z ,.'-]+$/i;
            var test = exp.test(string);
            //set the modalText error message based on the result of the regular expression check
            if (test === false) {
                self.modalText = "Error: Please enter a valid name.";
            }
            //split the name string to return an array with the first name, last name, and seperators
            var splitString = string.split(' ');
            //if the array of first and last names are too short or if the second index of the array is equal to an empty string then set the modalText and the test value to false
            if (splitString.length < 2 || splitString[1] === "") {
                test = false;
                self.modalText = "Error: For our records, please enter a first and last name.";
            }
            //iterate over the array of first and last names
            for (var i = 0; i < splitString.length; i++) {
                //if the name is too shorth or has been shortened (indicated by a "."), then set test to false and set the error message for the modal.
                if (splitString[i].length < 2 || splitString[i][1] === ".") {
                    self.modalText = "Error: Please enter your full first and last name.";
                    test = false;
                    break;
                }
            }
            //return the value of this test to be used in condititions when CRUD operations are used in the application
            return test;
        };

        //assignmentReg method for checking the assignment input
        //takes a string as a parameter and returns a boolean
        self.assignmentReg = function(string) {
            //regular expression takes letters, numbersm and accepts #
            var exp = /^[a-zA-Z 0-9\#:]*$/.test(string);
            if (exp === false) {
                self.modalText = "Error: Please enter a valid assignment. (# are allowed)";
            }
            return exp;
        };

        //toTitleCase method takes a string as a parameter and capitalizes the first letter of each word
        //takes a string as a parameter and returns a string
        self.toTitleCase = function(string) {
            string.charAt(0).toUpperCase();
            return string.replace(/\w\S*/g, function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        };
    }
]);
