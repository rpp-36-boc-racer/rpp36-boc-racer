import useAuthContext from "./useAuthContext";

export default () => {
  const { dispatch } = useAuthContext();

  const logout = async () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};
