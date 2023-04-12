/** @format */

import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AutoComplete from "./AutoComplete";

const mockData = [
	"Apple",
	"Banana",
	"Blueberry",
	"Cherry",
	"Grape",
	"Lemon",
	"Mango",
	"Orange",
	"Peach",
	"Plum",
	"Raspberry",
	"Strawberry",
];

async function loadData() {
	// Simulate an API call
	await new Promise((resolve) => setTimeout(resolve, 500));
	return mockData;
}

function App() {
	const filterData = (data: string[], filterValue: string): string[] => {
		return data.filter((item) =>
			item.toLowerCase().includes(filterValue.toLowerCase())
		);
	};

	return (
		<div className="App">
			<h1>AutoComplete Component</h1>
			<AutoComplete data={[]} loadData={loadData} filterData={filterData} />
		</div>
	);
}

export default App;
