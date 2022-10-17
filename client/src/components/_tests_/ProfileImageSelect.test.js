/* eslint-disable no-undef */
import React, { useEffect } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import PropTypes from "prop-types";
import { AuthProvider } from "../../contexts/AuthContext";
// import App from "../App";
import TestApp from "./TestApp";
import ProfileImageSelect from "../ProfileImageSelect";
import "@testing-library/jest-dom";
import useAuthContext from "../../hooks/useAuthContext";

describe("Profile image select page", () => {
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
  test("Renders profile pic page", () => {
    render(
      <AuthProvider>
        <ProfileImageSelect />
      </AuthProvider>
    );
    expect(screen.getByText("Select a profile image")).toBeInTheDocument();
    expect(screen.getByText("Upload")).toBeInTheDocument();
  });
  let profileImage = null;

  test("Allows file select", async () => {
    // const data = [
    //   {
    //     conversationId: '634b0e57bc98b1af5386701b',
    //     friendId: '6348e1502fb8aecbc5ebc30f',
    //     username: 'ai',
    //     profileImage: 'https://boc-racer-images.s3.amazonaws.com/1665720671365.jpeg',
    //     text: 'image',
    //     time: "2022-10-17T18:10:50.563Z",
    //     epochTime: 1666030250000,
    //   },
    // ];
    function TestComponent({ children }) {
      const { user } = useAuthContext();
      useEffect(() => {
        if (user) {
          profileImage = user.profileImage;
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
            <TestApp />
          </TestComponent>
        </AuthProvider>
      </BrowserRouter>
    );

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ url: "someurl" }),
      })
    );
    const file = new File(["(⌐□_□)"], "somefile.png", { type: "image/png" });
    const inputEl = screen.getByTestId("profile-pic-select");
    Object.defineProperty(inputEl, "files", {
      value: [file],
    });
    await act(() => fireEvent.change(inputEl));
    const useImageBtn = screen.getByText("Use Image");
    expect(useImageBtn).toBeInTheDocument();
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
    await act(() => fireEvent.click(useImageBtn));
    expect(JSON.parse(localStorageMock.getItem("user")).user.profileImage).toBe(
      "someimage"
    );
    expect(profileImage).toBe("someimage");
  });
});
