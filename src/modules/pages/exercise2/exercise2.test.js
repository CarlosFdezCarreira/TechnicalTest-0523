import React from "react";
import { render, screen } from "@testing-library/react";
import Exercise2 from "./Exercise2";

jest.mock("../../../utils/hooks/fetchApi", () => ({
    useFetchData: () => ({
        data: [1,2,3,4],
        loading: false,
        error: null,
    })
}));

describe("Exercise2", () => {
    test("renders a Range component with the correct props", () => {
        render(<Exercise2 />);
        const rangeElement = screen.getByTestId("slider");
        expect(rangeElement).toBeInTheDocument()
    });
});
