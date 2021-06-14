/* 
можно обращяться к беку

cy.intercept()
например присоздании сообщения на странице у нас в апи есть тело созданного сообзения и с помощью cy.intercept()
можно верефицировать правильно ли создается ответ и запрос в апи

1. сначала автоматизируем визуальную часть, для того что бы получить нужный отчет от бека

2. сначала создаем сервер
cy.server()
cy.route('POST', '**articles(это адресс здесь есть слеши)').as('postarticles') нужно при вызове добавлять собаку
cy.wait('@postarticles')
cy.get('@postarticles').then(xhr =>{
    consile.log(xhr)
    expect(xhr.status).to.equal(200)
    expect(xhr.request.body.article.body).to.equal("this text")
    expect(xhr.resposn.body.article.description).to.equal("this text")
})



cy.intercept()



*/
