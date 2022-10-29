/* eslint-disable no-undef */
/*
 * @jest-environment node
 */
import React from "react";
import axios from "axios";
import { render, screen, act, fireEvent } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
// eslint-disable-next-line import/no-unresolved
import ChatsHistory from "../InstantMessaging/ChatsHistory.jsx";
import FriendMessageBubble from "../InstantMessaging/FriendMessageBubble.jsx";
import OwnerMessageBubble from "../InstantMessaging/OwnerMessageBubble.jsx";
import MessageAlert from "../InstantMessaging/MessageAlert.jsx";
import "@testing-library/jest-dom";

// Note: In order to mock properly, Jest needs jest.mock('moduleName') to be in the same scope as the require/import statement.
jest.mock("axios");

describe("Instant message page", () => {
  let store = {
    user: JSON.stringify({
      user: {
        username: "somebody",
        email: "somebody@email.com",
        profileImage: "img1.jpg",
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

  // mock data
  const user = {
    _id: "member1",
    username: "somebody",
    profileImage: "img1.jpg",
  };
  const friend = {
    _id: "member2",
    username: "someFriend",
    profileImage: "img2.jpg",
  };

  const messages = [
    {
      _id: "msg1",
      conversationID: "convo1",
      text: "hello from member1",
      senderID: "member1",
    },
    {
      _id: "msg2",
      conversationID: "convo1",
      text: "hello from member2",
      senderID: "member2",
    },
    {
      _id: "msg3",
      conversationID: "convo1",
      photoUrl: "photoMessage1.jpg",
      senderID: "member2",
    },
    {
      _id: "msg4",
      conversationID: "convo1",
      photoUrl: "photoMessage2.jpg",
      senderID: "member1",
    },
  ];

  test("Renders the chat history page", async () => {
    // jest does not implement useRef by default. Needs to add scrollIntoView fn into the jest-dom window
    window.HTMLElement.prototype.scrollIntoView = () => {};

    const mockUseLocationValue = {
      pathname: "/messaging",
      state: {
        conversationId: "convo1",
        friendId: friend._id,
        profileImage: friend.profileImage,
        username: friend.username,
      },
    };

    const mockMessageData = [
      {
        text: "hello from member1",
        senderID: "member1",
      },
      {
        photoUrl: "photoMessage1.jpg",
        senderID: "member2",
      },
    ];

    axios.get.mockResolvedValue({ data: mockMessageData });
    axios.post.mockResolvedValue({
      data: {
        text: "test message",
        senderID: "member1",
      },
    });

    await act(() => {
      render(
        <AuthContext.Provider value={{ user }}>
          <MemoryRouter initialEntries={[mockUseLocationValue]}>
            <ChatsHistory />
          </MemoryRouter>
        </AuthContext.Provider>
      );
    });
    expect(screen.getByText("with someFriend as somebody")).toBeInTheDocument();
    expect(screen.getByText("hello from member1")).toBeInTheDocument();
    const image = screen.getByAltText("test-img");
    expect(image.src).toContain("photoMessage1.jpg");

    // test submit text
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test message" } });
    const submit = screen.getByLabelText("send message");
    await act(() => {
      fireEvent.click(submit);
    });
    expect(screen.getByText("test message")).toBeInTheDocument();
  });

  test("Renders test and photo messages sent by user", async () => {
    const { getByAltText } = await render(
      <BrowserRouter>
        <AuthContext.Provider value={{ user }}>
          <OwnerMessageBubble
            ownername={user.username}
            avatar={user.profileImage}
            message={messages[0].text}
            photo={null}
          />
          <OwnerMessageBubble
            ownername={user.username}
            avatar={user.profileImage}
            photo={messages[3].photoUrl}
          />
        </AuthContext.Provider>
      </BrowserRouter>
    );
    const image = getByAltText("test-img");
    expect(screen.getByText("hello from member1")).toBeInTheDocument();
    expect(image.src).toContain("photoMessage2.jpg");
  });

  test("Renders text and photo messages sent by friend", async () => {
    const { getByAltText } = await render(
      <BrowserRouter>
        <AuthContext.Provider value={{ user }}>
          <FriendMessageBubble
            friendname={friend.username}
            avatar={friend.profileImage}
            message={messages[1].text}
            photo={null}
          />
          <FriendMessageBubble
            friendname={friend.username}
            avatar={friend.profileImage}
            photo={messages[2].photoUrl}
          />
        </AuthContext.Provider>
      </BrowserRouter>
    );
    const image = getByAltText("test-img");
    expect(screen.getByText("hello from member2")).toBeInTheDocument();
    expect(image.src).toContain("photoMessage1.jpg");
  });

  test("click thumbnail of photo sent by user will pop zoomed view", async () => {
    const { getByTestId } = await render(
      <BrowserRouter>
        <AuthContext.Provider value={{ user }}>
          <OwnerMessageBubble
            ownername={user.username}
            avatar={user.profileImage}
            photo={messages[3].photoUrl}
          />
        </AuthContext.Provider>
      </BrowserRouter>
    );
    const imgThumbnail = getByTestId("test-thumbnail");
    fireEvent.click(imgThumbnail);
    expect(screen.getByTestId("test-zoom").src).toContain("photoMessage2.jpg");
  });

  test("click thumbnail of photo sent by friend will pop zoomed view and download button", async () => {
    const { getByTestId } = await render(
      <BrowserRouter>
        <AuthContext.Provider value={{ user }}>
          <FriendMessageBubble
            friendname={friend.username}
            avatar={friend.profileImage}
            photo={messages[2].photoUrl}
          />
        </AuthContext.Provider>
      </BrowserRouter>
    );
    const imgThumbnail = getByTestId("test-thumbnail");
    fireEvent.click(imgThumbnail);
    expect(screen.getByTestId("test-zoom").src).toContain("photoMessage1.jpg");
    expect(screen.getByTestId("test-download-btn")).toBeInTheDocument();
  });

  test("render message alert", async () => {
    const alertMsg = `⚠️SYSTEM MESSAGE⚠️: ${user.username} has saved your photo!!!`;
    const timeStamp = Date.now();

    await render(
      <BrowserRouter>
        <AuthContext.Provider value={{ user }}>
          <MessageAlert message={alertMsg} timeStamp={timeStamp} />
        </AuthContext.Provider>
      </BrowserRouter>
    );
    expect(
      screen.getByText("somebody has saved your photo!!!")
    ).toBeInTheDocument();
  });
});
