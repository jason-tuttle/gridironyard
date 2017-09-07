import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Table, Header } from 'semantic-ui-react';

class Matchup extends Component {
  render() {
    const {players, user} = this.props;
    return (
      <div style={{color: 'black', padding: '20px'}}>Matchup
        <Grid divided='vertically' stackable={false}>
          <Grid.Row columns={3}>
            <Grid.Column floated='left' width={7}>
              <Header>{user.username}</Header>
              <Table celled inverted size='small'>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell width={2}>Pos.</Table.HeaderCell>
                    <Table.HeaderCell width={5}>Player</Table.HeaderCell>
                    <Table.HeaderCell width={1} textAlign='center'>Points</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {players.map((player, index) => (
                    <Table.Row key={index}>
                      <Table.Cell>{player.position || "POS"}</Table.Cell>
                      <Table.Cell>{player.name || "Name"}</Table.Cell>
                      <Table.Cell textAlign='center'>{player.points || "0"}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Grid.Column>
            <Grid.Column width={1}>
              <Header>VS</Header>
            </Grid.Column>
            <Grid.Column floated='right' width={7}>
              <Header>{user.username}</Header>
              <Table celled inverted size='small'>
                <Table.Header>
                  <Table.HeaderCell width={2}>Pos.</Table.HeaderCell>
                  <Table.HeaderCell width={5}>Player</Table.HeaderCell>
                  <Table.HeaderCell width={1} textAlign='center'>Points</Table.HeaderCell>
                </Table.Header>
                <Table.Body>
                  {players.map((player, index) => (
                    <Table.Row key={index}>
                      <Table.Cell>{player.position || "POS"}</Table.Cell>
                      <Table.Cell>{player.name || "Name"}</Table.Cell>
                      <Table.Cell textAlign='center'>{player.points || "0"}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  const {playerReducer, userReducer} = state;
  const {loggedInUser} = userReducer;
  const {players, addPlayer, dropPlayer} = playerReducer;
  return {
    players: players.filter(player => player.owner === loggedInUser.username),
    addPlayer,
    dropPlayer,
    user: loggedInUser
  }
}

export default connect(mapStateToProps)(Matchup);
