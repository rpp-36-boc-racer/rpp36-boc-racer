/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-undef */
import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Chat from "../Chat";
import "@testing-library/jest-dom";

describe("Friends list", () => {
  test("Renders friend list", async () => {
    const user = {
      username: "somebody",
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(user),
      })
    );

    render(
      <BrowserRouter>
        <AuthContext.Provider value={{ user }}>
          <Chat />
        </AuthContext.Provider>
      </BrowserRouter>
    );
    expect(screen.getByText("Message list of somebody")).toBeInTheDocument();
  });
});
