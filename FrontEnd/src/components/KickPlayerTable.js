import React from 'react';
import { connect } from 'react-redux';
import { addPlayer, dropPlayer } from '../actions/actions';
import { Table, Icon } from 'semantic-ui-react';
import {kickStatCategories} from '../data/data';

const AddDropTrade = ({team, player, add, drop}) => {
  if (player.owner && player.owner === team)
    return <Icon name='minus' bordered circular color='red' inverted onClick={() => drop(player)}/>
  else if (player.owner && player.owner !== team)
    return <Icon name='arrow up' bordered circular color='blue' inverted />
  else
    return <Icon name='add' bordered circular color='green' inverted onClick={() => add(team, player)}/>
}

class KickPlayerTable extends React.Component {
  render() {
    const {players, onClick, team, addPlayer, dropPlayer} = this.props;
    return (
      <Table celled singleLine sortable inverted size='small' unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            {kickStatCategories.map((stat, index) => (
              <Table.HeaderCell key={index} onClick={() => onClick(stat)}>{stat}</Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {players.map((player, index) => (
            <Table.Row key={index}>
              <Table.Cell>
                <AddDropTrade team={team} player={player} add={addPlayer} drop={dropPlayer}/>
              </Table.Cell>
              {kickStatCategories.map(stat => (
                <Table.Cell key={stat}>{player[stat] || '-'}</Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    )
  }
}
const mapDispatchToProps = function(dispatch) {
  return {
    addPlayer: function(team, player) {
      dispatch(addPlayer(team, player));
    },
    dropPlayer: function(player) {
      dispatch(dropPlayer(player));
    }
  }
}
export default connect(null, mapDispatchToProps)(KickPlayerTable);