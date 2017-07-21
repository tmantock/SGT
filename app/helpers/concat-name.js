import Ember from 'ember';

export function concatName(params, named) {
  return `${named.fname} ${named.lname}`;
}

export default Ember.Helper.helper(concatName);
