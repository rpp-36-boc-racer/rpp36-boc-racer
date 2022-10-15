import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';

const profileImageStyle = {
  borderRadius: '50%',
  padding: '5px',
  height: '50px',
  width: '50px'
};

const sameLineStyleAndSpace = {
  display: 'flex',
  justifyContent: 'space-between'
};

const sameLineStyle = {
  display: 'flex'
};

const getConvoTime = (convoTime) => {
  const timeElapsed = moment(convoTime).fromNow();

  return timeElapsed;
};
//
function Conversation(props) {
  const { profileImage, friendId, username, text, time, conversationId } = props.convo;
  return (
    <div style={sameLineStyle}>
      <Link to={`/instmsgchats/messages/${conversationId}/${friendId}`}>
        <div data-testid="convo">
          <div id="profileImage">
            <img src={profileImage} style={profileImageStyle}></img>
          </div>
          <div style={sameLineStyle}>
            <div>{username}</div>
            <div>{getConvoTime(time)}</div>
          </div>
            <div>{text}</div>

        </div>
      </Link>
      <button data-testid="delete" onClick={() => {
        props.deleteConvoFunc(conversationId);
      }}>Delete</button>
    </div>
  );
}

export default Conversation;