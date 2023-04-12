/** @format */

import React, { useState, useRef } from "react";
import "./AutoComplete.css";
import { useDebounce } from "./hooks/useDebounce";
import { useAsync } from "./hooks/useAsync";
import { useClickOutside } from "./hooks/useClickOutside";
import { SuggestionsList } from "./components/SuggestionsList";
import { useKeyboard } from "./hooks/useKeyboard";

interface AutoCompleteProps {
	data: string[];
	loadData: () => Promise<string[]>;
	filterData: (data: string[], filterValue: string) => string[];
	placeholder?: string;
	debounceDelay?: number;
	customStyles?: {
		input?: React.CSSProperties;
		suggestions?: React.CSSProperties;
	};
}

const AutoComplete: React.FC<AutoCompleteProps> = ({
	data,
	loadData,
	filterData,
	placeholder = "Type to search...",
	debounceDelay = 300,
	customStyles,
}) => {
	const [inputValue, setInputValue] = useState("");
	const [selectedIndex, setSelectedIndex] = useState(-1);

	const inputRef = useRef<HTMLInputElement>(null);
	const debouncedInputValue = useDebounce(inputValue, debounceDelay);
	const [suggestions, loading, error] = useAsync(
		loadData,
		filterData,
		debouncedInputValue,
		[debouncedInputValue]
	);

	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const onKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "ArrowDown") {
			e.preventDefault();
			setSelectedIndex((prevIndex) =>
				Math.min(prevIndex + 1, suggestions.length - 1)
			);
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, -1));
		} else if (e.key === "Enter") {
			if (selectedIndex > -1) {
				setInputValue(suggestions[selectedIndex]);
				setSelectedIndex(-1);
			}
		} else if (e.key === "Escape") {
			setSelectedIndex(-1);
			inputRef.current?.blur();
		}
	};

	const { focused, handleKeyDown, handleFocus, handleBlur } =
		useKeyboard(onKeyDown);

	const onMouseEnter = (index: number) => {
		setSelectedIndex(index);
	};

	const onMouseLeave = () => {
		setSelectedIndex(-1);
	};

	const onItemClick = (index: number) => {
		setInputValue(suggestions[index]);
		setSelectedIndex(-1);
	};

	useClickOutside(inputRef, () => {
		setSelectedIndex(-1);
	});

	return (
		<div className="auto-complete">
			<input
				ref={inputRef}
				type="text"
				value={inputValue}
				onChange={onInputChange}
				onKeyDown={handleKeyDown}
				onFocus={handleFocus}
				onBlur={handleBlur}
				placeholder={placeholder}
				style={customStyles?.input}
			/>
			{loading && <div className="loading">Loading...</div>}
			{error && <div className="error">{error}</div>}
			{debouncedInputValue && focused && (
				<SuggestionsList
					suggestions={suggestions}
					inputValue={debouncedInputValue}
					selectedIndex={selectedIndex}
					onMouseEnter={onMouseEnter}
					onMouseLeave={onMouseLeave}
					onItemClick={onItemClick}
					customStyles={customStyles?.suggestions}
				/>
			)}
		</div>
	);
};

export default AutoComplete;
