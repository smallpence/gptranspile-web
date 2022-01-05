import React from 'react';
import {AppShell, Header, Title, Container} from "@mantine/core";
import GithubSignin from "./components/GithubSignin/GithubSignin";
import {hasSession} from "./Cookies";
import CodeEditor from "./components/CodeEditor/CodeEditor";


function App() {
    return (
          <AppShell
              header={<Header height={60} padding = "xs"><Title>GPTranspile</Title><GithubSignin signedIn={hasSession()}/></Header>}
          >
              <Container size="md">
                  <CodeEditor signedIn={hasSession()}/>
              </Container>
      </AppShell>
  );
}

export default App;
