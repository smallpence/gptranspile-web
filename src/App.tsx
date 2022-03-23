import React, { useEffect, useState } from "react";
import {
  AppShell,
  LoadingOverlay,
  MantineProvider,
  Paper,
} from "@mantine/core";
import { getSessionStateSubject } from "./Session";
import CodeEditor from "./components/CodeEditor/CodeEditor";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { SessionState } from "./Types";

function App() {
  const [session, setSession] = useState<SessionState>({
    state: "signedOut",
    signedIn: false,
  });

  const subject = getSessionStateSubject();

  useEffect(() => {
    subject.subscribe(setSession);
  }, []);

  return (
    <MantineProvider
      theme={{
        colors: {
          brand: [
            "#FEE6F3",
            "#FDBADD",
            "#FC8DC7",
            "#FB60B1",
            "#F9339B",
            "#F80785",
            "#C7056A",
            "#950450",
            "#630335",
            "#32011B",
          ],
        },
        primaryColor: "brand",
        colorScheme: "dark",
      }}
    >
      <AppShell padding={0} header={<Header />}>
        <Paper className="background">
          <CodeEditor sessionState={session} />
          <LoadingOverlay visible={session.state === "signingIn"} />
        </Paper>
        <Footer sessionState={session} />
      </AppShell>
    </MantineProvider>
  );
}

export default App;
