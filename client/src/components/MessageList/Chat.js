import React, { useEffect } from "react";
import useAuthContext from "../../hooks/useAuthContext";
import WithNavBar from "../withNavBar";
import Conversations from "./Conversations";
import useConversations from "../../hooks/useConversations";
const axios = require('axios').default;

export default function Chat() {
  const { user } = useAuthContext();
  const { data, error } = useConversations();
  console.log('user', user)

  // useEffect(() => {
  //   getConversations();
  // }, []);

  function deleteConvoFunc(convoId) {
    axios
      .delete(`/instmsg-api/conversations/${convoId}`)
      .then((result) => {
        getConversations();
      })
      .catch((error) => {
        console.log(`cannot delete conversation.\n ${error}`);
      });
  }

  function hasBeenReadFunc(textMessageId) {
    console.log('in chat: textmessageid', textMessageId)
    axios
      .put(`/instmsg-api/messages/${textMessageId}`)
      .then(result => {
        console.log('success in update hasBeenRead');
      })
      .catch(error => {
        console.log('failed in update hasBeenRead');
      });
  }

  function confirmDeleteFunc(friendUsername) {

    if (confirm(`Delete conversation with ${friendUsername}?`)) {
      deleteConvoFunc();
    }
  }

  return (
    <WithNavBar>
      <h3 style={{textAlign: 'center'}}> Chat </h3>
      {data && (
        <Conversations
          data={data}
          user={user}
          deleteConvoFunc={deleteConvoFunc.bind(this)}
          hasBeenReadFunc={hasBeenReadFunc.bind(this)}
          confirmDeleteFunc={confirmDeleteFunc.bind(this)}
        />
      )}
    </WithNavBar>
  );
}
