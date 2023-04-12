/** @format */

import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import AutoComplete from "./AutoComplete";

describe("AutoComplete component", () => {
	const data = ["apple", "banana", "grape"];
	const filterData = jest.fn((data, value) =>
		data.filter((item) => item.toLowerCase().includes(value.toLowerCase()))
	);
	const loadData = jest.fn(() => Promise.resolve(data));

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("renders without errors", () => {
		const { getByPlaceholderText } = render(
			<AutoComplete data={data} filterData={filterData} loadData={loadData} />
		);
		const input = getByPlaceholderText("Type to search...");
		expect(input).toBeInTheDocument();
	});

	it("shows loading state when data is being loaded", async () => {
		const { getByText } = render(
			<AutoComplete
				data={data}
				filterData={filterData}
				loadData={() => Promise.resolve()}
			/>
		);

		expect(getByText("Loading...")).toBeInTheDocument();
	});

	it("shows error state when data loading fails", async () => {
		const error = "Error occurred";
		const { getByText } = render(
			<AutoComplete
				data={data}
				filterData={filterData}
				loadData={() => Promise.reject(error)}
			/>
		);

		expect(getByText(error)).toBeInTheDocument();
	});

	it("filters suggestions based on input value", async () => {
		const { getByPlaceholderText, findByText } = render(
			<AutoComplete data={data} filterData={filterData} loadData={loadData} />
		);

		const input = getByPlaceholderText("Type to search...");
		fireEvent.change(input, { target: { value: "a" } });

		const suggestion1 = await findByText("apple");
		expect(suggestion1).toBeInTheDocument();

		const suggestion2 = await findByText("banana");
		expect(suggestion2).toBeInTheDocument();

		const suggestion3 = await findByText("grape");
		expect(suggestion3).not.toBeInTheDocument();
	});

	it("selects suggestion with arrow keys", async () => {
		const { getByPlaceholderText, getByText } = render(
			<AutoComplete data={data} filterData={filterData} loadData={loadData} />
		);

		const input = getByPlaceholderText("Type to search...");
		fireEvent.change(input, { target: { value: "a" } });

		fireEvent.keyDown(input, { key: "ArrowDown" });
		expect(getByText("apple").parentNode).toHaveClass("selected");

		fireEvent.keyDown(input, { key: "ArrowDown" });
		expect(getByText("banana").parentNode).toHaveClass("selected");

		fireEvent.keyDown(input, { key: "ArrowDown" });
		expect(getByText("banana").parentNode).toHaveClass("selected");

		fireEvent.keyDown(input, { key: "ArrowUp" });
		expect(getByText("apple").parentNode).toHaveClass("selected");
	});

	it("selects suggestion with mouse click", async () => {
		const { getByPlaceholderText, getByText } = render(
			<AutoComplete data={data} filterData={filterData} loadData={loadData} />
		);

		const input = getByPlaceholderText("Type to search...");
		fireEvent.change(input, { target: { value: "a" } });

		const suggestion = getByText("apple");
		fireEvent.mouseEnter(suggestion);
		fireEvent.click(suggestion);

		expect(input).toHaveValue("apple");
	});

	it("closes suggestions list on escape key", async () => {
		const { getByRole, queryByRole } = render(
			<AutoComplete
				data={[]}
				loadData={mockLoadData}
				filterData={mockFilterData}
			/>
		);
		const input = getByRole("textbox");
		fireEvent.focus(input);

		await waitFor(() => expect(input).toHaveFocus());

		fireEvent.keyDown(input, { key: "Escape" });

		expect(queryByRole("list")).not.toBeInTheDocument();
	});
});
