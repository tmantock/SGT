app.controller("todoController", function(){
  var self = this;
  self.todoList = [];
  self.markAll = false;
  self.todo = '';

  self.addTodo = function () {
    if(event.keyCode === 13 && self.todo){
      self.todoList.push(self.todo);
      self.todo = '';
    }
  };

});
