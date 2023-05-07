import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Range from "./Range";

describe("Range", () => {
  test("renders without errors", () => {
    render(<Range min={0} max={10} mode="normal"/>);
    const rangeElement = screen.getByTestId("slider");
    expect(rangeElement).toBeInTheDocument();
  });

  test("displays the correct range values", () => {
    render(<Range min={0} max={10} mode="normal"/>);
    expect(screen.getByRole("spinbutton", { name: "input1" }).value).toBe("0");
    expect(screen.getByRole("spinbutton", { name: "input2" }).value).toBe("10");
  });

});
