import React from 'react';
import ReactDOM from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import Conversations from './Conversations';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";

describe('Conversations', () => {
  let temporarySandBox;
  beforeEach(() => {
    temporarySandBox = document.createElement('div');
    document.body.appendChild(temporarySandBox);
  });
  afterEach(() => {
    document.body.removeChild(temporarySandBox);
    temporarySandBox = null;
  });

  describe('Conversations Component', ()=>{
    const convos = [
      {
        "senderId": "001",
        "time": "1665725713",
        "text": "this is a sample message"
      },
      {
        "senderId": "002",
        "time": "1665722315",
        "text": "this is another sample message"
      },
      {
        "senderId": "003",
        "time": "1665725758",
        "text": "this is just another message"
      },
    ]
    it('should render header "Chat"', async () => {
      render(
        <BrowserRouter>
          <Conversations data={convos} />
        </BrowserRouter>
      );
      const renderedConvos = screen.queryByTestId('convo');
      expect(renderedConvos.length).toEqual(convos.length);
    });
  });
});

