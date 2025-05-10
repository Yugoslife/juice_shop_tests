// cypress/e2e/login_and_catalog.cy.js

describe('Juice Shop: логин + каталог (overlay-free)', () => {
    const loginUrl = 'http://localhost:3001/#/login';
  
    it('Логин и проверка каталога', () => {
      // 1. Открываем логин
      cy.visit(loginUrl);
  
      // 2. Удаляем все <p> (cookie- & welcome-overlays)
      cy.document().then(doc =>
        doc.querySelectorAll('p').forEach(el => el.remove())
      );
  
      // 3. Ждём форму и вводим данные
      cy.get('#email',    { timeout: 10000 }).should('be.visible').type('admin@juice-sh.op', { force: true });
      cy.get('#password', { timeout: 10000 }).should('be.visible').type('admin123',       { force: true });
  
      // 4. Логинимся
      cy.get('#loginButton').click({ force: true });
  
      // 5. Ждём редирект на /#/search
      cy.location('hash', { timeout: 10000 }).should('contain', '/search');
  
      // 6. Ещё раз удаляем возможные <p> (на случай, если оверлей появится вновь)
      cy.document().then(doc =>
        doc.querySelectorAll('p').forEach(el => el.remove())
      );
  
      // 7. Проверяем, что карточки появились
      cy.get('mat-card', { timeout: 10000 }).should('have.length.greaterThan', 0);
      cy.get('mat-card h5').first().should('be.visible').and('not.be.empty');
    });
  });

  