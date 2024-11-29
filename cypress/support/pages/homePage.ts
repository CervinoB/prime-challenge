const home = {
  createAccountLink: 'a[href="/app/novaconta"]',
  loginLink: 'a[href="/app"]',

  visitHomePage() {
    cy.visit("/");
  },

  navigateToCreateAccount() {
    cy.get(home.createAccountLink).click();
  },

  navigateToLogin() {
    cy.get(home.loginLink).click();
  },
};

export default { ...home };
