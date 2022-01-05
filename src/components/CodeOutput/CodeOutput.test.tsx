import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CodeOutput from './CodeOutput';

describe('<CodeOutput />', () => {
  test('it should mount', () => {
    render(<CodeOutput code={""} signedIn={true}/>);
    
    const codeOutput = screen.getByTestId('CodeOutput');

    expect(codeOutput).toBeInTheDocument();
  });
});