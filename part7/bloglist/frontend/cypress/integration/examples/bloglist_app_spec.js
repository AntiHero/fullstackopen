/* eslint-disable no-undef */
beforeEach(function() {
  cy.request('POST', 'http://localhost:3003/api/testing/reset');
  const user = {
    name: 'John Connor',
    username: 'connor',
    password: 'hateterminators',
  };
  cy.request('POST', 'http://localhost:3003/api/users/', user);
  cy.visit('http://localhost:3000');
});

describe('Bloglist app', function() {
  it('login form can be opened', function() {
    cy.contains('Login').click();
  });

  it('user can login', function() {
    cy.get('input[name=username]').type('connor');
    cy.get('input[name=password]').type('hateterminators');
    cy.contains('Login').click();
    cy.contains('John Connor');
  });

  it('user can logout', function() {
    cy.get('input[name=username]').type('connor');
    cy.get('input[name=password]').type('hateterminators');
    cy.contains('Login').click();
    cy.contains('John Connor');
    cy.contains('Log out').click();
    cy.contains('Log in to application');
  })
});

describe('Creating new blog', function() {
  beforeEach(function() {
    cy.get('input[name=username]').type('connor');
    cy.get('input[name=password]').type('hateterminators');
    cy.contains('Login').click();
  });

  it('button for creating new blog exists', function() {
    cy.contains('New').click();
    cy.contains('Create blog');
    cy.contains('Title');
    cy.contains('Author');
    cy.contains('Url');
  });

  it('user can create new blog', function() {
    cy.contains('New').click();
    cy.get('input[name=title]').type('New blog for part 7');
    cy.get('input[name=author]').type('John Doe');
    cy.get('input[name=url]').type('https://mynewblog/index.html');
    cy.get('button[type=submit').click();
    cy.contains('New blog for part 7 by John Doe');
  });

  it('info about created blog available', function() {
    cy.contains('New').click();
    cy.get('input[name=title]').type('New blog for part 7');
    cy.get('input[name=author]').type('John Doe');
    cy.get('input[name=url]').type('https://mynewblog/index.html');
    cy.get('button[type=submit').click();
    cy.contains('New blog for part 7 by John Doe').click();
    cy.contains('added by John Connor');
    cy.contains('Watch here');
  });

  it('after creating a blog the number of created blogs in USERS table increased', function() {
    cy.contains('USERS').click();
    cy.contains('John Connor');
    cy.contains('Blogs created');
    cy.contains('0');
    cy.contains('BLOGS').click();
    cy.contains('New').click();
    cy.get('input[name=title]').type('New blog for part 7');
    cy.get('input[name=author]').type('John Doe');
    cy.get('input[name=url]').type('https://mynewblog/index.html');
    cy.get('button[type=submit').click();
    cy.contains('USERS').click();
    cy.contains('John Connor');
    cy.contains('Blogs created');
    cy.contains('1');
  });

  it('user can delete a blog', function() {
    cy.contains('New').click();
    cy.get('input[name=title]').type('New blog for part 7');
    cy.get('input[name=author]').type('John Doe');
    cy.get('input[name=url]').type('https://mynewblog/index.html');
    cy.get('button[type=submit').click();
    cy.contains('New blog for part 7 by John Doe').click();
    cy.contains('Delete').click();
    cy.contains('New');
    cy.contains('New blog for part 7 by John Doe').should('not.exist');
  });
});

describe('User can manage a blog', function () {
  beforeEach(function() {
    cy.get('input[name=username]').type('connor');
    cy.get('input[name=password]').type('hateterminators');
    cy.contains('Login').click();
    cy.contains('New').click();
    cy.get('input[name=title]').type('New blog for part 7');
    cy.get('input[name=author]').type('John Doe');
    cy.get('input[name=url]').type('https://mynewblog/index.html');
    cy.get('button[type=submit').click();
    cy.contains('New blog for part 7 by John Doe').click();
  });

  it('user can leave a comment', function() {
    cy.get('input[name=comment]').type('My comment is first!');
    cy.contains('Add').click();
    cy.contains('My comment is first!');
  })

  it('user can like a blog', function() {
    cy.contains('0');
    cy.contains('Like').click();
    cy.contains('1');
  })
})
