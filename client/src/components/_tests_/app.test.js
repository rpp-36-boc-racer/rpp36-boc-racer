import React from 'react';
import App from '../App';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('App test', () => {
  it('Renders App', () => {
    render(<App />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  })
});