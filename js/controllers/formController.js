app.controller("formController", function(){
  this.addstudent = [
    {
      icon: "glyphicon glyphicon-user",
      name: "studentName",
      id: "studentName",
      placeholder: "Student Name",
      model: "sc.student.name"
    },
    {
      icon: "glyphicon glyphicon-education",
      name: "grade",
      id: "grade",
      placeholder: "Grade",
      model: "sc.student.grade"
    }
  ];
  this.addguardian = [
    {
      icon: "glyphicon glyphicon-user",
      name: "primaryGuardian",
      id: "primaryGuardian",
      placeholder: "Primary Guardian",
      model: "sc.student.guardians.primaryGuardian.primaryGuardian"
    },
    {
      icon: "glyphicon glyphicon-earphone",
      name: "primaryContact",
      id: "primaryContact",
      placeholder: "Primary Contact",
      model: "sc.student.guardians.primaryGuardian.primaryContact"
    },
    {
      icon: "glyphicon glyphicon-user",
      name: "secondaryGuardian",
      id: "secondaryGuardian",
      placeholder: "Secondary Guardian",
      model: "sc.student.guardians.secondaryGuardian.secondaryGuardian"
    },
    {
      icon: "glyphicon glyphicon-earphone",
      name: "secondaryContact",
      id: "secondaryContact",
      placeholder: "Secondary Contact",
      model: "sc.student.guardians.secondaryGuardian.secondaryContact"
    }
  ];
  this.addcourse = [
    {
      icon: "glyphicon glyphicon-user",
      name: "mathInstructor",
      id: "mathInstructor",
      placeholder: "Math Instructor",
      model: "sc.student.courses.mathematics.instructor"
    },
    {
      icon: "fa fa-calculator",
      name: "mathCourse",
      id: "mathCourse",
      placeholder: "Math Course",
      model: "sc.student.courses.mathematics.course"
    },
    {
      icon: "fa fa-file-o",
      name: "mathgrade",
      id: "mathGrade",
      placeholder: "Grade",
      model: "sc.student.courses.mathematics.grade"
    },
    {
      icon: "glyphicon glyphicon-user",
      name: "englishInstructor",
      id: "englishInstructor",
      placeholder: "English Instructor",
      model: "sc.student.courses.english.instructor"
    },
    {
      icon: "fa fa-book",
      name: "englishCourse",
      id: "englishCourse",
      placeholder: "English Course",
      model: "sc.student.courses.english.course"
    },
    {
      icon: "fa fa-file-o",
      name: "englishgrade",
      id: "englishGrade",
      placeholder: "Grade",
      model: "sc.student.courses.english.grade"
    },
    {
      icon: "glyphicon glyphicon-user",
      name: "scienceInstructor",
      id: "scienceInstructor",
      placeholder: "Science Instructor",
      model: "sc.student.courses.science.instructor"
    },
    {
      icon: "fa fa-flask",
      name: "scienceCourse",
      id: "scienceCourse",
      placeholder: "Science Course",
      model: "sc.student.courses.science.course"
    },
    {
      icon: "fa fa-file-o",
      name: "sciencegrade",
      id: "sciecneGrade",
      placeholder: "Grade",
      model: "sc.student.courses.science.grade"
    },
    {
      icon: "glyphicon glyphicon-user",
      name: "electiveInstructor",
      id: "electiveInstructor",
      placeholder: "Elective Instructor",
      model: "sc.student.courses.elective.instructor"
    },
    {
      icon: "fa fa-pied-piper",
      name: "electiveCourse",
      id: "electiveCourse",
      placeholder: "Elective Course",
      model: "sc.student.courses.elective.course"
    },
    {
      icon: "fa fa-file-o",
      name: "electivegrade",
      id: "electiveGrade",
      placeholder: "Grade",
      model: "sc.student.courses.elective.grade"
    },
    {
      icon: "glyphicon glyphicon-user",
      name: "languageInstructor",
      id: "languageInstructor",
      placeholder: "Language Instructor",
      model: "sc.student.courses.language.instructor"
    },
    {
      icon: "fa fa-language",
      name: "languageCourse",
      id: "languageCourse",
      placeholder: "Language Course",
      model: "sc.student.courses.language.course"
    },
    {
      icon: "fa fa-file-o",
      name: "languagegrade",
      id: "languageGrade",
      placeholder: "Grade",
      model: "sc.student.courses.language.grade"
    },
    {
      icon: "glyphicon glyphicon-user",
      name: "physedInstructor",
      id: "physedInstructor",
      placeholder: "PhysEd Instructor",
      model: "sc.student.courses.physed.instructor"
    },
    {
      icon: "fa fa-bicycle",
      name: "physedCourse",
      id: "physedCourse",
      placeholder: "PhysEd Course",
      model: "sc.student.courses.physed.course"
    },
    {
      icon: "fa fa-file-o",
      name: "physedgrade",
      id: "physedGrade",
      placeholder: "Grade",
      model: "sc.student.courses.physed.grade"
    }
  ];
});
