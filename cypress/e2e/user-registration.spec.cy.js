import {faker} from '@faker-js/faker';

describe('user_registration test', () => {

  
    const VALID_EMAIL = faker.internet.email();
    const NOT_VALID_EMAIL = 'test@test.com';
    const VALID_PASSWORD = 'Abc123'
    const NOT_VALID_PASSWORD = 'abc123'
    const VALID_PHONE = faker.phone.number('261# ## ## ##')


    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
      })
      beforeEach(() => {
        cy.visit('https://demo.casino/', {failOnStatusCode: false})
      cy.get('.mfp-close').click();
      cy.get('[data-test="nav-reg-head"]').click();
      cy.location("pathname").should("eq", "/user/registration")
      cy.get('.page__title').should("have.text","Sign up")
      })
    
    

    it("sign up with already used mail",()=>{
      cy.get('[data-test="input-email"]').type(NOT_VALID_EMAIL)
      cy.get('.input__wrapper > label').click()
      cy.get('[data-test="input-password"]').type(NOT_VALID_PASSWORD);
      cy.get('[data-test="input-password_confirmation"]').type(NOT_VALID_PASSWORD)
      cy.get(':nth-child(2) > .special-radio__label').click()
      cy.get('[data-test="control-submit"]').click()
      cy.get('[data-test="error-email"]').should('be.visible')      
      
    })

    it("sign up with invalid password",()=>{
      cy.get('[data-test="input-email"]').type(VALID_EMAIL)
      cy.get('.input__wrapper > label').click()
      cy.get('[data-test="input-password"]').type(NOT_VALID_PASSWORD);
      cy.get('[data-test="input-password_confirmation"]').type(NOT_VALID_PASSWORD)
      cy.get(':nth-child(2) > .special-radio__label').click()
      cy.get('[data-test="control-submit"]').click()
      cy.get('[data-test="error-password"]').should('be.visible')

      
      
    })

    it("sign up with not equals passwords",()=>{
      cy.get('[data-test="input-email"]').type(VALID_EMAIL)
      cy.get('.input__wrapper > label').click()
      cy.get('[data-test="input-password"]').type(VALID_PASSWORD);
      cy.get('[data-test="input-password_confirmation"]').type(NOT_VALID_PASSWORD)
      cy.get(':nth-child(2) > .special-radio__label').click()
      cy.get('[data-test="control-submit"]').click()
      cy.get('[data-test="error-password_confirmation"]').should('be.visible')

    })

    it("sign up with successfull",()=>{
      cy.get('[data-test="input-email"]').type(VALID_EMAIL)
      cy.get('.input__wrapper > label').click()
      cy.get('[data-test="input-password"]').type(VALID_PASSWORD);
      cy.get('[data-test="input-password_confirmation"]').type(VALID_PASSWORD)
      cy.get(':nth-child(2) > .special-radio__label').click()
      cy.get('[data-test="control-submit"]').click()
      cy.get('.notification__title').should('have.text', " Congratulations! ")
      cy.location("pathname").should("eq", "/registrationSuccess")
     

    })

    it.only("sign up using the form with phone",()=>{
      cy.get('.form__input > .selectric-wrapper > .selectric-items > .selectric-scroll > ul > .last').click()
      cy.get('[data-test="input-phone"]').type(VALID_PHONE)
      cy.get('.input__wrapper > label').click()
      cy.get('[data-test="input-password"]').type(VALID_PASSWORD);
      cy.get('[data-test="input-password_confirmation"]').type(VALID_PASSWORD)
      cy.get(':nth-child(2) > .special-radio__label').click()
      cy.get('[data-test="control-submit"]').click()
      cy.get('.notification__title').should('have.text', " Congratulations! ")
      cy.location("pathname").should("eq", "/registrationSuccess")

    })

    it("sign up with facebook",()=>{
      cy.get('.form__section--links > .socials > :nth-child(1) > .socials__link > .icon-facebook').click();

    })

    it("sign up with google",()=>{
        
    })

    it("sign up with telegram",()=>{
        
    })

    it("fields empty",()=>{
      cy.get('[data-test="control-submit"]').click()
      cy.get('[data-test="error-email"]').should('be.visible')
      cy.get('[data-test="error-terms_and_conditions"]').should('be.visible')
      cy.get('[data-test="error-password"]').should('be.visible')
      cy.get('[data-test="error-password_confirmation"]').should('be.visible')
      cy.get('.form__input > .form__notification').should('be.visible')

    })
  })