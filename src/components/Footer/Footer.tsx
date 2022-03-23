import React from "react";
import styles from "./Footer.module.css";
import { Header as MantineHeader } from "@mantine/core";
import GithubSignin from "../GithubSignin/GithubSignin";
import { SessionState } from "../../Types";

const Footer = (props: { sessionState: SessionState }) => {
  return (
    <MantineHeader
      height={66}
      padding="xs"
      sx={(theme) => ({
        backgroundColor: theme.colors.brand[8],
      })}
    >
      <div className="">
        <GithubSignin sessionState={props.sessionState} />
      </div>
    </MantineHeader>
  );
};

export default Footer;
