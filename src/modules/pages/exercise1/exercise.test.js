import React from "react";
import { render, screen } from "@testing-library/react";
import Exercise1 from "./Exercise1";

jest.mock("../../../utils/hooks/fetchApi", () => ({
    useFetchData: () => ({
        data: { min: 0, max: 100, value: 50 },
        loading: false,
        error: null,
    })
}));

describe("Exercise1", () => {
    test("renders a Range component with the correct props", () => {
        render(<Exercise1 />);
        const rangeElement = screen.getByTestId("slider");
        expect(rangeElement).toBeInTheDocument()
    });
});
