import React from 'react';
import ReactDOM from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import Chat from './Chat';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

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
      render(<Chat />);
      expect(screen.getByText('Chat')).toBeInTheDocument();
    });
  });
});

