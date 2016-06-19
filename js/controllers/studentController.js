app.controller("studentController", ["studentTableService", function(studentTableService){
  var self = this;
  self.headerOne = "Student Name";
  self.headerTwo = "Grade Level";
  self.headerThree = "Grade Point Average";
  self.students = studentTableService.students;
  self.guardianList = true;
  self.courseList = true;

  self.guardianExpand = function () {
    if(self.guardianList && self.courseList){
      self.headerOne = "Guardian";
      self.headerTwo = "Guardian Name";
      self.headerThree = "Guardian Contact";
      self.guardianList = false;
    }else{
      self.headerOne = "Student Name";
      self.headerTwo = "Grade Level";
      self.headerThree = "Grade Point Average";
      self.guardianList = true;
    }
  };

  self.courseExpand = function () {
    if(self.courseList && self.guardianList){
      self.headerOne = "Instructor";
      self.headerTwo = "Course";
      self.headerThree = "Grade";
      self.courseList = false;
    }else{
      self.headerOne = "Student Name";
      self.headerTwo = "Grade Level";
      self.headerThree = "Grade Point Average";
      self.courseList = true;
    }
  };
}]);
