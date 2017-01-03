const Firebase = require('firebase');
const FirebaseRef = new Firebase("https://studentgrade.firebaseio.com/students");
import { RETRIEVE_STUDENTS } from './types';

export function loadStudents () {
    return function(dispatch) {
        let students = [];
        FirebaseRef.on('value', function(data){
            let result = data.val();
            for(let student in result){
                students.push(result[student]);
            }
            dispatch({ type: RETRIEVE_STUDENTS, payload: students});
        });
    }
}
