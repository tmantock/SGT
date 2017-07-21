import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('students', function() {
    this.route('show', {path: 'show/:student_id'});
  });
  this.route('assignments', function() {
    this.route('show', { path: 'show/:assignment_id'});
  });
});

export default Router;
