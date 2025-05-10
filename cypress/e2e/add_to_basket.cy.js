// cypress/e2e/add_to_basket.cy.js

describe('Juice Shop: добавление товара в корзину', () => {
    const loginUrl = 'http://localhost:3001/#/login';
  
    beforeEach(() => {
      // 1. Логинимся
      cy.visit(loginUrl);
      // удаляем любые <p> оверлеи (cookie, welcome)
      cy.document().then(doc => doc.querySelectorAll('p').forEach(el => el.remove()));
  
      cy.get('#email',    { timeout: 10000 }).type('admin@juice-sh.op', { force: true });
      cy.get('#password', { timeout: 10000 }).type('admin123',       { force: true });
      cy.get('#loginButton').click({ force: true });
  
      // ждём редирект на каталог
      cy.location('hash', { timeout: 10000 }).should('contain', '/search');
  
      // снова чистим <p>, чтобы ничего не перекрывало
      cy.document().then(doc => doc.querySelectorAll('p').forEach(el => el.remove()));
    });
  
    it('Добавляет первый товар в корзину и проверяет содержимое', () => {
      // 2. Добавляем в корзину первый товар
      cy.get('mat-card button[aria-label="Add to Basket"]', { timeout: 10000 })
        .first()
        .click({ force: true });
  
      // 3. Открываем корзину
      cy.get('button[aria-label="Show the Shopping Cart"]', { timeout: 10000 })
        .click({ force: true });
  
      // 4. Проверяем, что ровно 1 строка (товар) в таблице корзины
      cy.get('mat-row', { timeout: 10000 }).should('have.length', 1);
  
      // 5. Проверяем, что у этого товара есть имя
      cy.get('mat-row mat-cell.mat-column-name')
        .first()
        .invoke('text')
        .should('not.be.empty');
    });
  });
  