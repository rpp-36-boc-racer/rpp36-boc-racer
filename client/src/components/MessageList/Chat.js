import React, {useEffect} from "react";
import useAuthContext from "../../hooks/useAuthContext";
import WithNavBar from "../withNavBar";
import Conversations from "./Conversations";
import useConversations from '../../hooks/useConversations';
const axios = require('axios').default;

export default function Chat() {
  const { user } = useAuthContext();
  const { getConversations, data, error } = useConversations();

  useEffect(() => {
    getConversations();
  }, []);

  function deleteConvoFunc(convoId) {
    axios.delete(`/instmsg-api/conversations/${convoId}`)
    .then(result => {
      getConversations();
    })
    .catch(error => {
      console.log('cannot delete conversation');
    })
  }

  function hasBeenReadFunc(convoId) {
    // axios.put()
  }

  return (
    <WithNavBar>
      <h4> Chat </h4>
      {data && <Conversations
      data={data}
      deleteConvoFunc={deleteConvoFunc.bind(this)}
      hasBeenReadFunc={hasBeenReadFunc.bind(this)}
      />}

    </WithNavBar>
  );
}
