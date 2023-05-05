import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Range from "./Range";

describe("Range component", () => {
  it("updates selected range when dragging selector 1", () => {
    const { getByTestId } = render(<Range />);
    const selector1 = getByTestId("selector1");
    const selector2 = getByTestId("selector2");
    fireEvent.mouseDown(selector1);
    fireEvent.mouseMove(selector1, { clientX: 50 });
    fireEvent.mouseUp(selector1);
    expect(selector1.style.left).toBe("10%");
    expect(selector2.style.left).toBe("20%");
  });

  it("updates selected range when dragging selector 2", () => {
    const { getByTestId } = render(<Range />);
    const selector1 = getByTestId("selector1");
    const selector2 = getByTestId("selector2");
    fireEvent.mouseDown(selector2);
    fireEvent.mouseMove(selector2, { clientX: 50 });
    fireEvent.mouseUp(selector2);
    expect(selector1.style.left).toBe("0%");
    expect(selector2.style.left).toBe("10%");
  });

  it("updates selected range when input number is changed", () => {
    const { getByTestId } = render(<Range />);
    const inputNumber = getByTestId("inputNumber");
    fireEvent.change(inputNumber, { target: { value: 10 } });
    expect(inputNumber.value).toBe("10");
  });
});