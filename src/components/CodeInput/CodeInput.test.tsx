import React, {useState} from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CodeInput from './CodeInput';

describe('<CodeInput />', () => {
  test('it should mount', () => {
    const [code, setCode] = useState('')

    render(<CodeInput code={code} setCode={setCode}/>);
    
    const codeInput = screen.getByTestId('CodeInput');

    expect(codeInput).toBeInTheDocument();
  });
});