/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom';

describe('App test', () => {
  it('Renders App', () => {
    render(<App />);
    expect(
      screen.getAllByText('Hello Worlds')[0],
    ).toBeInTheDocument();
  });
});
