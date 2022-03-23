import React from "react";
import styles from "./Header.module.css";
import { Header as MantineHeader } from "@mantine/core";
import logo from "../../resources/logolong.svg";

const Header = () => (
  <MantineHeader
    height={66}
    padding="xs"
    sx={(theme) => ({
      backgroundColor: theme.colors.brand[8],
    })}
  >
    <div className="headercontainer">
      <img src={logo} className="logo" alt="logo" />
    </div>
  </MantineHeader>
);

export default Header;
