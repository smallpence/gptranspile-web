import React from 'react';
import {AppShell, Header, Title, Text, Container} from "@mantine/core";
import CodeInput from "./components/CodeInput/CodeInput";


function App() {
  return (
      <AppShell
          header={<Header height={60} padding = "xs"><Title>GPTranspile</Title></Header>}
      >
          <Container size="md">
              <CodeInput/>
          </Container>
      </AppShell>
  );
}

export default App;
