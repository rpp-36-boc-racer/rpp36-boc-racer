/* eslint-disable no-undef */
import React, { useEffect } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import PropTypes from "prop-types";
import { AuthProvider } from "../../contexts/AuthContext";
import App from "../App";
import "@testing-library/jest-dom";
import useAuthContext from "../../hooks/useAuthContext";

describe("Auth test", () => {
  let store = {};
  const localStorageMock = (() => ({
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
    removeItem(key) {
      delete store[key];
    },
  }))();

  Object.defineProperty(window, "localStorage", { value: localStorageMock });

  test("login", async () => {
    let testUser = null;
    function TestComponent({ children }) {
      const { user } = useAuthContext();
      useEffect(() => {
        if (user) {
          testUser = user;
        }
      }, [user]);
      return <div>{children}</div>;
    }
    TestComponent.propTypes = {
      children: PropTypes.node.isRequired,
    };
    render(
      <BrowserRouter>
        <AuthProvider>
          <TestComponent>
            <App />
          </TestComponent>
        </AuthProvider>
      </BrowserRouter>
    );

    const fakeUser = {
      user: {
        username: "somebody",
        email: "somebody@email.com",
        profileImage: "someImage",
      },
      token: "sometoken",
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(fakeUser),
      })
    );

    const loginButton = screen.getByText("Login");
    expect(loginButton).toBeInTheDocument();
    fireEvent.click(loginButton);
    expect(screen.queryByTestId("login-username")).toBeInTheDocument();
    expect(screen.queryByTestId("login-password")).toBeInTheDocument();
    const submitButton = screen.getByTestId("login-submit");
    await act(() => fireEvent.click(submitButton));
    expect(testUser.username).toBe("somebody");
    expect(testUser.email).toBe("somebody@email.com");
    expect(testUser.profileImage).toBe("someImage");
    expect(testUser.token).toBe("sometoken");

    fetch.mockClear();
  });

  test("persistant login", () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    );
    // Temporary test
    expect(screen.queryByText("logged in as somebody")).toBeInTheDocument();
  });

  test("signup", async () => {
    store = {};
    let testUser = null;
    function TestComponent({ children }) {
      const { user } = useAuthContext();
      useEffect(() => {
        if (user) {
          testUser = user;
        }
      }, [user]);
      return <div>{children}</div>;
    }
    TestComponent.propTypes = {
      children: PropTypes.node.isRequired,
    };
    render(
      <BrowserRouter>
        <AuthProvider>
          <TestComponent>
            <App />
          </TestComponent>
        </AuthProvider>
      </BrowserRouter>
    );

    const fakeUser = {
      user: {
        username: "somebody",
        email: "somebody@email.com",
        profileImage: "someImage",
      },
      token: "sometoken",
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(fakeUser),
      })
    );

    const signupButton = screen.getByText("Sign Up");
    expect(signupButton).toBeInTheDocument();
    fireEvent.click(signupButton);
    expect(screen.queryByTestId("signup-username")).toBeInTheDocument();
    expect(screen.queryByTestId("signup-email")).toBeInTheDocument();
    expect(screen.queryByTestId("signup-password")).toBeInTheDocument();
    const submitButton = screen.getByTestId("signup-submit");
    await act(() => fireEvent.click(submitButton));
    expect(testUser.username).toBe("somebody");
    expect(testUser.email).toBe("somebody@email.com");
    expect(testUser.profileImage).toBe("someImage");
    expect(testUser.token).toBe("sometoken");

    fetch.mockClear();
  });
});
