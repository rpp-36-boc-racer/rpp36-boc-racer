/* eslint-disable no-undef */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
// eslint-disable-next-line import/no-unresolved
import ChatsHistory from "../InstantMessaging/ChatsHistory.jsx";
import FriendMessage from "../InstantMessaging/FriendMessage.jsx";
import OwnerMessage from "../InstantMessaging/OwnerMessage.jsx";
import "@testing-library/jest-dom";

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
  test("Renders the chat history page", async () => {
    const scrollRef = { current: { scrollIntoView: () => {} } };
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
    const curConversation = {
      _id: "convo1",
      members: ["member1", "member2"],
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
    ];

    render(
      <BrowserRouter>
        <AuthContext.Provider value={{ user }}>
          <ChatsHistory
            user={user}
            friend={friend}
            curConversation={curConversation}
            messages={messages}
            scrollRef={scrollRef}
          />
        </AuthContext.Provider>
      </BrowserRouter>
    );
    expect(screen.getByText("DM with member2 as member1")).toBeInTheDocument();
    expect(screen.getByText("hello from member1")).toBeInTheDocument();
    expect(screen.getByText("hello from member2")).toBeInTheDocument();
  });
  test("Renders test and photo messages sent by user", async () => {
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
    const curConversation = {
      _id: "convo1",
      members: ["member1", "member2"],
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

    const { getByAltText } = await render(
      <BrowserRouter>
        <AuthContext.Provider value={{ user }}>
          <OwnerMessage
            ownername={user.username}
            avatar={user.profileImage}
            message={messages[0].text}
            photo={null}
          />
          <OwnerMessage
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
    const curConversation = {
      _id: "convo1",
      members: ["member1", "member2"],
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
    ];

    const { getByAltText } = await render(
      <BrowserRouter>
        <AuthContext.Provider value={{ user }}>
          <FriendMessage
            friendname={friend.username}
            avatar={friend.profileImage}
            message={messages[1].text}
            photo={null}
          />
          <FriendMessage
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
});
