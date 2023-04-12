/** @format */

// hooks/__tests__/useKeyboard.test.ts
import { renderHook, act } from "@testing-library/react-hooks";
import { useKeyboard } from "../useKeyboard";

describe("useKeyboard", () => {
	it("should handle keyboard events and focus state", () => {
		const mockKeyDownHandler = jest.fn();
		const { result } = renderHook(() => useKeyboard(mockKeyDownHandler));

		act(() => {
			result.current.handleKeyDown({ key: "ArrowDown" } as React.KeyboardEvent);
		});

		expect(mockKeyDownHandler).toHaveBeenCalledWith({ key: "ArrowDown" });

		act(() => {
			result.current.handleFocus();
		});

		expect(result.current.focused).toBeTruthy();

		act(() => {
			result.current.handleBlur();
		});

		expect(result.current.focused).toBeFalsy();
	});
});
