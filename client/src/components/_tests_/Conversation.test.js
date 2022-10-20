/* eslint-disable no-undef */
import "@testing-library/jest-dom";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
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
    senderId: "001",
    time: "1665725713",
    text: "this is a sample message",
  };

  it("should have a delete button", async () => {
    render(
      <BrowserRouter>
        <Conversation convo={convo} />
      </BrowserRouter>
    );
    expect(screen.getByTestId("delete")).toBeInTheDocument();
  });




});
