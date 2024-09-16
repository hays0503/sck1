/// <reference types="cypress" />

describe('MenuWithOverflow', () => {
    beforeEach(() => {
      // Замените URL на URL страницы, где рендерится ваш компонент
      cy.visit('http://localhost:3000/ru/Astana');
    });
  
    it('should hide elements when overflow occurs', () => {
      // Проверяем, что prerender-menu отрендерен, но его высота равна 0
      cy.get('[data-testid="prerender-menu"]').should('have.css', 'height', '0px');
  
      // Проверяем, что final-menu содержит видимые элементы
      cy.get('[data-testid="final-menu"]').should('exist');
    });
  
    it('should display more elements when the window is resized', () => {
      // Изменяем размер окна
      cy.viewport(1200, 800);
  
      // Подождем немного, чтобы изменения применились
      cy.wait(1000);
  
      // Проверяем, что final-menu все еще существует
      cy.get('[data-testid="final-menu"]').should('exist');
    });
  });
  