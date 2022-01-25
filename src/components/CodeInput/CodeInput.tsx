import React, {CSSProperties, useState} from 'react';
import styles from './CodeInput.module.css';
import {Textarea, Modal, Button, Text, Select, Box} from "@mantine/core";
import {SessionState, SetState} from "../../Types";
import CodeBox from "../CodeBox/CodeBox";


function CodeInput(props: {
    code: string,
    setCode: SetState<string>,
    sessionState: SessionState,
    setCodeView: SetState<boolean>,
    setGenView: SetState<boolean>,
    style?: CSSProperties,
    isDesktop: boolean
}) {
    const [opened, setOpened] = useState(false);
    const [buffer, setBuffer] = useState("")

    return <div className={styles.CodeInput} style={props.style}>
        <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            title={"Code"}
            size={"xl"}
        >
            <Textarea
                minRows={2}
                maxRows={20}
                autosize
                onChange={(event) => setBuffer(event.currentTarget.value)}
                defaultValue={props.code}
            />
            <Button onClick={() => {
                setOpened(false);
                props.setCode(buffer);
            }}>Close</Button>
        </Modal>
        <div className={styles.header}>
            <Text size="xl" className={styles.title}>Your Code</Text>
            <Select className={styles.inputlang} data={[{value: 'javascript', label: "JavaScript"}]} defaultValue="javascript"/>
        </div>
        {/*<div style={{position: "relative"}}>*/}
        {/*    <Box className={styles.codebg} sx={(theme => ({backgroundColor: theme.colors.dark[4]}))}/>*/}
        {/*    <Code block className={styles.code} sx={(_ => ({width: props.isDesktop ? "calc(50vw - 0.5rem)" : "100vw"}))}>{props.code}</Code>*/}
        {/*    <Button className={styles.edit} onClick={() => setOpened(true)}>Edit...</Button>*/}
        {/*    {props.isDesktop && <Box className={styles.arrowtail} sx={(theme => ({*/}
        {/*        backgroundColor: theme.colors.dark[5]*/}
        {/*    }))}/>}*/}
        {/*</div>*/}
        <CodeBox code={props.code} isDesktop={props.isDesktop}>
            <Button className={styles.edit} onClick={() => setOpened(true)}>Edit...</Button>
            {props.isDesktop && <Box className={styles.arrowtail} sx={(theme => ({
                backgroundColor: theme.colors.dark[5]
            }))}/>}
        </CodeBox>
        <div className={styles.footer}>
            <Text size="xl">Convert to...</Text>
            <Select data={[{value: 'python', label: "Python"}]} defaultValue="python"/>
            {!props.isDesktop &&
                <Button className={styles.convert} size="xl" onClick={() => {
                    props.setCodeView(false);
                    setTimeout(() => props.setGenView(true), 350);
                }}>Convert</Button>
            }
        </div>
    </div>
}


export default CodeInput;
