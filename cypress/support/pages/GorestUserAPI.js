import { faker } from '@faker-js/faker';

export class GorestUserAPI {
  constructor() {
    this.baseUrl = 'https://gorest.co.in/public/v2/users';
    this.token = '302553a14f3f50017eaedac933bcd0cb2e2169541b258e1e7e4dd0af38a7db6e';
  }

  generateUserData() {
    return {
      name: faker.name.fullName(),
      gender: 'male',
      email: faker.internet.email(),
      status: 'active'
    };
  }

  generateUpdatedUserData() {
    return {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      status: 'active'
    };
  }

  createUser(data) {
    return cy.request({
      method: 'POST',
      url: this.baseUrl,
      headers: { Authorization: `Bearer ${this.token}` },
      body: data
    });
  }

  getUser(id) {
    return cy.request({
      method: 'GET',
      url: `${this.baseUrl}/${id}`,
      headers: { Authorization: `Bearer ${this.token}` },
      failOnStatusCode: false
    });
  }

  updateUser(id, data) {
    return cy.request({
      method: 'PATCH',
      url: `${this.baseUrl}/${id}`,
      headers: { Authorization: `Bearer ${this.token}` },
      body: data
    });
  }

  deleteUser(id) {
    return cy.request({
      method: 'DELETE',
      url: `${this.baseUrl}/${id}`,
      headers: { Authorization: `Bearer ${this.token}` }
    });
  }
}

