import React from 'react';
import ReactDOM from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import Conversation from './Conversation';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";

describe('Conversation', () => {
  let temporarySandBox;
  beforeEach(() => {
    temporarySandBox = document.createElement('div');
    document.body.appendChild(temporarySandBox);
  });
  afterEach(() => {
    document.body.removeChild(temporarySandBox);
    temporarySandBox = null;
  });

  describe('Conversation Component', ()=>{
    const convo = {
      "senderId": "001",
      "time": "1665725713",
      "text": "this is a sample message"
    }

    it('should render header "Chat"', async () => {
      render(
        <BrowserRouter>
          <Conversation convo={convo} />
        </BrowserRouter>
      );
      expect(screen.getByRole('delete')).toBeInTheDocument();
    });
  });
});

