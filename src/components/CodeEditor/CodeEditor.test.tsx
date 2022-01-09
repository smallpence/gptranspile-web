import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CodeEditor from './CodeEditor';

describe('<CodeEditor />', () => {
  test('it should mount', () => {
    render(<CodeEditor sessionState={{state: "signedOut", signedIn: false}} />);
    
    const codeEditor = screen.getByTestId('CodeEditor');

    expect(codeEditor).toBeInTheDocument();
  });
});