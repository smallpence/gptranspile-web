import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CodeInput from './CodeInput';

describe('<CodeInput />', () => {
  test('it should mount', () => {
    render(<CodeInput />);
    
    const codeInput = screen.getByTestId('CodeInput');

    expect(codeInput).toBeInTheDocument();
  });
});