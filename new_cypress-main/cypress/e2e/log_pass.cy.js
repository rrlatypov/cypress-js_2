describe('Проверка авторизации', function () {

    it('Верный пароль и верный логин', function () {
         cy.visit('https://login.qa.studio/'); // вход на сайт
         cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // проверка цвета кнопки Восстановить пароль

         cy.get('#mail').type('german@dolnikov.ru'); // ввод верного логина
         cy.get('#pass').type('iLoveqastudio1'); // ввод верного пароля
         cy.get('#loginButton').click(); // нажал Войти

         cy.get('#messageHeader').contains('Авторизация прошла успешно'); // проверка наличия текста после авторизации
         cy.get('#messageHeader').should('be.visible'); // видимость текста пользователю 
         cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // наличие и видимость для пользователя Крестика
      })

      it('Проверка восстановления пароля', function () {
        cy.visit('https://login.qa.studio/'); // вход на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // проверка цвета кнопки Восстановить пароль

        cy.get('#forgotEmailButton').click(); // нажал Восстановить пароль

        cy.get('#mailForgot').type('german@dolnikov.ru'); // ввод почты для восстановления
        cy.get('#restoreEmailButton').click(); // Нажатие отправки кода
 
        cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail'); // проверка наличия текста после авторизации
        cy.get('#messageHeader').should('be.visible'); // видимость текста пользователю 
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // наличие и видимость для пользователя Крестика
     })

      it('Верный пароль и НЕверный логин', function () {
        cy.visit('https://login.qa.studio/'); // вход на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // проверка цвета кнопки Восстановить пароль

        cy.get('#mail').type('german@dolnikov.ru'); // ввод верного логина
        cy.get('#pass').type('iLoveqastudio_0'); // ввод НЕверного пароля
        cy.get('#loginButton').click(); // нажал Войти

        cy.get('#messageHeader').contains('Такого логина или пароля нет'); // проверка наличия текста после авторизации
        cy.get('#messageHeader').should('be.visible'); // видимость текста пользователю 
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // наличие и видимость для пользователя Крестика
     })

     it('НЕверный пароль и верный логин', function () {
        cy.visit('https://login.qa.studio/'); // вход на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // проверка цвета кнопки Восстановить пароль

        cy.get('#mail').type('1_german@dolnikov.ru'); // ввод НЕверного логина
        cy.get('#pass').type('iLoveqastudio1'); // ввод верного пароля
        cy.get('#loginButton').click(); // нажал Войти

        cy.get('#messageHeader').contains('Такого логина или пароля нет'); // проверка наличия текста после авторизации
        cy.get('#messageHeader').should('be.visible'); // видимость текста пользователю 
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // наличие и видимость для пользователя Крестика
     })

     it('Пароль без @ и верный логин', function () {
        cy.visit('https://login.qa.studio/'); // вход на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // проверка цвета кнопки Восстановить пароль

        cy.get('#mail').type('germandolnikov.ru'); // ввод логина без @
        cy.get('#pass').type('iLoveqastudio1'); // ввод верного пароля
        cy.get('#loginButton').click(); // нажал Войти

        cy.get('#messageHeader').contains('Нужно исправить проблему валидации'); // проверка наличия текста после авторизации
        cy.get('#messageHeader').should('be.visible'); // видимость текста пользователю 
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // наличие и видимость для пользователя Крестика
     })

     it('Верный пароль с разным регистром и верный логин', function () {
        cy.visit('https://login.qa.studio/'); // вход на сайт
        cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)'); // проверка цвета кнопки Восстановить пароль

        cy.get('#mail').type('GerMan@dolnikov.ru'); // ввод верного логина с разным регистром
        cy.get('#pass').type('iLoveqastudio1'); // ввод верного пароля
        cy.get('#loginButton').click(); // нажал Войти

        cy.get('#messageHeader').contains('Авторизация прошла успешно'); // проверка наличия текста после авторизации
        cy.get('#messageHeader').should('be.visible'); // видимость текста пользователю 
        cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // наличие и видимость для пользователя Крестика
     })
     it('e2e тест на покупку нового аватара для тренера', function () {   // название теста
      cy.visit('https://pokemonbattle.ru/');                          // переходим на сайт https://pokemonbattle.ru/
      cy.get('input[type="email"]').type('USER_LOGIN');                   // вводим логин
      cy.get('input[type="password"]').type('USER_PASSWORD');               // вводим пароль
      cy.get('button[type="submit"]').click();                        // нажимаем кнопку Подтвердить
      cy.wait(2000);
      cy.get('.header__container > .header__id').click({ force: true }); // Клик в шапке на аву тренера
      cy.get('[href="/shop"]').click();                               // нажимаем кнопку Магазин
      cy.get('.available > button').first().click({ force: true });   // кликаем Купить у первого доступного аватара
      cy.get('.credit').type('4620869113632996');                     // вводим номер карты
      cy.get('.k_input_ccv').type('125');                             // вводим CVV карты
      cy.get('.k_input_date').type('1225');                           // вводим срок действия карты
      cy.get('.k_input_name').type('NAME');                           // вводим имя владельца действия карты
      cy.get('.pay-btn').click();                                     // нажимаем кнопку Оплатить
      cy.get('#cardnumber').type('56456');                            // вводим код подтверждения СМС
      cy.get('.payment__submit-button').click();                      // нажимаем кнопку Отправить
      cy.contains('Покупка прошла успешно').should('be.visible');     // проверяем наличие и видимость сообщения о успешной покупке
  });

 })
 
 
 // запуск через теринал: npx cypress run --spec cypress/e2e/poke.cy.js --browser chrome
 