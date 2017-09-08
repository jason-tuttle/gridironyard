import React, { Component } from 'react';
import { Accordion, Header } from 'semantic-ui-react';
import NFLGameSummary from './NFLGameSummary';
import GameBoard from './GameBoard';

export default class NFLScoreboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: {},
      activeGames: 0,
      selectedGame: null
    }
  }

  fetchScores = () => {
    fetch('https://gridironyard-api.herokuapp.com/live_update')
    .then(response => response.json())
    .then(scores => {
      const activeGames = Object.keys(scores).reduce((total, game) => {
        if (scores[game].qtr !== null && scores[game].qtr !== 'Pregame' && scores[game].qtr !== 'Final') total++;
        return total;
      }, 0)
      this.setState({scores, activeGames});
    })
    .catch(error => console.log(error));
  }

  selectGame = (id) => {
    if (this.state.selectedGame === null)
      this.setState({selectedGame: id });
    else
      this.setState({selectedGame: null});
  }

  componentDidMount() {
    this.fetchScores();
    this.timerId = setInterval(
      () => this.fetchScores(),
      this.state.activeGames > 0 ? 5000 : 60000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    let { scores, selectedGame } = this.state;
    const games = Object.keys(scores);

    return (
      <div>
        <Header size='large' >NFL Games this week:</Header>
          {games.map((gameId, index) =>
            (
              <Accordion key={gameId}>
                <Accordion.Title>
                <NFLGameSummary
                  game={scores[gameId]}
                  gameId={gameId}
                  onClick={this.selectGame}/>
                </Accordion.Title>
                <Accordion.Content>
                  {gameId === this.state.selectedGame ?
                    <GameBoard gameId={gameId} /> :
                    <div></div>
                  }
                </Accordion.Content>
              </Accordion>
            )
          )}

      </div>
    );
  }

}