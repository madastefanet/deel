/** @format */

import React from "react";
import { render } from "@testing-library/react";
import { HighlightedText } from "../HighlightedText";

describe("HighlightedText", () => {
	it("renders text with highlighted part", () => {
		const props = {
			text: "apple",
			highlight: "a",
		};

		const { container } = render(<HighlightedText {...props} />);

		expect(container).toHaveTextContent("apple");
		expect(container.querySelector("strong")).toHaveTextContent("a");
	});
});
