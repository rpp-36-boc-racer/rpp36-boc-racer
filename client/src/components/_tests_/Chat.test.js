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
  test('Renders chat panel as Message List', async () => {
    const user = {
      email: "ai@gg.com",
      profileImage: "https://boc-bucket-racer.s3.amazonaws.com/1666044271650.webp",
      token: "blahblah",
      username: "ai",
      _id: "634dd1677bb4595d80403e08",
    };
    const data = [
      {
        conversationId: "6351c9d4da21b68f3f06a438",
        epochTime: 1666304475000,
        friendId: "123",
        hasBeenRead: false,
        lastMessageId: "6351c9dbda21b68f3f06a476",
        profileImage: "https://boc-bucket-racer.s3.amazonaws.com/1666044290259.jpeg",
        senderId: "634dd1677bb4595d80403e08",
        text: "hello test",
        userID: "634dd1677bb4595d80403e08",
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
    expect(screen.getByTestId("chatPanel")).toBeInTheDocument();
  });
});
