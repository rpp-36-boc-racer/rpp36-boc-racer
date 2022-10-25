import React from "react";
import Conversation from "./Conversation";

function Conversations(props) {
<<<<<<< HEAD
=======
  console.log("props in conversations", props);
>>>>>>> b31fe81293862894e703302118eff8fbd3a5f618
  return (
    <div>
      {props.data.map((convo) => {
        return (
          <Conversation
            convo={convo}
            user={props.user}
            deleteConvoFunc={props.deleteConvoFunc}
            key={convo.conversationId}
            hasBeenReadFunc={props.hasBeenReadFunc}
            confirmDeleteFunc={props.confirmDeleteFunc}
          />
        );
      })}
    </div>
  );
}

export default Conversations;
