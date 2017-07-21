import Ember from 'ember';
const { set, get } = Ember;

export default Ember.Controller.extend({
    gradeLevel: 12,
    gradeLevels: [9, 10, 11, 12],

    actions: {
        setGrade(grade) {
            set(this, 'gradeLevel', grade);
        },

        newStudent() {
            let firstname = this.get('firstname');
            let lastname = this.get('lastname');
            let grade = this.get('gradeLevel');

            let student = this.store.createRecord('student', {
                firstname,
                lastname,
                grade
            });

            student.save()

            this.setProperties({
                firstname: '',
                lastname: '',
                grade: 12,
            });
        }
    }
});
