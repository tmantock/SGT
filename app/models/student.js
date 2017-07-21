import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
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
