import React, {useState} from 'react';
import {AppShell, Header, Title, Container} from "@mantine/core";
import CodeInput from "./components/CodeInput/CodeInput";
import CodeOutput from "./components/CodeOutput/CodeOutput";
import GithubSignin from "./components/GithubSignin/GithubSignin";
import Cookies from "universal-cookie";


function App() {
    const cookies = new Cookies();
    console.log(cookies.get('session'))

    const [code, setCode] = useState("");
    return (
          <AppShell
              header={<Header height={60} padding = "xs"><Title>GPTranspile</Title><GithubSignin/></Header>}
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
