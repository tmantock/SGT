//todoControler for managing the to-do list
app.controller("todoController", function() {
    //self is declared to store this
    var self = this;
    //an emoty todolits is declared to store todos
    self.todoList = [];
    //markAll is declared for declaring if all task have completed or not. set to false by default
    self.markAll = false;
    //todo variable is set to an empty string for inputs
    self.todo = '';
    //completed variable is declared. Set to zero by default
    self.completed = 0;
    //tasks varaible is declared to toggle between Tasks or Task depending on the number or tasks
    self.task = "Tasks";

    //addTodo method for adding to todos to the array
    self.addTodo = function() {
      //conditional for determing if the enter key was clicked and a todo was entered
        if (event.keyCode === 13 && self.todo !== '') {
          //push the task to the array and set the todo input to an empty string
            self.todoList.push(self.todo);
            self.todo = '';
            //conditional for toggling between Task and Tasks
            if (self.todoList.length === 1) {
                self.task = "Task";
            } else {
                self.task = "Tasks";
            }
        }
    };

    //markCheck method for setting a test to completed and determing proper value for the completed variable
    self.markCheck = function(toggleText) {
        if (toggleText === true && self.completed >= 0) {
            self.completed++;
        } else if (toggleText === false && self.completed >= 1) {
            self.completed--;
        }
    };

    //removeTask method for removing the task from the todoList array
    self.removeTask = function(index) {
        self.todoList.splice(index, 1);
    };

});
