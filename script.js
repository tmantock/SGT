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
    var name = studentName.val();
    var course = studentCourse.val();
    var grade = studentGrade.val();
    addStudent(name,course,grade);
}
/**
 * cancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 */
function cancelClicked () {
    clearAddStudentForm();
}
/**
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 *
 * @return undefined
 */
function addStudent (name,course,grade) {
    var student = {};
    student.name = name;
    student.course = course;
    student.grade = grade;
    student_array.push(student);

    calculateAverage();
    updateStudentList(student);
    return student;
}
/**
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
function clearAddStudentForm () {
    studentName.val('');
    studentCourse.val('');
    studentGrade.val('');
}
/**
 * calculateAverage - loop through the global student array and calculate average grade and return that value
 * @returns {number}
 */
function calculateAverage () {
    var sum = 0;
    var avg = 0;

    for(i=0; i<student_array.length; i++) {
        sum += parseInt(student_array[i].grade);
        avg = sum/student_array.length;
        $('.avgGrade').html(avg);
    }
    return avg;
}
/**
 * updateData - centralized function to update the average and call student list update
 */
function updateData () {
    updateStudentList(student);
    calculateAverage();
}
/**
 * updateStudentList - loops through global student array and appends each objects data into the student-list-container > list-body
 */
function updateStudentList (student) {
    var row = $('<tr>');
    var columnName = $('<td>').text(student_array[student_array.length-1].name);
    var columnCourse = $('<td>').text(student_array[student_array.length-1].course);
    var columnGrade = $('<td>').text(student_array[student_array.length-1].grade);
    var deleteButton = $('<div>').css({
        background: 'danger',
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
/**
 * addStudentToDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param studentObj
 */
function addStudentToDom (student) {
    for(i=0; i<student_array.length; i++) {
        var row = $('<tr>');
        var columnName = $('<td>').text(student_array[i].name);
        var columnCourse = $('<td>').text(student_array[i].course);
        var columnGrade = $('<td>').text(student_array[i].grade);
        var deleteButton = $('<div>').css({
            background: 'danger',
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