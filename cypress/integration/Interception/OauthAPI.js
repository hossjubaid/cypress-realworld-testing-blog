/// <reference types = "cypress" />


describe('first', () => { 
  const access_token = '';  
  
    before('generate token', ()=> {
        
        //send a request to the uri with the body info to get an access token response from the auth server
        cy.request({
            method: 'POST',
            url: 'http://coop.apps.symfonycasts.com/token',
            form: true,
            body: {
                "client_id" : "CyPressApp",
                "client_secret" : "",
                "grant_type" : "client_credentials"
            }
            // get the token response
        }).then(response => {
            cy.log(JSON.stringify(response));
            cy.log(response.body.access_token);
            access_token = response.body.access_token;
            // get the user id 
            cy.request( {
                method: 'GET',
                url: 'http://coop.apps.symfonycasts.com/api/me',
                headers: {
                    'Authorization' : 'Bearer' + access_token
                }
            }).then(response => {
                userId = response.body.id;
                cy.log('user id ' + userId);
            })
        })
    })    
    
    it('',  ()=> {
        
        cy.request({
            method: 'POST',
            url: 'http.symfonycasts.com/api/' + userId+ '/chickens-feed',
            headers: {
                'Authorization' : 'Bearer ' + access_token
            }
        }).then(response=> {
            cy.log(JSON.stringify(response));
            expect(response.status).to.eq(200);
        }) 
    })


})

