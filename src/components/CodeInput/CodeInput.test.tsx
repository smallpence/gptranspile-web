import React, {useState} from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CodeInput from './CodeInput';

describe('<CodeInput />', () => {
  test('it should mount', () => {
    const [code, setCode] = useState('')
    const [,setCodeView] = useState(false)
    const [,setGenView] = useState(false)

    render(<CodeInput code={code} setCode={setCode} sessionState={{state: "signedOut", signedIn: false}} setCodeView={setCodeView} setGenView={setGenView} isDesktop={true}/>);
    
    const codeInput = screen.getByTestId('CodeInput');

    expect(codeInput).toBeInTheDocument();
  });
});