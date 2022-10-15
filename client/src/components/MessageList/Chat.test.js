import React from 'react';
import ReactDOM from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import Chat from './Chat';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../contexts/AuthContext";

describe('Chat', () => {
  let temporarySandBox;
  beforeEach(() => {
    temporarySandBox = document.createElement('div');
    document.body.appendChild(temporarySandBox);
  });
  afterEach(() => {
    document.body.removeChild(temporarySandBox);
    temporarySandBox = null;
  });

  describe('Chat Component', ()=>{
    it('should render header "Chat"', async () => {
      render(
        <BrowserRouter>
          <AuthProvider>
            <Chat />
          </AuthProvider>
        </BrowserRouter>
      );
      expect(screen.getByText('Chat')).toBeInTheDocument();
    });
  });
});

