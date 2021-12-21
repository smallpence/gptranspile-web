import React from 'react';
import {AppShell, Header, Title, Text, Container} from "@mantine/core";


function App() {
  return (
      <AppShell
          header={<Header height={60} padding = "xs"><Title>GPTranspile</Title></Header>}
      >
          <Container size="md">
              <Text>This is the first display of GPTranspile!</Text>
              <Text>Not much going on so far...</Text>
          </Container>
      </AppShell>
  );
}

export default App;
