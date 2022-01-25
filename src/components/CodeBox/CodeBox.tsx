import React, { FC } from 'react';
import styles from './CodeBox.module.css';
import {Box, Code} from "@mantine/core";

interface CodeBoxProps {
    code: string,
    isDesktop: boolean
}

const CodeBox: FC<CodeBoxProps> = (props) => (
    <div style={{position: "relative"}}>
        <Box className={styles.codebg} sx={(theme => ({backgroundColor: theme.colors.dark[4]}))}/>
        <Code block className={styles.code} sx={(_ => ({width: props.isDesktop ? "calc(50vw - 0.5rem)" : "100vw"}))}>{props.code}</Code>
        {props.children}
    </div>
);

export default CodeBox;
