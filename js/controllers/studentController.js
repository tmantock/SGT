app.controller("studentController", ["studentTableService", function(studentTableService) {
    var self = this;
    self.courseArray = [['pre algebra','algebra i', 'algebra ii','geometry','statistics','calculus', 'math'],['earth science', 'biology', 'chemisty', 'anatomy', 'physics','science'],['english i', 'english ii', 'english iii', 'comparative literature', 'reading comprehension','english'],['french i', 'french ii', 'french iii', 'spanish i', 'spanish ii', 'spanish iii','language'],['shop','marching band','concert band','jazz band','choir','drama','music appreciation','elective'],['physical education','football','water polo','physed']];
    self.students = studentTableService.students;
    self.studentCount = 0;
    self.guardianList = true;
    self.courseList = true;
    self.students.$loaded().then(function() {
        self.studentCount = self.students.length;
    });
    self.student = {};
    self.index = 1;
    self.student.id = randomID();
    self.student.name = '';
    self.student.grade = '';
    self.guardians = {
      name:'',
      relationship:'',
      contact:''
    };
    self.courses = {
      course: ''.toUpperCase(),
      instructor: ''.toUpperCase(),
      grade: ''
    };

    self.submit = function() {
        studentTableService.addStudent(self.student);
        clearInputs();
    };

    self.addGuardian = function(student,array){
      if(array.length <= 2){
        var guardianObj;
        if(array.length === 0){
          guardianObj= {primaryGuardian: self.guardians};
          guardianObj.primaryGuardian.obj = "primaryGuardian";
        }else if(array.length === 1) {
          guardianObj = {secondaryGuardian: self.guardians};
          guardianObj.secondaryGuardian.obj = "secondaryGuardian";
        }
        studentTableService.addGuardian(student, guardianObj);
        console.log(self.guardians);
        clearInputs();
      }else {
        console.log("Maiximum Number of Guardians has been reached");
      }
    };

    self.addCourse = function(student){
      var course = self.courses.course;
      var courseToAdd = self.generateSubject(course,self.courseArray);
      if(courseToAdd != "course not found"){
      studentTableService.addCourse(student.$id, courseToAdd);
    }
      clearInputs();
    };

    self.generateSubject = function (course,array) {
      var subject = courseCheck(course,array);
      switch (subject){
        case 'math':
          var math = { math: self.courses};
          math.math.obj="math";
          console.log(math);
          return math;
        case 'science':
          var science = { science: self.courses};
            science.science.obj="science";
            console.log(science);
            return science;
        case 'english':
          var english = { english: self.courses};
            english.english.obj="english";
            console.log(english);
            return english;
        case 'language':
          var language = { language: self.courses};
            language.language.obj="language";
            console.log(language);
              return language;
        case 'elective':
          var elective = { elective: self.courses};
            elective.elective.obj="elective";
            console.log(elective);
            return elective;
        case 'physed':
          var physed = { physed: self.courses};
            physed.physed.obj="physed";
            console.log(physed);
              return physed;
        default:
          console.log("course not found");
          break;
      }
    };

    self.deleteStudent = function(key) {
        studentTableService.deleteStudent(key.$id);
    };

    self.deleteGuardian = function(key, element) {
        studentTableService.deleteGuardian(key.$id, element);
    };

    self.deleteCourse = function(key, element) {
        studentTableService.deleteCourse(key.$id, element);
    };

    self.clearInputs = function() {
        clearInputs();
    };
}]);

function courseCheck(course,array){
  for(var i=0; i < array.length; i++){
    for(var x=0; x < array[i].length; x++){
      if(course.toLowerCase() == array[i][x]){
        return array[i][(array[i].length-1)];
      }
    }
  }
}

function randomID() {
  var number = Math.floor(Math.random() * 90000) + 10000000;
  return number;
}

function clearInputs() {
    $('input').val('');
}
