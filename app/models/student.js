import DS from 'ember-data';

const { attr } = DS;

export default DS.Model.extend({
    firstname: attr('string'),
    lastname: attr('string'),
    grade: attr('number', {
        defaultValue() {
            return 12;
        }
    }),
    assignments: attr(),
    created: attr('string', {
        defaultValue() {
            return new Date();
        }
    })
});
