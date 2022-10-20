import React from 'react';
import Conversation from './Conversation';

function Conversations(props) {
  return (
    <div>
      {props.data.map((convo) => {
        return <Conversation
        convo={convo}
        user={props.user}
        deleteConvoFunc={props.deleteConvoFunc}
        key={convo.conversationId}
        hasBeenReadFunc={props.hasBeenReadFunc}
        confirmDeleteFunc={props.confirmDeleteFunc}
        />
      })}
    </div>
  );
}

export default Conversations;
