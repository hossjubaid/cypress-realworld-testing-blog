/// <reference types = 'cypress'/> 


describe('get api user tests', ()=> {

    it('get users test', () => {
    
        cy.request({
            method: 'GET',
            url: 'https://gorest.co.in/public-api/users',
            headers: {
                'authorization' : "Bearer SOME AUTHENTICATION TOKEN"
            }
        })

    }).then((res)=> {
        expect(res.status).to.eq(200);
        expect(res.header).to.eq('some string header');
        expect(red.body.meta.pagination.limit).to.eq(30);
    })


})