import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";

describe("Home component", () => {
  test("renders the correct title", () => {
    render(<Home />, { wrapper: MemoryRouter });
    const titleElement = screen.getByText("TECHNICAL_TEST");
    expect(titleElement).toBeInTheDocument();
  });
});
