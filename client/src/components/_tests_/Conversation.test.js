/* eslint-disable no-undef */
import "@testing-library/jest-dom";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Conversation from "../MessageList/Conversation";

describe("Conversation", () => {
  let temporarySandBox;
  beforeEach(() => {
    temporarySandBox = document.createElement("div");
    document.body.appendChild(temporarySandBox);
  });
  afterEach(() => {
    document.body.removeChild(temporarySandBox);
    temporarySandBox = null;
  });

  const convo = {
    conversationId: "6351c9d4da21b68f3f06a438",
    epochTime: 1666304475000,
    friendId: "123",
    hasBeenRead: false,
    lastMessageId: "6351c9dbda21b68f3f06a476",
    profileImage:
      "https://boc-bucket-racer.s3.amazonaws.com/1666044290259.jpeg",
    senderId: "634dd1677bb4595d80403e08",
    text: "hello test",
    userID: "634dd1677bb4595d80403e08",
    username: "somebody",
    time: "2022-10-18T05:14:24.077Z",
  };

  it("should have a delete button", async () => {
    render(
      <BrowserRouter>
        <Conversation convo={convo} />
      </BrowserRouter>
    );
    expect(screen.getByTestId("delete")).toBeInTheDocument();
  });

  it('should invoke "ConfirmDeleteFunc" when "Delete" button is clicked', async () => {
    const mockFunc = jest.fn();
    render(
      <BrowserRouter>
        <Conversation convo={convo} confirmDeleteFunc={mockFunc} />
      </BrowserRouter>
    );
    const deleteButton = screen.getByTestId("delete");
    await fireEvent.click(deleteButton);
    expect(mockFunc).toHaveBeenCalledTimes(1);
  });

  it('should invoke "hasBeenReadFunc" when a conversation is clicked', async () => {
    const mockFunc = jest.fn();
    render(
      <BrowserRouter>
        <Conversation convo={convo} hasBeenReadFunc={mockFunc} />
      </BrowserRouter>
    );
    const conversation = screen.getByTestId("innerConvo");
    await fireEvent.click(conversation);
    expect(mockFunc).toHaveBeenCalledTimes(1);
  });
});
