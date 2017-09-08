import React, { Component } from 'react';
import { Segment, Dimmer, Loader, Menu, Header, Container, Image, Feed, Grid, List, Accordion, Label } from 'semantic-ui-react';

class GameBoard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      game: null,
      gameId: ''
    };
  }

  fetchGame = (gameId) => {
    this.setState({loading: true});
    fetch(`https://gridironyard-api.herokuapp.com/live_update/${gameId}`)
    .then(function(response) {
      if (response.status === 200) return response.json();
      else
        throw new Error(`Responded ${response.status}: Something wrong with that game ID`);
    })
    .then(data => {
      this.setState({gameId, game: data[gameId], loading: false});
    })
    .catch(error => {
      this.setState({game: null, loading: false});
      console.log(error.message);
    });
  }


  componentDidMount() {
    const {gameId} = this.props;
    this.fetchGame(gameId);
    this.timerId = setInterval(
      () => this.fetchGame(gameId),
      10000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    const {game, loading} = this.state;

    if (game && Object.keys(game).length > 0) {
      let lastPlay;
      if (game.qtr !== 'Pregame') {
        const lastDrive = game.drives[game.drives.crntdrv];
        lastPlay = lastDrive.plays[Object.keys(lastDrive.plays).pop()];
      } else {
        lastPlay = 'Pregame';
      }
      // const gameDate = `${gameId.slice(0,4)}-${gameId.slice(4,6)}-${gameId.slice(6,8)} GMT-0400`;
      // const gameDateObj = new Date(gameDate);
      // const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
      const downString = ['', '1st', '2nd', '3rd', '4th'];

      return (
        <Segment>
          <Dimmer inverted active={loading}>
            <Loader />
          </Dimmer>
          <Menu fluid size='huge' widths={4} compact>
            <Menu.Item>
              <Header size='large'>{game.home.abbr}</Header>
              <Image src={`http://i.nflcdn.com/static/site/7.5/img/logos/teams-matte-80x53/${game.home.abbr}.png`}
                alt='home logo'
                verticalAlign='middle'
                inline />
            </Menu.Item>
            <Menu.Item>
              <Header size='huge'>{game.home.score['T']}</Header>
            </Menu.Item>
            <Menu.Item>
              <Header size='huge'>{game.away.score['T']}</Header>
            </Menu.Item>
            <Menu.Item>
              <Image src={`http://i.nflcdn.com/static/site/7.5/img/logos/teams-matte-80x53/${game.away.abbr}.png`}
                alt='away logo'
                verticalAlign='middle'
                inline />
              <Header size='large'>{game.away.abbr}</Header>
            </Menu.Item>
          </Menu>

          <Container textAlign='center'>
            <Header size='large'>{game.clock}</Header>
            <Segment vertical>
              {game.qtr && game.qtr !== 'Final' ? `${downString[game.down || 1]} & ${game.togo}, ball on ${game.yl}` : ''}
              <Header size='small'>Last Play:</Header>
              <span style={{fontWeight: 'bold'}}>{lastPlay.posteam}</span> {lastPlay.desc}
            </Segment>
            <Segment vertical>
              <Header size='small'>Scoring Summary:</Header>
              <Feed>
              {Object.keys(game.scrsummary).map((play, idx) => {
                const drive = game.scrsummary[play];
                const { type, desc, qtr, team } = drive;
                return (
                  <Feed.Event key={idx}>
                    <Feed.Label>
                      <Image src={`http://i.nflcdn.com/static/site/7.5/img/logos/teams-matte-80x53/${team}.png`} size='tiny' alt='logo' />
                    </Feed.Label>
                    <Feed.Content>
                      <Feed.Summary>
                        <Feed.User>{type}&nbsp;&mdash;&nbsp;{team}</Feed.User> {desc}
                        <Feed.Date>{qtr} QTR</Feed.Date>
                      </Feed.Summary>
                    </Feed.Content>
                  </Feed.Event>
                )}
              )}
              </Feed>
            </Segment>

                  <Accordion styled fluid>
                    <Accordion.Title><Label color='grey'>Team Stats</Label></Accordion.Title>
                    <Accordion.Content>
                      <Grid celled>
                        <Grid.Row columns={4}>
                          <Grid.Column textAlign='right'>
                            <Header>{game.home.abbr}</Header>
                            <List>
                              <List.Item>First Downs:</List.Item>
                              <List.Item>Total Yards:</List.Item>
                              <List.Item>Passing Yds:</List.Item>
                              <List.Item>Rushing Yds:</List.Item>
                              <List.Item>Penalties:</List.Item>
                              <List.Item>Penalty Yds:</List.Item>
                              <List.Item>Turnovers:</List.Item>
                              <List.Item>Punts:</List.Item>
                              <List.Item>Punt Yds:</List.Item>
                              <List.Item>Punt Avg:</List.Item>
                              <List.Item>Possesion:</List.Item>
                            </List>
                          </Grid.Column>
                          <Grid.Column textAlign='left'>
                            <Header>{game.home.score['T']}</Header>
                            <List>
                              {Object.values(game.home.stats.team).map((stat,idx) => (
                                <List.Item key={idx}>{stat}</List.Item>
                              ))}
                            </List>
                          </Grid.Column>
                          <Grid.Column textAlign='right'>
                            <Header>{game.away.abbr}</Header>
                            <List>
                              <List.Item>First Downs:</List.Item>
                              <List.Item>Total Yards:</List.Item>
                              <List.Item>Passing Yds:</List.Item>
                              <List.Item>Rushing Yds:</List.Item>
                              <List.Item>Penalties:</List.Item>
                              <List.Item>Penalty Yds:</List.Item>
                              <List.Item>Turnovers:</List.Item>
                              <List.Item>Punts:</List.Item>
                              <List.Item>Punt Yds:</List.Item>
                              <List.Item>Punt Avg:</List.Item>
                              <List.Item>Possesion:</List.Item>
                            </List>
                          </Grid.Column>
                          <Grid.Column textAlign='left'>
                            <Header>{game.away.score['T']}</Header>
                            <List>
                              {Object.values(game.away.stats.team).map((stat,idx) => (
                                <List.Item key={idx}>{stat}</List.Item>
                              ))}
                            </List>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </Accordion.Content>
                    <Accordion.Title><Label color='grey'>Top Players</Label></Accordion.Title>
                    <Accordion.Content>

                    </Accordion.Content>
                  </Accordion>

          </Container>
        </Segment>
      )
    } else if (loading) {
      return (
        <Loader active />
      )
    } else {
      return (
        <div>
          <Header size='medium'>Check again at game time!</Header>
        </div>
      )
    }
  }

}

export default GameBoard;
