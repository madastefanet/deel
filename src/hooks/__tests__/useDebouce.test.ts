/** @format */

import { renderHook, act } from "@testing-library/react-hooks";
import { useDebounce } from "../useDebounce";

jest.useFakeTimers();

describe("useDebounce", () => {
	it("should return the debounced value after the specified delay", () => {
		let value = "hello";
		const delay = 1000;

		const { result, rerender } = renderHook(() => useDebounce(value, delay));

		expect(result.current).toEqual(value);

		value = "world";

		rerender();

		// Wait for the delay to pass
		act(() => {
			jest.advanceTimersByTime(delay);
		});

		expect(result.current).toEqual(value);
	});
});
