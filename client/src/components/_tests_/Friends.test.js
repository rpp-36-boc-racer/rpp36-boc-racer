/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-undef */
import React, { useEffect } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import { AuthProvider } from "../../contexts/AuthContext";
import Friends from "../Friends";
import "@testing-library/jest-dom";
import useAuthContext from "../../hooks/useAuthContext";
import PropTypes from "prop-types";

const fakeUser = {
  user: {
    username: "nuotian1",
    email: "nn123@gmail.com",
    profileImage: "",
    friends: ["joe", "joesph"],
  },
};

const mockFetch = () =>
  jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(fakeUser),
    })
  );

// describe("Friends Page", () => {
//   test("Add friends functionality", async () => {
//     const user = {
//       username: "somebody",
//     };

//     render(
//       <BrowserRouter>
//         <AuthContext.Provider value={{ user }}>
//           <Friends />
//         </AuthContext.Provider>
//       </BrowserRouter>
//     );
//     expect(screen.getByText("Friend list of somebody")).toBeInTheDocument();
//   });
// });

describe("add friends functionality", () => {
  window.URL.createObjectURL = jest.fn();
  window.URL.revokeObjectURL = jest.fn();

  let store = {
    user: JSON.stringify({
      user: {
        username: "somebody",
        email: "somebody@email.com",
        profileImage: null,
        friends: ["joe", "joesph"],
      },
      token: "sometoken",
    }),
  };
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

  afterEach(() => {
    window.URL.createObjectURL.mockReset();
    window.URL.revokeObjectURL.mockReset();
  });

  test("search users functionality", async () => {
    const user = {
      username: "somebody",
    };
    render(
      <BrowserRouter>
        <AuthProvider value={{ user }}>
          <Friends />
        </AuthProvider>
      </BrowserRouter>
    );

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            username: "somebody",
            email: "somebody@email.com",
            profileImage: "someimage",
            users: [
              ["joe", null],
              ["joseph", null],
            ],
          }),
      })
    );
    const nameInput = screen.getByPlaceholderText("Search for new friends..");
    expect(nameInput).toBeInTheDocument();
    await act(() => fireEvent.change(nameInput, { target: { value: "joe" } }));
    const submitButton = screen.getByTestId("submit-search-btn");
    await act(() => fireEvent.click(submitButton));
    const userinlistButton = screen.getByTestId("userslist");
    expect(userinlistButton).toBeInTheDocument();

    fetch.mockClear();
  });
});
