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
    
    //Conditional for determining if the No User Data text should be deleted
    if (student_array.length === 0) {
        $('.noDataText').remove();
    }

    //Creates the student object and adds key values for object and pushes the object to the global student_array
    var student = {};
    student.name = name;
    student.course = course;
    student.grade = grade;
    student_array.push(student);

    //Call functions for adding student to list and averaging the grades
    calculateAverage();
    updateStudentList();

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
function updateStudentList () {
    //Removes the Student Row Body from the DOM before appending the updated list
    $('.studentRow').remove();

    //For loop for pushing the indexes of the global array to the addStudentToDOM function for DOM creation
    for(i=0; i<student_array.length; i++) {
        addStudentToDom(student_array[i]);
    }
    //if statement to determine if the No User Data Message should be added
    if(student_array.length === 0) {
        addEmptyTableMessage();
    }
}
/**
 * addStudentToDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param studentObj
 */
function addStudentToDom (student) {
    
    //if statement to determine if the No User Data Message should be added
    if(student_array.length === 0) {
        addEmptyTableMessage();
    }

    //DOM creation for all elements to be added to the DOM
    var row = $('<tr>').addClass('studentRow');
    var columnName = $('<td>').text(student.name);
    var columnCourse = $('<td>').text(student.course);
    var columnGrade = $('<td>').text(student.grade);
    var deleteButton = $('<button>').addClass('deleteButton btn btn-danger').text('delete');

    //Delete Closure attached to the element at the time of creation
    deleteButton.on('click',function () {
        console.log(student_array[student_array.indexOf(student)]);
        student_array.splice(student_array.indexOf(student),1);
        //Calls  updateStudentList to repopulate the DOM
        updateStudentList();
    });

    var tdDelete = $('<td>').append(deleteButton);
    $(row).append(columnName,columnCourse,columnGrade,tdDelete);
    $('tbody').append(row);
    
    //Removes the No User Data Text
    $('.noDataText').remove();

}
/**
 * reset - resets the application to initial state. Global variables reset, DOM get reset to initial load state
 */
function reset () {
    
}

function addEmptyTableMessage () {
    //declare variable for displaying the No User Data Available Text
    var noDataText = $('<h3>').text('No User Data Available').addClass('noDataText');
    //Removes the No User Data Text if already on the DOM
    $('.noDataText').remove();
    //Appends the text to the DOM
    $('.student-list-container').append(noDataText);
}

/**
 * ajaxCall - calls to the learning fuze server through an AJAX call
 */

function ajaxCall () {
    console.log('Request to server made.');
    $.ajax({
        dataType: 'JSON',
        data: {api_key: 'j3HeUr1YdJ'},
        method: 'POST',
        url: 'http://s-apis.learningfuze.com/sgt/get',
        success: function (result) {
            console.log('Successful AJAX call');
            //sets result to a usable local variable
            var server_to_local = result;
            console.log('Server to Local' , server_to_local);
            //Get the array from the object relieved from the server
            var resultData = server_to_local.data;
            console.log(resultData);
            //Loop through the server array and push the indexes to the local global student array
            for(i=0; i<resultData.length; i++) {
                 student_array.push(resultData[i]);
            }
            //Calls function to update the student list
            updateStudentList();
        },
        //AJAX for if there is an error
        error: function () {
            console.log('AJAX failed on success.');
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

    //On click function for getting AJAX data
    $('.serverButton').on('click', function () {
        ajaxCall();
    });

    // //Calls addStudent to populate the DOM with the Global Array or put teh No User Data on the page
    addStudentToDom();
});