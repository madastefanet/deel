/** @format */

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { SuggestionsList } from "../SuggestionsList";

const mockProps = {
	suggestions: ["apple", "apples", "applessness"],
	inputValue: "ban",
	selectedIndex: 1,
	onMouseEnter: jest.fn(),
	onMouseLeave: jest.fn(),
	onItemClick: jest.fn(),
	customStyles: { color: "red" },
};

describe("SuggestionsList", () => {
	//investigate how you could concatene the string representation
	test("renders suggestions", () => {
		const { getByText } = render(<SuggestionsList {...mockProps} />);
		expect(getByText("apple")).toBeInTheDocument();
		expect(getByText("banana")).toBeInTheDocument();
		expect(getByText("grape")).toBeInTheDocument();
	});

	test("handles mouse events and item click", () => {
		const { getByRole } = render(<SuggestionsList {...mockProps} />);
		const bananaItem = getByRole("listitem", { name: /banana/i });

		fireEvent.mouseEnter(bananaItem);
		expect(mockProps.onMouseEnter).toHaveBeenCalledWith(1);

		fireEvent.mouseLeave(bananaItem);
		expect(mockProps.onMouseLeave).toHaveBeenCalled();

		fireEvent.click(bananaItem);
		expect(mockProps.onItemClick).toHaveBeenCalledWith(1);
	});

	test("applies custom styles", () => {
		const { container } = render(<SuggestionsList {...mockProps} />);
		expect(container.firstChild).toHaveStyle("color: red");
	});
});
