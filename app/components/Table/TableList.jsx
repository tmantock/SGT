import React, { Component } from 'react';

class TableList extends Component {
    render() {
        const { name, assignment, grade } = this.props.student;
        return (
            <tr>
                <td>{name}</td>
                <td>{assignment}</td>
                <td>{grade}</td>
            </tr>
        )
    }
}

export default TableList;