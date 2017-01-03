import React, { Component, PropTypes } from 'react';
import TableList from './TableList.jsx';
import { Table } from 'elemental';
import { connect } from 'react-redux';
import * as actions  from '../../actions';

class TableSection extends Component {
    componentDidMount(){
        this.props.loadStudents();
    }

    renderStudentList() {
        if(this.props.students) {
            return this.props.students.map( (student, index) => <TableList key={index} student={student} />)
        } 
    }

    render() {
        return (
            <Table>
                <thead>
                    <tr>
                        <th>
                            <label>Student Name</label>
                        </th>
                        <th>
                            <label>Assignment</label>
                        </th>
                        <th>
                            <label>Grade</label>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderStudentList()}
                </tbody>
            </Table>
        );
    }
}

function mapStateToProps(state) {
    return {
        students: state.student[0]    
    }
}

export default connect(mapStateToProps, actions)(TableSection);