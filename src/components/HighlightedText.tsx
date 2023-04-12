/** @format */

import React from "react";

interface HighlightedTextProps {
	text: string;
	highlight: string;
}

export const HighlightedText: React.FC<HighlightedTextProps> = ({
	text,
	highlight,
}) => {
	const parts = text.split(new RegExp(`(${highlight})`, "gi"));
	return (
		<span>
			{parts.map((part, index) =>
				part.toLowerCase() === highlight.toLowerCase() ? (
					<strong key={index}>{part}</strong>
				) : (
					part
				)
			)}
		</span>
	);
};
