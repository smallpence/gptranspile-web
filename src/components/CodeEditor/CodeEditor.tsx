import React, { CSSProperties, useState } from "react";
import styles from "./CodeEditor.module.css";
import { Transition } from "@mantine/core";
import CodeInput from "../CodeInput/CodeInput";
import CodeOutput from "../CodeOutput/CodeOutput";
import { SessionState } from "../../Types";
import { useMediaQuery } from "@mantine/hooks";

function CodeEditor(props: { sessionState: SessionState }) {
  const [code, setCode] = useState('console.log("hello world!");');
  const [codeView, setCodeView] = useState(true);
  const [genView, setGenView] = useState(false);
  const [shapeVisisble, setShapeVisible] = useState<
    "input" | "transition" | "output"
  >("input");

  const isDesktop = useMediaQuery("(min-width: 1224px)");

  const codeInput = (style?: CSSProperties) => (
    <CodeInput
      code={code}
      setCode={setCode}
      sessionState={props.sessionState}
      setCodeView={setCodeView}
      setGenView={setGenView}
      style={style}
      isDesktop={isDesktop}
      hovered={shapeVisisble === "input"}
      onMouseEnter={() => {
        if (shapeVisisble === "output") setShapeVisible("transition");
      }}
      onAnimationFinish={() => setShapeVisible("output")}
    />
  );

  const codeOutput = (style?: CSSProperties) => (
    <CodeOutput
      code={code}
      sessionState={props.sessionState}
      setCodeView={setCodeView}
      setGenView={setGenView}
      style={style}
      isDesktop={isDesktop}
      hovered={shapeVisisble === "output"}
      onMouseEnter={() => {
        if (shapeVisisble === "input") setShapeVisible("transition");
      }}
      onAnimationFinish={() => setShapeVisible("input")}
    />
  );

  return isDesktop ? (
    <div style={{ height: "100%" }} className={styles.codeholder}>
      {codeInput()}
      {codeOutput()}
    </div>
  ) : (
    <div style={{ height: "100%" }}>
      <Transition mounted={codeView} transition="slide-right" duration={500}>
        {(style) => codeInput(style)}
      </Transition>
      <Transition mounted={genView} transition="slide-left" duration={500}>
        {(style) => codeOutput(style)}
      </Transition>
    </div>
  );
}

export default CodeEditor;
