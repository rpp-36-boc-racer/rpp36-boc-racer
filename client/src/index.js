import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import SocketContext, { socket } from "./contexts/SocketContext";
import App from "./components/App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SocketContext.Provider value={socket}>
          <App />
        </SocketContext.Provider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
