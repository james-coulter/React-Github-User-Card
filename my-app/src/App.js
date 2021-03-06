import React, { useReducer } from 'react';
import axios from 'axios';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import {Card, Icon, Image} from 'semantic-ui-react';
import UserCard from './UserCard.js';


export default class App extends React.Component {
  
  constructor() {
    super()
    this.state = {
      me: [],
      avatar: [],
      location: [],
      bio: [],
      repos: [],
      cardInfo: [],
      followersInfo: [],
      Users: [],
      value: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event) {
    this.setState({value: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    alert('A name was submitted: ' + this.state.value)
  }

  componentDidMount() {
    fetch('https://api.github.com/users/james-coulter')
    .then((res) => res.json())
    .then(data => {
      // console.log('User Data', data)
      this.setState({ name: data.name})
      this.setState({location: data.location})
      this.setState({ avatar: data.avatar_url})
      this.setState({ repos: data.public_repos})
      this.setState({ bio: data.bio})
    })
    .catch(err => console.log('Oh no!', err))

    axios
      .get(
        "https://api.github.com/users/james-coulter/followers"
      )
      .then((res) => {
        this.setState({
          followersInfo: res.data,
        });
        console.log("followers", res);
        res.data.forEach((person) => {
          axios
            .get(
              `https://api.github.com/users/${person.login}`
            )
            .then((res) => {
              let joined = this.state.Users.concat(res.data);
              this.setState({
                Users: joined,
              });
              console.log("follower", res);
            });
        });
      })
      .catch((err) => console.log(err));
  }




  render () {


  return (
    <div className="App">
      <header>
      <h1>Github UserCard</h1>
      </header>

      <div className="meCard">
        <Card>
          <Image src={this.state.avatar} wrapped ui={false} />
          <Card.Content>
            <Card.Header>{this.state.name}</Card.Header>
            <Card.Meta>
              <span className='date'>{this.state.location}</span>
              </Card.Meta>
              <Card.Description>
              {this.state.bio}
            </Card.Description>
            </Card.Content>
            <Card.Content extra>
            <a>
              <Icon name='user' />
              Repos: {this.state.repos}
            </a>
          </Card.Content>
        </Card>
  
      </div>
      <UserCard Users={this.state.Users}/>
      <div className="chart"> 
      <input placeholder='Enter username' type='text' value={this.state.value} onChange={this.handleChange} />
      {this.state.value == '' ? <><h3>James-Coulter's Contribution Chart</h3><img src='https://ghchart.rshah.org/james-coulter' alt="username's Github chart" /></> :
     <> <h3>{this.state.value}'s Contribution Chart</h3>
  <img src={`https://ghchart.rshah.org/${this.state.value}`} alt="username's Github chart" /></> }
      </div>
    </div>
  );
}
}

