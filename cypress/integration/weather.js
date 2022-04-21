/// <reference types = "cypress"/>


describe('check weather info for cities', ()=>{

    it('get weather information for cities', ()=> {

        cy.request({
            method: 'GET',
            url: 'https://www.metaweather.com/api/location/search/?query=San'
        }).then ((res)=>{
            const title = res.body[0].title
            return title;
        }).then((city) => {
            cy.request({
                method: 'GET',
                url: 'https://www.metaweather.com/api/location/search/?query=' + city
            }).then((resp)=>{
                expect(resp.status).to.eq(200);
                expect(resp.body[0]).to.have.property('title',city);
            })
        })

    }),


    it.only('get weather information for all cities', ()=> {

        cy.request({
            method: 'GET',
            url: 'https://www.metaweather.com/api/location/search/?query=Am'
        }).then ((res)=>{
            const location = res.body
            return location;
        }).then((location) => {

            for(let i=0;i<location.length;i++) {
            //2nd request        
            cy.request({
                method: 'GET',
                url: 'https://www.metaweather.com/api/location/search/?query=' + location[i].title
            }).then((resp)=>{
                expect(resp.status).to.eq(200);
                expect(resp.body[0]).to.have.property('title',location[i].title);
            })
        }
        })

    })






})