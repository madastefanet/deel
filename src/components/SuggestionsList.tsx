/** @format */

import React from "react";
import { HighlightedText } from "./HighlightedText";

interface SuggestionsListProps {
	suggestions: string[];
	inputValue: string;
	selectedIndex: number;
	onMouseEnter: (index: number) => void;
	onMouseLeave: () => void;
	onItemClick: (index: number) => void;
	customStyles?: React.CSSProperties;
}

export const SuggestionsList: React.FC<SuggestionsListProps> = ({
	suggestions,
	inputValue,
	selectedIndex,
	onMouseEnter,
	onMouseLeave,
	onItemClick,
	customStyles,
}) => {
	return (
		<ul className="suggestions" style={customStyles}>
			{suggestions.map((suggestion, index) => (
				<li
					key={suggestion}
					className={index === selectedIndex ? "selected" : ""}
					onMouseEnter={() => onMouseEnter(index)}
					onMouseLeave={onMouseLeave}
					onClick={() => onItemClick(index)}
				>
					<HighlightedText text={suggestion} highlight={inputValue} />
				</li>
			))}
		</ul>
	);
};
