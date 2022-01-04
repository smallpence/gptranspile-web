import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SessionInit from './SessionInit';

describe('<SessionInit />', () => {
  test('it should mount', () => {
    render(<SessionInit />);
    
    const sessionInit = screen.getByTestId('SessionInit');

    expect(sessionInit).toBeInTheDocument();
  });
});