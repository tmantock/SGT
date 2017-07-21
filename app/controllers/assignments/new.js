import Ember from 'ember';
const { inject: { service } } = Ember;

export default Ember.Controller.extend({
    actions: {
        newAssignment() {
            let name = this.get('name');
            let points = this.get('points');

            let assignment = this.store.createRecord('assignment', {
                name,
                points
            });

            assignment.save();

            this.store.findAll('student')
                .then(s => {
                    s.map(student => {
                        console.log(student.get('assignments'));
                    });
                });

            this.setProperties({
                name: '',
                points: ''
            });
        }
    }
});
