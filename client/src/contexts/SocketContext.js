import React from "react";
import io from "socket.io-client";

// eslint-disable-next-line import/prefer-default-export
export const socket = io("ws://localhost:4000");
const SocketContext = React.createContext(socket);
export default SocketContext;
