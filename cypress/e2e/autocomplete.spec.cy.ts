/** @format */

// cypress/integration/autocomplete.spec.ts
describe("Autocomplete", () => {
	beforeEach(() => {
		cy.visit("/");
	});

	it("searches for suggestions and selects one", () => {
		cy.get('input[type="text"]').type("test").wait(500); // Add this wait time to give the API some time to respond.

		cy.get("li").should("have.length.greaterThan", 0).first().click();

		cy.get('input[type="text"]').should("not.have.value", "test");
	});

	it("displays an error message when an error occurs", () => {
		cy.intercept("GET", "https://api.example.com/search*", {
			statusCode: 500,
			body: { message: "Internal server error" },
		}).as("searchError");

		cy.get('input[type="text"]').type("test").wait("@searchError");

		cy.get(".error")
			.should("be.visible")
			.and("contain", "Failed to fetch suggestions");
	});
});
