/** @format */

import { useCallback, useState } from "react";

export const useKeyboard = (
	onKeyDown: (event: React.KeyboardEvent) => void
) => {
	const [focused, setFocused] = useState(false);

	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent) => {
			onKeyDown(event);
		},
		[onKeyDown]
	);

	const handleFocus = useCallback(() => {
		setFocused(true);
	}, []);

	const handleBlur = useCallback(() => {
		setFocused(false);
	}, []);

	return { focused, handleKeyDown, handleFocus, handleBlur };
};
