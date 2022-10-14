import React from 'react';
import Conversation from './Conversation';

function Conversations(props) {
  return (
    <>
      {props.data.map((convo) => {
        return <Conversation convo={convo}/>
      })}
    </>
  );
}

export default Conversations;