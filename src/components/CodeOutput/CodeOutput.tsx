import React, { CSSProperties, useCallback, useEffect, useState } from "react";
import styles from "./CodeOutput.module.css";
import {
  Box,
  Button,
  createStyles,
  LoadingOverlay,
  Text,
  Transition,
} from "@mantine/core";
import { SessionState, SetState } from "../../Types";
import { GITHUB_URL } from "../../Session";
import CodeBox from "../CodeBox/CodeBox";
import Spinny from "../Spinny/Spinny";

function CodeOutput(props: {
  code: string;
  sessionState: SessionState;
  setCodeView: SetState<boolean>;
  setGenView: SetState<boolean>;
  style?: CSSProperties;
  hovered: boolean;
  isDesktop: boolean;
  onMouseEnter: () => void;
  onAnimationFinish: () => void;
}) {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const url = process.env["REACT_APP_URL"];

  const queryGPT = useCallback(async () => {
    if (!props.sessionState.signedIn) return "not signed in";

    const res = await fetch(`${url}/backend/gpt3`, {
      method: "GET",
      credentials: "include",
      headers: {
        code: JSON.stringify(props.code),
        language: "java",
      },
    });
    if (!res.ok) return "error";
    return await res.text();
  }, [props.code, props.sessionState, url]);

  const displayGPT = useCallback(async () => {
    setLoading(true);
    const data = await queryGPT();
    setLoading(false);
    setOutput(data);
  }, [queryGPT]);

  useEffect(() => {
    displayGPT();
  }, [props.code, props.sessionState.signedIn, displayGPT]);

  const globalStyles = createStyles((_) => ({}))();

  return (
    <div
      className={styles.CodeOutput}
      data-testid="CodeOutput"
      style={props.style}
    >
      <div className={styles.header}>
        <Text size="xl">GPT3's Response</Text>
      </div>
      <CodeBox
        code={output}
        isDesktop={props.isDesktop}
        onMouseEnter={props.onMouseEnter}
      >
        <LoadingOverlay visible={loading} />
        {props.isDesktop && (
          <div>
            <Box
              className={styles.arrowtail}
              sx={(theme) => ({ backgroundColor: theme.colors.dark[5] })}
            />
            <Box className={styles.arrowhead}>
              <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                <polygon
                  points="0, 0, 100, 50, 0, 100"
                  fill={globalStyles.theme.colors.dark[5]}
                />
              </svg>
            </Box>
          </div>
        )}
        <Transition
          transition={"slide-right"}
          mounted={!props.isDesktop || props.hovered}
          onExited={props.onAnimationFinish}
        >
          {(transition) => (
            <div className={styles.spinner} style={transition}>
              <Spinny shape={"triangle"} />
            </div>
          )}
        </Transition>
      </CodeBox>
      <div className={styles.footer}>
        {props.sessionState.signedIn ? (
          <Button
            size="xl"
            onClick={() => {
              displayGPT();
            }}
          >
            Retry
          </Button>
        ) : (
          <Button size="xl" component="a" href={GITHUB_URL}>
            Sign in
          </Button>
        )}
        {!props.isDesktop && (
          <div style={{ display: "grid" }}>
            <Button
              className={styles.retry}
              size="lg"
              onClick={() => {
                props.setGenView(false);
                setTimeout(() => props.setCodeView(true), 150);
              }}
            >
              Exit
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CodeOutput;
