import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react';

const Users = props => {
  const { users } = props;
  console.log(users);
  return (
    <div className='users'>
      <h3>USERS</h3>
      <Table color='teal' inverted>
        <Table.Body>
          <Table.Row>
            <Table.Cell>User</Table.Cell>
            <Table.Cell>
              <b>Blogs created</b>
            </Table.Cell>
          </Table.Row>
          {users.map(user => (
            <Table.Row key={user.id}>
              <Table.Cell><Link to={`/users/${user.id}`}>{user.name}</Link></Table.Cell>
              <Table.Cell>{user.blogs.length}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    users: state.user.all,
  };
};

export default connect(mapStateToProps)(Users);
