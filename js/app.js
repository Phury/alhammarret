class ActionBarComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = { changeLifeTotal: false };
  }

  render() {
  	return (
    	<div className="fixed-action-btn toolbar">
        <a className="btn-floating btn-large blue-grey">
          <i className="material-icons">menu</i>
        </a>
        {this.state.changeLifeTotal &&
          <ul>
            <li>
              <a href="#" onClick={(evt) => {
                  evt.preventDefault();
                  this.setState({ changeLifeTotal: false });
                  this.props.update('lifeTo20');
                }}>20</a>
            </li>
            <li>
              <a href="#" onClick={(evt) => {
                  evt.preventDefault();
                  this.setState({ changeLifeTotal: false });
                  this.props.update('lifeTo30');
                }}>30</a>
            </li>
            <li><a href="#" onClick={(evt) => {
                  evt.preventDefault();
                  this.setState({ changeLifeTotal: false });
                  this.props.update('lifeTo40');
                }}>40</a>
            </li>
          </ul>
        }
        {!this.state.changeLifeTotal &&
          <ul>
            <li className="waves-effect waves-light">
              <a href="#" onClick={(evt) => {
                  evt.preventDefault();
                  this.props.update('reset');
                }}>reset</a>
            </li>
            <li className="waves-effect waves-light">
              <a href="#" onClick={(evt) => {
                  evt.preventDefault();
                }}>roll dice</a>
            </li>
            <li className="waves-effect waves-light">
              <a href="#" onClick={(evt) => {
                  evt.preventDefault();
                  this.setState({ changeLifeTotal: true });
                }}>life total</a>
            </li>
            <li className="waves-effect waves-light">
              <a href="#" onClick={(evt) => {
                  evt.preventDefault();
                  this.props.update('showSettings');
                }}>settings</a>
            </li>
          </ul>
        }
      </div>
    );
  }
}

class LifeCounterComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lifeTotal: this.props.lifeTotal,
      currentLife: this.props.lifeTotal,
      currentPoison: 0,
      currentEnergy: 0,
      pId: this.props.player.id,
      name: this.props.player.name,
      color: this.props.player.color,
      showPoison: this.props.player.showPoison,
      showEnergy: this.props.player.showEnergy
    };
  }
  
  componentWillReceiveProps(nextProps) {
  	if (nextProps.lifeTotal != this.state.lifeTotal) {
      this.setState({
      	currentLife: nextProps.lifeTotal,
        lifeTotal: nextProps.lifeTotal
      });
    }
  }
  
  render() {
  	return (
      <div className={"life-counter "+this.state.color}>
        <div className="row life-counter-header">
          <div className="col s4">
            <p className="player-name">
              {this.state.color === 'w' &&
                <i className="ms ms-w"></i>
              }
              {this.state.color === 'u' &&
                <i className="ms ms-u"></i>
              }
              {this.state.color === 'b' &&
                <i className="ms ms-b"></i>
              }
              {this.state.color === 'r' &&
                <i className="ms ms-r"></i>
              }
              {this.state.color === 'g' &&
                <i className="ms ms-g"></i>
              }
              {'\u00A0'}
              {this.state.name}
            </p>
          </div>
          <div className="col s8">
            <ul className="inline right">
              <li>
                <a href="#" 
                  onClick={(evt) => {
                    evt.preventDefault();
                    this.props.update('showOptionsP'+this.state.pId);
                  }} className="color-pick">
                  <i className="material-icons">settings</i>
                </a>
              </li>
            </ul>
          </div>
        </div>
                  
        <div className="row life-counter-content">
          <div className="col s4 center-align">
            <div className="valign-wrapper">
              <p>
                <a href="#" 
                  onClick={(evt) => {
                    evt.preventDefault();
                    this.setState({ currentLife: this.state.currentLife-1 });
                  }} className="life-min">
                  <i className="material-icons">remove</i>
                </a>
              </p>
            </div>    
          </div>
          <div className="col s4 center-align">
            <div className="valign-wrapper">
              <p className="life">{this.state.currentLife}</p>  
            </div>
          </div>
          <div className="col s4 center-align">
            <div className="valign-wrapper">
              <p>
                <a href="#" 
                  onClick={(evt) => {
                    evt.preventDefault();
                    this.setState({ currentLife: this.state.currentLife+1 });
                  }} className="life-plus">
                  <i className="material-icons">add</i>
                </a>
              </p>
            </div>
          </div>                  
        </div>
        <div className="life-counter-extra">
          {this.state.showPoison &&
            <p className="range-field">
              <label htmlFor="poison"><i className="ms ms-p"></i>{'\u00A0'}poison</label>
              <input id="poison" type="range" min="0" max="10" value={this.state.currentPoison} 
                onChange={(e) => this.setState({currentPoison: e.target.value})} />
            </p>
          }
          {this.state.showEnergy &&
            <p className="range-field">
              <label htmlFor="energy"><i className="ms ms-e"></i>{'\u00A0'}energy</label>
              <input id="energy" type="range" min="0" max="30" value={this.state.currentEnergy} 
                onChange={(e) => this.setState({currentEnergy: e.target.value})} />
            </p>
          }  
        </div>
      </div>
    );
  }
}

class LifeCounterOptionsComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pId: this.props.player.id,
      name: this.props.player.name,
      selectedColor: this.props.player.color,
      showPoison: this.props.player.showPoison,
      showEnergy: this.props.player.showEnergy
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  
  handleSubmit(evt) {
    evt.preventDefault();
    const player = {
      id: this.state.pId,
      name: this.state.name,
      color: this.state.selectedColor,
      showPoison: this.state.showPoison,
      showEnergy: this.state.showEnergy
    };
    this.props.playerUpdate(player);
  }
  
  handleInputChange(evt) {
    const target = evt.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    
	console.log({name: name, value: value});
    
    this.setState({
      [name]: value
    });
  }
  
  createColorOption = color => {
  	return (
    	<li key={color}>
        <a href="#" onClick={(e) => {
            e.preventDefault();
            this.setState({ selectedColor: color });
          }}>
          <i className={"ms ms-"+color+" "+(this.state.selectedColor===color ? "ms-cost ms-shadow" : "") }></i>
        </a>
      </li>
    );
  }
  
  render() {
  	return (
      <div className={"life-counter-options "+this.state.selectedColor}>
        <form className="container" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="input-field col s12">
              <input name="name" type="text" value={this.state.name} id="name"               
                onChange={this.handleInputChange} />
            </div>
          </div>
          <ul className="inline mana">
            { ["w", "u", "b", "r", "g"].map(this.createColorOption) }
          </ul>
          <ul className="inline counters">
            <li>
              <a href="#" onClick={(e) => {
                	e.preventDefault();
                	this.setState({ showPoison: !this.state.showPoison });
                }}>
                  <i className={"ms ms-p "+(this.state.showPoison ? "ms-cost ms-shadow" : "") }></i>
              </a>
            </li>
            <li>
              <a href="#" onClick={(e) => {
                	e.preventDefault();
                	this.setState({ showEnergy: !this.state.showEnergy });
                }}>
                  <i className={"ms ms-e "+(this.state.showEnergy ? "ms-cost ms-shadow" : "") }></i>
              </a>
            </li>
          </ul>
          <div className="input-field col s12 text-right">
            <input value="Go!" id="submit" type="submit" className="btn" />
          </div>
          <br />
        </form>
      </div>
    );
  }
}

class LifeCounterApp extends React.Component {

	constructor(props) {
    super(props);
  	this.state = { 
      lifeTotal: 20, 
      backgroundColor: '',
      players: [
      {
      	id: 0,
        name: "player 1",
        color: "b",
        showPoison: false,
        showEnergy: false,
        showOptions: true
      },
      {
      	id: 1,
        name: "player 2",
        color: "u",
        showPoison: false,
        showEnergy: false,
        showOptions: true
      }]
    };
    this.update = this.update.bind(this);
    this.playerUpdate = this.playerUpdate.bind(this);
  }
  
  playerUpdate(player) {
  	const players = this.state.players;
    player.showOptions = false;
    players[player.id] = player;
  	this.setState(players);
  }
  
  update(event) {
  	const players = this.state.players;
  	switch(event) {
    	case 'reset':
        this.setState({ lifeTotal: this.state.lifeTotal });
        this.forceUpdate();
        break;
    	case 'lifeTo20':
      	this.setState({ lifeTotal: 20, showLifeTotalPicker: false });
        break;
    	case 'lifeTo30':
      	this.setState({ lifeTotal: 30, showLifeTotalPicker: false });
        break;
    	case 'lifeTo40':
      	this.setState({ lifeTotal: 40, showLifeTotalPicker: false });
        break;
      case 'showOptionsP0':
        players[0].showOptions = true;
      	this.setState({ players: players });
        break;
      case 'showOptionsP1':
        players[1].showOptions = true;
      	this.setState({ players: players });
        break;
    }
  }

	render() {
  	return (
    	<div className="app-wrapper">
    	  <ActionBarComponent update={this.update} />
        {this.state.players.map((player, i) => {
        	if (player.showOptions) {
            return (
            	<LifeCounterOptionsComponent
                key={i} 
                player={player}
                playerUpdate={this.playerUpdate} />
            );
          } else {
            return (
              <LifeCounterComponent 
                key={i}
                update={this.update} 
                lifeTotal={this.state.lifeTotal}
                player={player} />
            );
          }
        })}
      </div>
    );
  }
}

ReactDOM.render(
  <LifeCounterApp />,
  document.getElementById('app')
);