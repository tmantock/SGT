$(function($) {
    /** Create Operations ======================
     *
     */
    var submitBtn = $('#addButton'),
        sgtTableElement = $('#student-table'),
        firebaseRef = new Firebase("https://studentgrade.firebaseio.com/students");

    /** Click handler to submit student information
     * Take values of the student-add-form
     */
    submitBtn.click(function() {
        if (name === '' || course === '' || grade === '') {
            $("#modal").modal("show");
        } else {
            var studentName = $('#studentName').val(),
                studentCourse = $('#course').val(),
                studentGrade = $('#studentGrade').val();
            /** Send the values to firebase
             * firebaseRef.push will append a new item to the user list
             */
            firebaseRef.push({
                name: studentName,
                course: studentCourse,
                grade: studentGrade
            });
        }
        clearInputs();
    });

    /** Read Operations ======================
     * Attach an asynchronous callback to read the data at our users firebaseReference on load
     * child_added will update the DOM everytime a new student is added to the data base
     */
    firebaseRef.on("child_added", function(studentSnapShot) {
        updateDOM(studentSnapShot);
    }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    firebaseRef.on("child_changed", function(studentSnapShot) {
        updateDOM(studentSnapShot);
    }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

    /** Update Operations ======================
     * Click handler to update student data and send to firebase
     * Get the unique id of any student
     */

    /** Edit button handler
     *
     * This is a delegated click event handler.
     * Creating the click handlers this way ensures that every
     * new student row that is added to the DOM
     * will inherit an operational edit button
     */
    sgtTableElement.on('click', '.edit-btn', function() {
        var student_id = $(this).data('id');
        var studentFirebaseRef = firebaseRef.child(student_id);

        /** The once method method will listen for an event only once and here we use it
         * to pre-fill the inputs in the form for a better user experience
         */
        studentFirebaseRef.once('value', function(snapshot) {
            $('#modal-edit-name').val(snapshot.val().name);
            $('#modal-edit-course').val(snapshot.val().grade);
            $('#modal-edit-grade').val(snapshot.val().gpa);

            $('#student-id').val(student_id);

            console.log("$('#student-id').val(student_id) : ", $('#student-id').val(student_id));

            $("#edit-modal").modal("show");
        });
    });

    /** Edit Student Function
     * studentFirebaseReference argument should be the unique url of the selected student
     * Create a function that takes an argument of the firebase reference of the student to
     * be edited when the #confirm-edit button is clicked
     */
    function studentEdit(studentFirebaseReference) {
        var newName = $('#modal-edit-name').val(),
            newCourse = $('#modal-edit-course').val(),
            newGrade = $('#modal-edit-grade').val();
        console.log('student updated', 'newName: ', newName, 'newCourse: ', newCourse, 'newGrade: ', newGrade);
        // using the correct method, send the new student values to firebase to be updated
        studentFirebaseReference.update({
            name: newName,
            course: newCourse,
            grade: newGrade
        });
    }

    /** Click handler for modal confirm button */
    $("#edit-modal").on('click', '#confirm-edit', function() {
        console.log("im here");
        console.log("('#edit-modal').find('#student-id').val() :", $('#edit-modal').find('#student-id').val());
        var studentFirebaseRef = firebaseRef.child($('#edit-modal').find('#student-id').val());
        // edit form click handler
        // Send the correct variable into the student edit function
        studentEdit(studentFirebaseRef);
        $("#edit-modal").modal('hide');
    });

    /** DELETE OPERATIONS ==================================
     *
     */

    /** Delete button handler */
    sgtTableElement.on('click', '.delete-btn', function() {
        var studentFirebaseRef = firebaseRef.child($(this).data('id'));
        console.log('this on delete-btn is: ' + $(this).data('id'));
        firebaseRef.on('child_removed', function(snapshot) {
            /** Remove the element from the DOM */
            console.log('snapshot.key is: ', snapshot.key());
            var rowId = snapshot.key();
            $('#' + rowId).remove();
        });
        // Delete the student with the correct firebase method
        studentFirebaseRef.remove();
    });

    /* Clear out inputs in the add-student-form */
    function clearInputs() {
        $('#s-name-input').val('');
        $('#s-course-input').val('');
        $('#s-grade-input').val('');
    }

    /** DOM CREATION ================================== */
    function updateDOM(studentSnapShot) {
        var studentObject = studentSnapShot.val();
        console.log(studentObject);
        var studentObjectId = studentSnapShot.key();
        var studentRow = $("#" + studentObjectId);
        if (studentRow.length > 0) {
            //change current
            studentRow.find(".student-name").text(studentObject.name);
            studentRow.find(".student-course").text(studentObject.grade);
            studentRow.find(".student-grade").text(studentObject.gpa);
        } else {
            //add new
            var sName = $('<td>', {
                    text: studentObject.name,
                    class: "student-name"
                }),
                sCourse = $('<td>', {
                    text: studentObject.grade,
                    class: "student-course"
                }),
                sGrade = $('<td>', {
                    text: studentObject.gpa,
                    class: "student-grade"
                }),
                /* Each student gets a unique edit and delete button appended to its row */
                sEditBtn = $('<button>', {
                    class: "btn btn-primary edit-btn",
                    'data-id': studentObjectId
                }),
                sEditBtnIcon = $('<span>', {
                    class: "glyphicon glyphicon-edit"
                }),
                sDeleteBtn = $('<button>', {
                    class: "btn btn-danger delete-btn",
                    'data-id': studentObjectId
                }),
                sDeleteBtnIcon = $('<span>', {
                    class: "glyphicon glyphicon-trash"
                }),
                stundentRow;
            if (studentObject.grade >= 60) {
                studentRow = $('<tr>', {
                    id: studentObjectId
                });
            } else {
                studentRow = $('<tr>', {
                    id: studentObjectId,
                    class: 'danger'
                });
            }
            // sEditBtn.append(sEditBtnIcon);
            // sDeleteBtn.append(sDeleteBtnIcon);
            // studentRow.append(sName, sCourse, sGrade, sEditBtn, sDeleteBtn);
            // sgtTableElement.append(studentRow);
        }
    }
});
