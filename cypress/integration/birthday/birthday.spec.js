describe('birthday app', ()=> {
  it('check if we will get an error when less one field is empty', ()=>{
    const stub = cy.stub()
    cy.on('window:alert', stub)
    cy.visit('/')
    cy.get('button').click().then(()=> {
      expect(stub.getCall(0)).to.be.calledWith('fill in the empty fields')
    })
    cy.get('header > div').should('have.text','0 birthdays ')
  })

  it('add new birthday on birthdays list', ()=> {
    cy.get('input').should('have.length', 3)
    cy.get('input').first().type('Hanga Lagoue')
    cy.get('input').eq(1).type('Wilfried Junior')
    cy.get('input').last().type('2000-05-27')
    cy.get('button').click()
    cy.get('header > div').should('have.text', '1 birthdays ')

    cy.get('input').first().type('Hanga Poungoue')
    cy.get('input').eq(1).type('Gabriel Valdez')
    cy.get('input').last().type('2002-09-04')
    cy.get('button').click()
    cy.get('header > div').should('have.text', '2 birthdays ')
  })

  it('watch scenario when current user already exist in the list', ()=> {
    const stub = cy.stub()
    cy.on('window:alert', stub)

    cy.get('input').first().type('Hanga Lagoue')
    cy.get('input').eq(1).type('Wilfried Junior')
    cy.get('input').last().type('2000-05-27')
    cy.get('button').click().then(() => {
      expect(stub.getCall(0)).to.be.calledWith('this already existed please make sure you are try registered the good birthday')
    })
    cy.get('header > div').should('have.text', '2 birthdays ')

    cy.get('input').first().type('Hanga Poungoue')
    cy.get('input').eq(1).type('Gabriel Valdez')
    cy.get('input').last().type('2002-09-04')
    cy.get('button').click().then(() => {
      expect(stub.getCall(0)).to.be.calledWith('this already existed please make sure you are try registered the good birthday')
    })
    cy.get('header > div').should('have.text', '2 birthdays ')
  })

  it('watch the scenario when we delete birthdays from list', ()=>{
    cy.get('footer > :nth-child(1) > :nth-child(5)').click().then(()=>{
      expect(cy.get('header > div').should('have.text', '1 birthdays '))
    })
    cy.get('footer > :nth-child(1) > :nth-child(5)').click().then(()=>{
      expect(cy.get('header > div').should('have.text', '0 birthdays '))
    })
  })
})
