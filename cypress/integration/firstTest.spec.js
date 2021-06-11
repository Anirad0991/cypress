/// <reference types="cypress" /> 

const { table } = require("console")

// нужно для установки зависимостей с vs кодом для подсказок

describe('Our first suit', () => {

    it('first test', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // by tag name
        cy.get('input') // самый распространенный метод для получения со страницы данных

        // by id
        cy.get('#inputEmail')

        // by Class name
        cy.get('.input-full-width')

        // by attribute name
        cy.get('[placeholder]')

        // by attribute name and value
        cy.get('[placeholder="Email"]')

        // by class value -- здесь нужно значение всего класса ничего не удаляем
        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        // by tag name and attribute  with value
        cy.get('input[placeholder="Email"]')

        // by two different attributes сколько нужно столько атрибутов и добавляем
        cy.get('[placeholder="Email"][type="email"]')
    
        // by tag name, attribute with value, id and class name
        cy.get('input[placeholder="Email"]#inputEmail.input-full-width')
    
        // the most recommended way with cypress -- добавляем сами теги
        cy.get('[data-cy="imputEmail1"]')
    
    })

    it('second test', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.get('[data-cy="signInButton"]') // можно добавлять локаторы прямо в код страницы -- нужно проверить на реальном сайте !!!

        cy.contains('Sign in') // Только первый элемент на странице. Нужно в структре html обращать внимание на регистр наименования поля или кнопки иначе тест провалится

        cy.contains('[status="warning"]', 'Sign in') // указываем атрибутом на второй параметр и ищем в нужной области, удобно для одинаковых названий селекторов, или одинаковых текстов
    
        cy.get('#inputEmail3')
            .parents('form')
            .find('button') // только для нахождения внутри родителя
            .should('contain', 'Sign in') // путишествие по дочерним элементам что-бы найти нужный
            .parents('form')
            .find('nb-checkbox')
            .click()
    
        cy.contains('nb-card', 'Horizontal form')
            .find('[type="email"]')
            .type('dk@dabb.ru')
    })

    it('then and wrap methods', () => {

        // если нужно сохранить результат функции переходим в формат джиквери с помощью then что бы вернуться
        // к формату кипариса нужно использовать wrap

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        // cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
        // cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')

        // cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email address')
        // cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password')

        cy.contains('nb-card', 'Using the Grid').then(firstForm => {
            const emailLableFirst = firstForm.find('[for="inputEmail1"]').text()
            const passwordLableFirst = firstForm.find('[for="inputPassword2"]').text()

            expect(emailLableFirst).to.equal('Email')
            expect(passwordLableFirst).to.equal('Password')

                cy.contains('nb-card', 'Basic form').then(secondForm => {
                    const passwordLableSecond = secondForm.find('[for="exampleInputPassword1"]').text()
                    expect(passwordLableFirst).to.equal(passwordLableSecond)
                
                cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password')

            })
        })
    })

    it('invoke command', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //1
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

        //2
        cy.get('[for="exampleInputEmail1"]').then( lable => {
            expect(lable.text()).to.equal('Email address')
        })

        //3
        cy.get('[for="exampleInputEmail1"]').invoke('text').then( text =>{
            expect(text).to.equal('Email address') // удобнее чем в примере 2 не нужно вызывать доп метод текст
        })

        //4
        cy.contains('nb-card', 'Basic form')
            .find('nb-checkbox')
            .click()
            .find('.custom-checkbox')
            .invoke('attr', 'class')
            // .should('contain', 'checked')
            .then(classValue => {
                expect(classValue).to.contain('checked')
            })
    })

    it('assert property', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        cy.contains('nb-card', 'Common Datepicker').find('input').then( input =>{
            cy.wrap(input).click()
            cy.get('nb-calendar-day-picker').contains('17').click()
            cy.wrap(input).invoke('prop', 'value').should('contain', 'Jun 17, 2021')
        })

    })

    it('radio button', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then( radiobuttons => {
            cy.wrap(radiobuttons)
                .first()
                .check({force: true})
                .should('be.checked')
            
            cy.wrap(radiobuttons)
                .eq(1)
                .check({force: true})
            
            cy.wrap(radiobuttons)
                .first()
                .should('not.be.checked')

            cy.wrap(radiobuttons)
                .eq(2)
                .should('be.disabled')
            
        })


    })

    it('check boxes', () => {

        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()

        // cy.get('[type="checkbox"]').check({force: true})

        cy.get('[type="checkbox"]').eq(0).click({force: true}) // можно сделать активными и неактивным
        cy.get('[type="checkbox"]').eq(0).check({force: true}) // метод чек только отмечает боксы, что бы урать отметку нужно использовать метод клик
    
    })

    it('lists and dropdowna', () => {

        cy.visit('/')
        // 1
        // cy.get('nav nb-select').click()
        // cy.get('.options-list').contains('Dark').click()
        // cy.get('nav nb-select').should('contain', 'Dark')
        // cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')
    
        //2
        cy.get('nav nb-select').then( dropdown => {
            cy.wrap(dropdown).click()
            cy.get('.options-list nb-option').each( (listItem, index) => {
                const itemText = listItem.text().trim()

                const colors = {
                    "Light": "rgb(255, 255, 255)",
                    "Dark": "rgb(34, 43, 69)",
                    "Cosmic": "rgb(50, 50, 89)",
                    "Corporate": "rgb(255, 255, 255)",
                }

                cy.wrap(listItem).click()
                cy.wrap(dropdown).should('contain', itemText)
                cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText])
                if( index < 3 ){
                    cy.wrap(dropdown).click()
                }
                
                //select работает когда тег выбран
            })
        })

        

    })

    it('web tables', () => {

        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()
        
        //1
        cy.get('tbody').contains('tr', 'Larry').then( tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25')
            cy.wrap(tableRow).find('.nb-checkmark').click()
            cy.wrap(tableRow).find('td').eq('6').should('contain', '25')


        //2
        cy.get('thead').find('.nb-plus').click()
        cy.get('thead').find('tr').eq('2').then( tableRow => {
            cy.wrap(tableRow).find('[placeholder="First Name"]').type('Darina')
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Katyk')
            cy.wrap(tableRow).find('.nb-checkmark').click()
        })
        cy.get('tbody tr').first().find('td').then(tableColumns => {
            cy.wrap(tableColumns).eq('2').should('contain', 'Darina')
            cy.wrap(tableColumns).eq('3').should('contain', 'Katyk')
        })

        //3
        cy.get('thead [placeholder="Age"]').type('20')
        cy.wait(500)
        cy.get('tbody tr').each(tableRow => {
            cy.wrap(tableRow).find('td').eq(6).should('contain', 20)
        })

        //4
        const age = [20, 30, 40, 200]

        cy.wrap(age).each( age => {
            cy.get('thead [placeholder="Age"]').clear().type(age)
                cy.wait(500)
                cy.get('tbody tr').each(tableRow => {
                    if(age == 200){
                        cy.wrap(tableRow).should('contain', 'No data found')
                    }else{
                        cy.wrap(tableRow).find('td').eq(6).should('contain', age)
                    }
                    
                })
        })


        })       
    
    })

    it('datepickers Не работает, почитать ', () => {

        function selectDayFromCurrent(day){

            let date = new Date()
            date.setDate(date.getDate() + day)
            let futureDay = date.getDate()
            let futureMonth = date.toLocaleString('default', {month: 'short'})
            let dateAssert = futureMonth+' '+futureDay+', '+date.getFullYear()

            cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then( dateAttribute => {
                if(!dateAttribute.includes(futureMonth)){
                    cy.get('[data-name="chevron-right"]').click()
                    selectDayFromCurrent(day)
                }else {
                    cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
                }
            })
            return dateAssert
        }
        
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        cy.contains('nb-card', 'Common Datepicker').find('input').then( input => {
            cy.wrap(input).click()
            let dateAssert = selectDayFromCurrent(89)
            cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
        })
    })

    it('tooltip', () => {

        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Tooltip').click()
        
        cy.contains('nb-card', "Colored Tooltips")
            .contains('Default').click()
        cy.get('nb-tooltip').should('contain', 'This is a tooltip')
    
    })

    it('dilog box', () => {

        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        //1
        cy.get('tbody tr').first().find('.nb-trash').click()
        cy.on('window:confirm', (confirm) => {
            expect(confirm).to.equal('Are you sure you want to delete?')
        })

        //2
        const stub = cy.stub()
        cy.on('window:confirm', stub)
        cy.get('tbody tr').first().find('.nb-trash').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
        })

        // 3
        cy.get('tbody tr').first().find('.nb-trash').click()
        cy.on('window:confirm', () => false)
        
        // 4
        cy.get('tbody tr').first().find('.nb-trash').click()
        cy.on('window:confirm', () => true)
    })

    it('how to use .should', () => {

        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        //1
        cy.get('[for="exampleInputEmail1"]')
        .should('contain', 'Email address')
        .should('have.class', 'label')
        .and('have.text', 'Email address')

        //2
        cy.get('[for="exampleInputEmail1"]').then( lable => {
            expect(lable.text()).to.equal('Email address')
            expect(lable).to.have.class('label')
            expect(lable).to.have.text('Email address')
        })

    })

    // все описания assertions утверждений есть в документации кипариса https://docs.cypress.io/guides/references/assertions#Chai



})


