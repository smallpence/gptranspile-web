import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Spinny from "./Spinny";

describe("<Spinny />", () => {
  test("it should mount", () => {
    render(<Spinny shape={"square"} />);

    const spinny = screen.getByTestId("Spinny");

    expect(spinny).toBeInTheDocument();
  });
});
