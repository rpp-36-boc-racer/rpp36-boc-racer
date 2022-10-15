import moment from 'moment';
import React from 'react';

const getConvoTime = (convoTime) => {
  const timeElapsed = moment(convoTime).fromNow();

  return timeElapsed;
};

function Conversation(props) {
  console.log('convo')
  return (
    <div onClick={() => { props.hasBeenReadFunc(); }}>
      <div data-testid="convo">
        {props.convo.profileImage}
        {props.convo.username}
        {props.convo.text}
        {getConvoTime(props.convo.time)}
      </div>
      <button data-testid="delete" onClick={() => {
        props.deleteConvoFunc(props.convo.conversationId);
      }}>Delete</button>
    </div>
  );
}

export default Conversation;