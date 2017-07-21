import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        deleteAssignment(id) {
            this.store.findRecord('assignment', id)
                .then(assignment => {
                    assignment.deleteRecord();
                    assignment.save();
                });
        }
    }
});
