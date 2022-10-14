import React, {useEffect} from "react";
import useAuthContext from "../../hooks/useAuthContext";
import WithNavBar from "../withNavBar";
import Conversations from "./Conversations";
import useConversations from '../../hooks/useConversations';

export default function Chat() {
  const { user } = useAuthContext();
  const { getConversations, data, error } = useConversations();

  useEffect(() => {
    getConversations();
  }, []);

  return (
    <WithNavBar>
      <h4> Chat </h4>
      {data && <Conversations data={data}/>}

    </WithNavBar>
  );
}
