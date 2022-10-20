/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-undef */

import React, { useEffect } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import { AuthContext } from "../../contexts/AuthContext";
import Friends from "../Friends";
import "@testing-library/jest-dom";
import useAuthContext from "../../hooks/useAuthContext";
import PropTypes from "prop-types";

describe("add friends functionality", () => {
  let store = {
    user: JSON.stringify({
      user: {
        username: "somebody",
        email: "somebody@email.com",
        profileImage: "img1.jpg",
        friends: ["f1", "f2"],
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

  test("search users functionality", async () => {
    const user = {
      username: "somebody",
      token: "test",
    };

    const users = {
      users: [
        {
          username: "somebody1",
          profileImage:
            "https://boc-bucket-racer.s3.amazonaws.com/1666151123631.jpeg",
          friends: ["somebody2"],
        },
      ],
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(users),
      })
    );

    await act(() => {
      render(
        <BrowserRouter>
          <AuthProvider value={{ user }}>
            <Friends />
          </AuthProvider>
        </BrowserRouter>
      );
    });

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
