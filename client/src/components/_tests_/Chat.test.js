/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-undef */
import React from "react";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Chat from "../MessageList/Chat";
import "@testing-library/jest-dom";

describe("Message List", () => {
  test("Renders message list", async () => {
    const user = {
      user: "me",
    };
    const data = [
      {
        conversationId: "convo",
        friendId: "123",
        profileImage: "photo.jpeg",
        text: "hello test",
        username: "somebody",
        time: "2022-10-18T05:14:24.077Z",
      },
    ];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(data),
      })
    );

    await act(() => {
      render(
        <BrowserRouter>
          <AuthContext.Provider value={{ user }}>
            <Chat />
          </AuthContext.Provider>
        </BrowserRouter>
      );
    });
    expect(screen.getByText("somebody")).toBeInTheDocument();
    expect(screen.getByText("hello test")).toBeInTheDocument();
  });

});
