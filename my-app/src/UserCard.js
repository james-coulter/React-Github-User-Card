import React from 'react';
// import './Card.css';
import 'semantic-ui-css/semantic.min.css';
import {Card, Icon, Image} from 'semantic-ui-react';

function UserCard(props) {
const {Users} = props;


  return (
    <div className="userCard">
    {Users.map((follower, index) => {
      return (
        <Card className="indCard" key={index}>
        <Image src={follower.avatar_url} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{follower.name}</Card.Header>
          <Card.Meta>
            <span className='date'>{follower.location}</span>
            </Card.Meta>
            <Card.Description>
            {follower.bio}
            <br></br>
            {follower.login}
          </Card.Description>
          </Card.Content>
          <Card.Content extra>
          <a>
            <Icon name='user' />
            Repos: {follower.public_repos}
          </a>
        </Card.Content>
      </Card>
      )
    })}
    </div>
  )
  }

export default UserCard;