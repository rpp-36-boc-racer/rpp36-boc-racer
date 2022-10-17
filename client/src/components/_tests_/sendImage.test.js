/* eslint-disable no-undef */
import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../../contexts/AuthContext";
import SendImage from "../InstantMessaging/SendImage";

describe("upload image component", () => {
  window.URL.createObjectURL = jest.fn();
  window.URL.revokeObjectURL = jest.fn();

  let store = {
    user: JSON.stringify({
      user: {
        username: "somebody",
        email: "somebody@email.com",
        profileImage: null,
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
  const file = new File(["(⌐□_□)"], "somefile.png", { type: "image/png" });

  beforeEach(() => {
    const mockUseLocationValue = {
      pathname: "/send-image",
      state: {
        conversationId: "123",
      },
    };
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={[mockUseLocationValue]}>
          <SendImage />
        </MemoryRouter>
      </AuthProvider>
    );
  });

  afterEach(() => {
    window.URL.createObjectURL.mockReset();
    window.URL.revokeObjectURL.mockReset();
  });

  test("image preview", async () => {
    const inputEl = screen.getByTestId("select-img");

    await fireEvent.change(inputEl, { target: { files: [file] } });
    expect(screen.getByRole("img")).toBeInTheDocument();

    const removeButton = screen.getAllByRole("button")[0];
    await fireEvent.click(removeButton);
    expect(screen.queryByRole("img")).toBe(null);
  });

  test("upload and send image", async () => {
    const inputEl = screen.getByTestId("select-img");
    await fireEvent.change(inputEl, { target: { files: [file] } });
    const sendButton = screen.getAllByRole("button")[1];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            username: "somebody",
            email: "somebody@email.com",
            profileImage: "someimage",
          }),
      })
    );

    await act(() => {
      fireEvent.click(sendButton);
    });
    expect(screen.queryByText("loading...")).toBe(null);
    expect(screen.queryByText("Error")).toBe(null);
  });
});
