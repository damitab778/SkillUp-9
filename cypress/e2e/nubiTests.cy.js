describe('Nubi test', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('.hero > .container > .title').should('be.visible').as('hompageHeader');
  });

  it('Check if the language is correct', () => {
    cy.get('div.list-item > button').as('languageBtn');
    cy.get('@hompageHeader').should('be.visible').and('have.css', 'font-family').should('match', /Rubik/);
    cy.url().should('eq', 'https://nubisoft.pl/');
    cy.fixture('data').then(data => {
      cy.get('@hompageHeader').contains(data.homePageHeaderPL);
      cy.get('@languageBtn').click();
      cy.get('.lang-selectors > :nth-child(2) > a').click();
      cy.get('@hompageHeader').contains(data.homePageHeaderENG);
      cy.url().should('eq', 'https://nubisoft.io/');
    });
  });

  it('Check responsiveness', () => {
    cy.viewport(1650, 937);
    cy.get('#hamburger').should('not.be.visible');
    cy.get('@hompageHeader')
      .and('have.css', 'font-size')
      .should('match', /48.*px/);
    cy.screenshot();
    cy.viewport(1280, 720);
    cy.get('#hamburger').should('be.visible');
    cy.get('@hompageHeader')
      .and('have.css', 'font-size')
      .should('match', /36.*px/);
    cy.screenshot();
    cy.viewport(960, 720);
    cy.get('@hompageHeader')
      .and('have.css', 'font-size')
      .should('match', /18.*px/);
    cy.get('.left-components > .scrollactive-nav ').should('not.be.visible');
    cy.screenshot();
  });

  it('Check contactForm', () => {
    cy.get('.contact-link > .contact-form-btn').as('formBtn');
    cy.get('.contact-form > button').as('submitBtn');
    cy.get('@formBtn').should('not.be.visible');
    cy.get('#hamburger').click();
    cy.get('@formBtn').should('be.visible');
    cy.get('@formBtn').click();
    cy.fixture('data').then(data => {
      cy.get('#name').should('not.have.css', 'border-bottom', '1px solid rgb(178, 34, 34)');
      cy.get('#email').should('not.have.css', 'border-bottom', '1px solid rgb(178, 34, 34)');
      cy.get('#message').should('not.have.css', 'border-bottom', '1px solid rgb(178, 34, 34)');
      cy.get('@submitBtn').click();
      cy.get('#name').should('have.css', 'border-bottom', '1px solid rgb(178, 34, 34)');
      cy.get('#email').should('have.css', 'border-bottom', '1px solid rgb(178, 34, 34)');
      cy.get('#message').should('have.css', 'border-bottom', '1px solid rgb(178, 34, 34)');
      ///////////////////
      cy.get('#name').type(data.formName);
      cy.get('#email').type(data.formEmail);
      cy.get('#message').type(data.formMessage);
      cy.intercept({
        method: 'POST',
        url: '/email',
      }).as('sendEmail');
      cy.get('@submitBtn').click();
      cy.wait('@sendEmail').then(interception => {
        expect(interception.response.statusCode).equal(201);
      });
    });
  });
  it('Check technology render', () => {
    cy.get('.left-components > .scrollactive-nav > [href="#technologies"] > button').as('navTechnologyBtn');
    cy.get('.arrows > :nth-child(2)').as('technologiesNextPageBtn');
    // cy.get('.agile__slide--current > .category > .category-items > div').as('technologyList');
    cy.get('.agile__slide--current > .category > h3').as('currentTechnology');
    cy.fixture('data').then(data => {
      cy.url().should('eq', data.plUrl);
      cy.get('@navTechnologyBtn').click();
      cy.url().should('eq', `${data.plUrl}#technologies`);
      cy.get('@currentTechnology').contains(data.ecosystems);
      cy.get('@technologiesNextPageBtn').click({ force: true });
      cy.get('@currentTechnology').contains(data.databases);
      cy.get('.agile__slide--current > .category > .category-items > div').eq(0).contains(data.docker);
    });
  });
  it('Check if gallery is open', () => {
    cy.get('.agile__slide--active > .tile > .img-wrapper > .zoom-icon > img').as('openGalleryBtn');
    cy.get('.main-content.desktop > .lightbox-content > .photo > img').should('not.exist');
    cy.get('@openGalleryBtn').click();
    cy.get('.main-content.desktop > .lightbox-content > .photo > img').should('be.visible');
    cy.get('.options-bar.desktop > .lightbox-footer > .actions-buttons-box > .fa-times > path').click();
    cy.get('.main-content.desktop > .lightbox-content > .photo > img').should('not.exist');
  });
});
