import moment from 'moment';
import React from 'react';
import { useNavigate } from 'react-router-dom';

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
};

const getConvoTime = (convoTime) => {
  const timeElapsed = moment(convoTime).fromNow();

  return timeElapsed;
};
//
function Conversation(props) {
  console.log('props in convo', props)
  const { profileImage, friendId, username, text, time, conversationId, hasBeenRead , senderId, lastMessageId} = props.convo;

  const navigate = useNavigate();
  const handleConversationClick = () => {
    navigate("/messaging", { state: { conversationId, friendId, username, profileImage } });
  };
  console.log('props.user._id', props.user._id)
  console.log('senderId', senderId)
  return (
    <div data-testid="convo" style={sameLineStyleAndSpace}>
      <div
        style={sameLineStyle}
        onClick={() => {
          props.hasBeenReadFunc(lastMessageId);
          handleConversationClick();
        }}
      >
        <div>
          <img src={profileImage} style={profileImageStyle} />
        </div>
        <div>
          <div style={sameLineStyleAndSpace}>
            <div style={boldFont}>{username}</div>
            <div style={{fontWeight: !hasBeenRead && props.user._id !== senderId? 'bold' : 'none'}}>{getConvoTime(time)}</div>
          </div>
          <div style={{fontWeight: !hasBeenRead && props.user._id !== senderId? 'bold' : 'none'}}>{text}</div>
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
