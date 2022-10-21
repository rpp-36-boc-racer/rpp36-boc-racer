import React from 'react';
import ReactDOM from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import Conversations from '../MessageList/Conversations';
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
        "id": "0a01",
        "senderId": "001",
        "time": "1665725713",
        "text": "this is a sample message"
      },
      {
        "id": "0a02",
        "senderId": "002",
        "time": "1665722315",
        "text": "this is another sample message"
      },
      {
        "id": "0a03",
        "senderId": "003",
        "time": "1665725758",
        "text": "this is just another message"
      },
    ]
    it('should render the correct number of conversations', async () => {
      render(
        <BrowserRouter>
          <Conversations data={convos} />
        </BrowserRouter>
      );
      const renderedConvos = screen.getAllByTestId('convo');
      expect(renderedConvos.length).toEqual(convos.length);
    });

  });
});
