import Ember from 'ember';

const { attr } = DS;

export default Ember.Route.extend({
    studentId: attr('string'),
    firstname: attr('string'),
    lastname: attr('string'),
    grade: attr('number'),
    created: attr('string', {
        defaultValue() {
            return new Date();
        }
    })
});
