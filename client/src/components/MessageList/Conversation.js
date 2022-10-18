import moment from "moment";
import React from "react";

const profileImageStyle = {
  borderRadius: "50%",
  padding: "5px",
  height: "50px",
  width: "50px",
};

const sameLineStyleAndSpace = {
  display: "flex",
  justifyContent: "space-between",
};

const sameLineStyle = {
  display: "flex",
};

const boldFont = {
  fontWeight: 'bold'
}

const getConvoTime = (convoTime) => {
  const timeElapsed = moment(convoTime).fromNow();

  return timeElapsed;
};
//
function Conversation(props) {
  console.log('props in convo', props)
  const { profileImage, username, text, time, conversationId, hasBeenRead } = props.convo;
  return (
    <div data-testid="convo" style={sameLineStyleAndSpace}>
      <div style={sameLineStyle} onClick={() => { props.hasBeenReadFunc(textMessageId); }}>
        <div>
          <img src={profileImage} style={profileImageStyle} />
        </div>
        <div>
          <div style={sameLineStyleAndSpace}>
            <div style={boldFont}>{username}</div>
            <div style={{fontWeight: hasBeenRead? 'none' : 'bold'}}>{getConvoTime(time)}</div>
          </div>
          <div style={{fontWeight: hasBeenRead? 'none' : 'bold'}}>{text}</div>
        </div>
      </div>
      <button
        data-testid="delete"
        onClick={() => { props.confirmDeleteFunc(username); }}
      >
        Delete
      </button>
    </div>
  );
}

export default Conversation;
