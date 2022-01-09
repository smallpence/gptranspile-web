import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GithubSignin from './GithubSignin';

describe('<GithubSignin />', () => {
  test('it should mount', () => {
    render(<GithubSignin sessionState={{state: "signedOut", signedIn: false}} />);
    
    const githubSignin = screen.getByTestId('GithubSignin');

    expect(githubSignin).toBeInTheDocument();
  });
});