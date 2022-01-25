import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CodeBox from './CodeBox';

describe('<CodeBox />', () => {
  test('it should mount', () => {
    render(<CodeBox code={"hello world!"} isDesktop={true}/>);
    
    const codeBox = screen.getByTestId('CodeBox');

    expect(codeBox).toBeInTheDocument();
  });
});