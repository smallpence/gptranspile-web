import React from 'react';
import {AppShell, MantineProvider, Paper} from "@mantine/core";
import {hasSession} from "./Cookies";
import CodeEditor from "./components/CodeEditor/CodeEditor";
import './App.css'
import Header from './components/Header/Header';
import Footer from "./components/Footer/Footer";

function App() {
    return (
        <MantineProvider theme={{
            colors: {
                'brand': [
                    "#FEE6F3",
                    "#FDBADD",
                    "#FC8DC7",
                    "#FB60B1",
                    "#F9339B",
                    "#F80785",
                    "#C7056A",
                    "#950450",
                    "#630335",
                    "#32011B"
                ]

            },
            primaryColor: "brand",
            colorScheme: 'dark',
        }}
        >
            <AppShell padding={0}
                header={<Header/>}
            >
                <Paper className="background">
                    <CodeEditor signedIn={hasSession()}/>
                </Paper>
                <Footer/>
            </AppShell>
        </MantineProvider>
  );
}

export default App;
