describe('basic', ()=>{
    it('loads the homepage', ()=>{
        cy.visit('localhost:4000');
        cy.contains('All Projects')
    })
    it('is possible to add a user', ()=>{
        cy.contains('Add New User').click()
        cy.get('input[name=name]').type('Latiff')
        cy.get('input[name=avatar]').type('https://cdn.psychologytoday.com/sites/default/files/styles/article-inline-half-caption/public/field_blog_entry_images/2018-09/shutterstock_648907024.jpg?itok=0hb44OrI')
        cy.contains('Submit').click()
    })
    it('is able to add a project', ()=>{
        cy.contains('Add Project').click()
        cy.get('input[name=name]').type('cypress test project')
        cy.get('input[name=description]').type('cypress test description')
        cy.contains('Submit').click()
    })

})