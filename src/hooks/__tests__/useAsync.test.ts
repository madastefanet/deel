/** @format */

import { renderHook } from "@testing-library/react-hooks";
import { useAsync } from "../useAsync";

const fetchData = async () => {
	return new Promise<number[]>((resolve) => {
		setTimeout(() => {
			resolve([1, 2, 3]);
		}, 100);
	});
};

const filterData = (data: number[], filterValue: string) => {
	return data.filter((item) => item.toString() === filterValue);
};

describe("useAsync", () => {
	it("should fetch and filter data", async () => {
		const { result, waitForNextUpdate } = renderHook(() =>
			useAsync(fetchData, filterData, "2", [])
		);

		expect(result.current[1]).toBeTruthy(); // Loading

		await waitForNextUpdate();

		expect(result.current[1]).toBeFalsy(); // Not loading
		expect(result.current[0]).toEqual([2]); // Filtered data
	});
});
