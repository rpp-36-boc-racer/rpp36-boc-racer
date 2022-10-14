import React, { createContext, useReducer, useMemo, useEffect } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    try {
      const json = JSON.parse(localStorage.getItem("user"));
      if (json) {
        json.user.token = json.token;
        dispatch({
          type: "LOGIN",
          payload: json.user,
        });
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err.message);
    }
  }, []);

  const authProviderValue = useMemo(
    () => ({
      ...state,
      dispatch,
    }),
    [state, dispatch]
  );

  return (
    <AuthContext.Provider value={authProviderValue}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
