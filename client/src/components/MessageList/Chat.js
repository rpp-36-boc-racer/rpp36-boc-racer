import React, {useEffect} from "react";
import useAuthContext from "../../hooks/useAuthContext";
import WithNavBar from "../withNavBar";
import Conversations from "./Conversations";
import useConversations from '../../hooks/useConversations';
const axios = require('axios').default;

export default function Chat() {
  const { user } = useAuthContext();
  const { getConversations, data } = useConversations();

  useEffect(() => {
    getConversations();
  }, []);

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

  function hasBeenReadFunc(convoId) {
    // axios.put()
  }

  return (
    <WithNavBar>
      <h4> Chat </h4>
      <p>logged in as {user.username}</p>
      {data && (
        <Conversations
          data={data}
          deleteConvoFunc={deleteConvoFunc.bind(this)}
          hasBeenReadFunc={hasBeenReadFunc.bind(this)}
        />
      )}
    </WithNavBar>
  );
}
