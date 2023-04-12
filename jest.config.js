/** @format */

module.exports = {
	preset: "ts-jest",
	testEnvironment: "jsdom",
	moduleNameMapper: {
		"\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
	},
	setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
};
