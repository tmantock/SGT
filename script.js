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
    var objectPosition;
    var student = {};
    if (student_array.length > 0) {

        //Creates the student object and adds key values for object and pushes the object to the global student_array
        student.name = name;
        student.course = course;
        student.grade = grade;
        student_array.push(student);
    }

    else {
        $('.noDataText').remove();

        //Creates the student object and adds key values for object and pushes the object to the global student_array
        student.name = name;
        student.course = course;
        student.grade = grade;
        student_array.push(student);
    }
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
    //Local variables set to number for sums and average
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
    var objPosition;

    if(student_array.length > 0) {

        objPosition = student_array.length-1;

        //Variable created for DOM elements and appends them to the DOM
        var row = $('<tr>').addClass('studentRow');
        var columnName = $('<td>').text(student_array[student_array.length-1].name);
        var columnCourse = $('<td>').text(student_array[student_array.length-1].course);
        var columnGrade = $('<td>').text(student_array[student_array.length-1].grade);
        var deleteButton = $('<div>').attr('data-position',objPosition).addClass('deleteButton btn btn-danger').text('delete');
        var tdDelete = $('<td>').append(deleteButton);
        //Appends the elements to the DOM
        $(row).append(columnName,columnCourse,columnGrade,tdDelete);
        $('tbody').append(row);

        objPosition++;
    }

    else {

        objPosition = 0;

        //Variable created for DOM elements and appends them to the DOM
        var row = $('<tr>').addClass('studentRow');
        var columnName = $('<td>').text(student_array[student_array.length-1].name);
        var columnCourse = $('<td>').text(student_array[student_array.length-1].course);
        var columnGrade = $('<td>').text(student_array[student_array.length-1].grade);
        var deleteButton = $('<button>').addClass('deleteButton btn btn-warning').attr('data-position',objPosition).text('delete');
        var tdDelete = $('<td>').append(deleteButton);
        //Appends the elements to the DOM
        $(row).append(columnName,columnCourse,columnGrade,tdDelete);
        $('tbody').append(row);

        objPosition++;
    }
}
/**
 * addStudentToDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param studentObj
 */
function addStudentToDom (student) {

    //Makes call during addStudentToDom to make sure the most up-to-date list is added
    ajaxCall();

    if(student_array.length > 0) {
        var objPosition = 0;
        //For loop runs through the student_array and creates new rows and data adn appends them to the DOM
        for(i=0; i<student_array.length; i++) {
            var row = $('<tr>').addClass('studentRow');
            var columnName = $('<td>').text(student_array[i].name);
            var columnCourse = $('<td>').text(student_array[i].course);
            var columnGrade = $('<td>').text(student_array[i].grade);
            var deleteButton = $('<button>').addClass('deleteButton btn btn-warning').attr('data-position',objPosition).text('delete');
            var tdDelete = $('<td>').append(deleteButton);
            $(row).append(columnName,columnCourse,columnGrade,tdDelete);
            $('tbody').append(row);
            objPosition++;
        }
    }

    else {
        var noDataText = $('<h3>').text('No User Data Available').addClass('noDataText');
        $('.student-list-container').append(noDataText);
    }
}
/**
 * reset - resets the application to initial state. Global variables reset, DOM get reset to initial load state
 */
function reset () {
    
}

/**
 * ajaxCall - calls to the learning fuze server through an AJAX call
 */

function ajaxCall () {
    console.log('Request to server made.');
    $.ajax({
        dataType: 'json',
        url: 's-apis.learningfuze.com/sgt/get',
        input: '',
        success: function(result) {
            console.log('Successful AJAX call');
            var server_to_local = $.parseJSON(result);
            for(i=0; i<server_to_local.length; i++) {
                student_array.push(server_to_local[i]);
            }
        },
        error: function() {
            console.log('AJAX failed on success.')
        }
    });
}

/**
 * Listen for the document to load and reset the data to the initial state
 */

$(document).ready(function () {
    studentName  = $('#studentName');
    studentCourse = $('#course');
    studentGrade = $('#studentGrade');
    //On click function for deleting student from array and on the DOM
    $('.table').on('click','.deleteButton', function () {
        var position = $(this).attr('data-position');
        var positionNumber = parseInt(position);
        student_array.splice(positionNumber,1);
        $('.studentRow').remove();
        addStudentToDom();
    });

    //On click function for getting AJAX data
    $('.serverButton').on('click', function () {
        addStudentToDom();
    });

    //Calls addStudent function to add students from global array to the DOM
    addStudentToDom();
});