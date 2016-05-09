/**
 * Define all global variables here
 */
var student_array = [];
var studentName;
var studentCourse;
var studentGrade;
/**
 * student_array - global array to hold student objects
 * @type {Array}
 */

/**
 * inputIds - id's of the elements that are used to add students
 * @type {string[]}
 */

/**
 * addClicked - Event Handler when user clicks the add button
 */
function addClicked () {
    //variables to grab the value in the input fields
    var name = studentName.val();
    var course = studentCourse.val();
    var grade = studentGrade.val();
    //Calls addStudent function and uses selected parameters
    addStudent(name,course,grade);
}
/**
 * cancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 */
function cancelClicked () {
    //Calls function to reset the input values
    clearAddStudentForm();
}
/**
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 *
 * @return undefined
 */
function addStudent (name,course,grade) {
    //Creates the student object and adds key values for object and pushes the object to the global student_array
    var student = {};
    student.name = name;
    student.course = course;
    student.grade = grade;
    student_array.push(student);
    
    //Call functions for adding student to list and averaging the grades
    calculateAverage();
    updateStudentList(student);

    //Clear out inputs after entered in
    clearAddStudentForm();
    return student;
}
/**
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
function clearAddStudentForm () {
    //clears the input fields on the DOM
    studentName.val('');
    studentCourse.val('');
    studentGrade.val('');
}
/**
 * calculateAverage - loop through the global student array and calculate average grade and return that value
 * @returns {number}
 */
function calculateAverage () {
    //Local variables set to number for suma and average
    var sum = 0;
    var avg = 0;
    //for loop set to calculate the average for all grades
    for(i=0; i<student_array.length; i++) {
        sum += parseInt(student_array[i].grade);
        avg = Math.round(sum/student_array.length);
        $('.avgGrade').html(avg);
    }
    return avg;
}
/**
 * updateData - centralized function to update the average and call student list update
 */
function updateData () {
    //calls function for updating the student list and the grade average
    updateStudentList(student);
    calculateAverage();
}
/**
 * updateStudentList - loops through global student array and appends each objects data into the student-list-container > list-body
 */
function updateStudentList (student) {
    //Variable created for DOM elements and appends them to the DOM
    var row = $('<tr>');
    var columnName = $('<td>').text(student_array[student_array.length-1].name);
    var columnCourse = $('<td>').text(student_array[student_array.length-1].course);
    var columnGrade = $('<td>').text(student_array[student_array.length-1].grade);
    var deleteButton = $('<div>').css({
        background: '#B33A3A',
        height: '90%',
        width: '40%',
        color: '#ffffff',
        textAlign: 'center',
        borderRadius: '5%'
    }).attr('onclick','delete()').text('delete');
    var tdDelete = $('<td>').append(deleteButton);
    //Appends the elements to the DOM
    $(row).append(columnName,columnCourse,columnGrade,tdDelete);
    $('tbody').append(row);
}
/**
 * addStudentToDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param studentObj
 */
function addStudentToDom (student) {
    //For loop runs through the student_array and creates new rows and data adn appends them to the DOM
    for(i=0; i<student_array.length; i++) {
        var row = $('<tr>');
        var columnName = $('<td>').text(student_array[i].name);
        var columnCourse = $('<td>').text(student_array[i].course);
        var columnGrade = $('<td>').text(student_array[i].grade);
        var deleteButton = $('<div>').css({
            background: '#B33A3A',
            height: '90%',
            width: '40%',
            color: '#ffffff',
            textAlign: 'center',
            borderRadius: '5%'
        }).attr('onclick','delete()').text('delete');
        var tdDelete = $('<td>').append(deleteButton);
        $(row).append(columnName,columnCourse,columnGrade,tdDelete);
        $('tbody').append(row);
    }
}
/**
 * reset - resets the application to initial state. Global variables reset, DOM get reset to initial load state
 */
function reset () {
    
}

/**
 * Listen for the document to load and reset the data to the initial state
 */

$(document).ready(function () {
    studentName  = $('#studentName');
    studentCourse = $('#course');
    studentGrade = $('#studentGrade');
    var deleteButton = $('<div>').css({
        background: 'firebrick',
        height: '90%',
        width: '40%',
        color: '#ffffff',
        textAlign: 'center',
        borderRadius: '5%'
    }).attr('onclick','delete()').text('delete');

    addStudentToDom();
});