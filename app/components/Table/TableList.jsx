import React, { Component } from 'react';

class TableList extends Component {
    render() {
        const { name, assignment, grade } = this.props.student;
        console.log(this.props);
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