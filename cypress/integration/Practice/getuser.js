/// <reference types = 'cypress'/> 


const { data } = require('cypress/types/jquery');
const dataJson = require('../../fixtures/example.json');

describe('get api user tests', ()=> {

    let accessToken = 'SOME AUTHENTICATION TOKEN';

    let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let randomText = '';
    let testEmail ='';


    it.only('get users test', () => {
    
        cy.request({
            method: 'GET',
            url: 'https://gorest.co.in/public-api/users',
            headers: {
                'authorization' : "Bearer " + accessToken
            }
        })

    }).then((res)=> {
        expect(res.status).to.eq(200);
        expect(res.header).to.eq('some string header');
        expect(red.body.meta.pagination.limit).to.eq(30);
    }),

    it('add new user test', () => {

        for(var i=0; i<10;i++) {
            randomText = letters.charAt(Math.floor(Math.random() * letters.length));
            testEmail = randomText + '@gmail.com';
        }
        // create user 
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public-api/users',
            headers: {
                'authorization' : "Bearer " + accessToken
            },
            body: {
                'name': dataJson.name,
                'gender': dataJson.gender,
                'email': testEmail,
                "status": dataJson.status
            }
        }).then((res)=> {
            cy.log(JSON.stringify(res));
            expect(res.status).to.eq(201);
            expect(res.body.data).has.property('email',testEmail);
            expect(res.body.data).has.property('name',dataJson.name);
            expect(res.body.data).has.property('gender',dataJson.gender);
            expect(res.body.data).has.property('status',dataJson.status);
        }).then((res) => {
            const userId = res.body.data.id
            cy.log("user id is " + userId)
            //2. get user : 
            cy.request({
                method: 'GET',
                url: 'https://gorest.co.in/public-api/users/' + userId,
                headers: {
                    'authorization' : "Bearer " + accessToken
                }

            }).then((res)=> {
                expect(res.status.body).to.eq(200);
                expect(res.body.data).has.property('id', userId);
                expect(res.body.data).has.property('name', dataJson.name);
                expect(res.body.data).has.property('status', dataJson.status);
                expect(res.body.data).has.property('email',testEmail);
            })
        })
    
    })


})