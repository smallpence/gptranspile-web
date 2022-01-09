import React, {useState} from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CodeOutput from './CodeOutput';

describe('<CodeOutput />', () => {
  test('it should mount', () => {
    const [, setCodeView] = useState(false);
    const [, setGenView] = useState(false)

    render(<CodeOutput code={""} sessionState={{state: "signedOut", signedIn: false}} setCodeView={setCodeView} setGenView={setGenView}/>);
    
    const codeOutput = screen.getByTestId('CodeOutput');

    expect(codeOutput).toBeInTheDocument();
  });
});