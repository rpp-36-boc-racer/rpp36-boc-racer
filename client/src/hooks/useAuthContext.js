import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw Error("useAuthContext must be used inside an AuthContext Provider");
  }
  return context;
};
