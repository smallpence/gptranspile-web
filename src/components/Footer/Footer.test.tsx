import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Footer from "./Footer";

describe("<Footer />", () => {
  test("it should mount", () => {
    render(<Footer sessionState={{ state: "signedOut", signedIn: false }} />);

    const footer = screen.getByTestId("Footer");

    expect(footer).toBeInTheDocument();
  });
});
