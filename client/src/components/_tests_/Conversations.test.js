import React from 'react';
import ReactDOM from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import Conversations from '../MessageList/Conversations';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

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
    // it('should render the correct number of conversations', async () => {
    //   render(<Conversations data={convos} />);
    //   const renderedConvos = screen.getByTestId('convo');
    //   console.log('renderedconvos', renderedConvos)
    //   expect(renderedConvos.length).toEqual(convos.length);
    // });

    it.todo('this is a mock test');
  });
});

