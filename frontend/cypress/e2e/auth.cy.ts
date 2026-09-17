// Requires both the backend (http://localhost:8000) and frontend (http://localhost:5173)
// dev servers running. Run with: npm run cypress:run

describe("Auth flow", () => {
  const unique = Date.now();
  const user = {
    name: "Cypress Tester",
    email: `cypress.${unique}@example.com`,
    mobile: "9876543210",
    password: "StrongPass1!",
  };

  it("shows the home page with call-to-action links", () => {
    cy.visit("/");
    cy.contains("Secure by design").should("be.visible");
    cy.contains("a", "Create an account").should("have.attr", "href", "/register");
  });

  it("blocks dashboard access when logged out", () => {
    cy.visit("/dashboard");
    cy.url().should("include", "/login");
  });

  it("rejects registration with a weak password", () => {
    cy.visit("/register");
    cy.get('input[placeholder="Jane Doe"]').type(user.name);
    cy.get('input[placeholder="you@example.com"]').type(user.email);
    cy.get('input[placeholder="9876543210"]').type(user.mobile);
    cy.get('input[placeholder="••••••••"]').first().type("weak");
    cy.get('input[placeholder="••••••••"]').last().type("weak");
    cy.contains("button", "Register").click();
    cy.contains(/needs a|minimum 8/i).should("be.visible");
  });

  it("registers, logs in, and reaches the dashboard", () => {
    cy.visit("/register");
    cy.get('input[placeholder="Jane Doe"]').type(user.name);
    cy.get('input[placeholder="you@example.com"]').type(user.email);
    cy.get('input[placeholder="9876543210"]').type(user.mobile);
    cy.get('input[placeholder="••••••••"]').first().type(user.password);
    cy.get('input[placeholder="••••••••"]').last().type(user.password);
    cy.contains("button", "Register").click();

    cy.url().should("include", "/login");
    cy.get('input[placeholder="you@example.com"]').type(user.email);
    cy.get('input[placeholder="••••••••"]').type(user.password);
    cy.contains("button", "Login").click();

    cy.url().should("include", "/dashboard");
    cy.contains(`Welcome, ${user.name.split(" ")[0]}`).should("be.visible");
    cy.contains(user.email).should("be.visible");
  });

  it("logs out and is redirected away from the dashboard", () => {
    cy.visit("/login");
    cy.get('input[placeholder="you@example.com"]').type(user.email);
    cy.get('input[placeholder="••••••••"]').type(user.password);
    cy.contains("button", "Login").click();
    cy.url().should("include", "/dashboard");

    cy.contains("button", "Logout").click();
    cy.url().should("include", "/login");
    cy.visit("/dashboard");
    cy.url().should("include", "/login");
  });
});
