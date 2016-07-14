app.controller("todoController", function() {
    var self = this;
    self.todoList = [];
    self.markAll = false;
    self.todo = '';
    self.completed = 0;
    self.task = "Tasks";

    self.addTodo = function() {
        if (event.keyCode === 13 && self.todo) {
            self.todoList.push(self.todo);
            self.todo = '';
            if (self.todoList.length === 1) {
                self.task = "Task";
            } else {
                self.task = "Tasks";
            }
        }
    };

    self.markCheck = function(toggleText) {
        if (toggleText === true && self.completed >= 0) {
            self.completed++;
        } else if (toggleText === false && self.completed >= 1) {
            self.completed--;
        }
    };

    self.removeTask = function(index) {
        self.todoList.splice(index, 1);
    };

});
