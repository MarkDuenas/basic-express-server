'use strict';

const { app } = require('../src/server.js');
const supertest = require('supertest');
const mockRequest = supertest(app);

describe('*** API SERVER ***', () => {

  it('should respond with 500 on a server error', () => {
    return mockRequest.get('/person?name=')
    .then(results => {
      expect(results.status).toBe(500);
    })
  });

  it('should respond with a 404 on not found', () => {
    return mockRequest.get('/sample-route')
    .then(results => {
      expect(results.status).toBe(404);
    })
  });

  it('should respond with 404 on bad method', () => {
    return mockRequest.put('/person')
    .then(results => {
      expect(results.status).toBe(404);
    })
  });

  it('should respond with 200 if name is in query string', () => {
    return mockRequest.get('/person?name=Mark')
    .then(results => {
      expect(results.status).toBe(200);
    })
  })

})
