import React, {useState} from 'react';
import {AppShell, Header, Title, Text, Container} from "@mantine/core";
import CodeInput from "./components/CodeInput/CodeInput";
import CodeOutput from "./components/CodeOutput/CodeOutput";


function App() {
    const [code, setCode] = useState("");
    return (
          <AppShell
              header={<Header height={60} padding = "xs"><Title>GPTranspile</Title></Header>}
          >
              <Container size="md">
                  <Title>Input your code</Title>
                  <CodeInput code={code} setCode={setCode}/>
                  <Title>Attempt to translate</Title>
                  <CodeOutput code={code}/>
              </Container>
      </AppShell>
  );
}

export default App;
