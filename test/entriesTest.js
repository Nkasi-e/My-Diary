const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/components/app');
const { Record } = require('../src/components/entries/models/entriesSchema');

chai.use(chaiHttp);

const testUser = {
  email: 'test@gmail.com',
  password: 'password1A',
};

const entry = {
  title: 'I have tested you',
  body: 'let life begin',
};

let token;

before((done) => {
  chai
    .request(server)
    .post('/api/v1/user/login')
    .send(testUser)
    .end((err, res) => {
      if (err) {
        throw err;
      }
      token = res.body.token;
      done();
    });
});

// describe('POST /api/v1/diary', () => {
//   it('should create new entry record', (done) => {
//     chai
//       .request(server)
//       .post('/api/v1/diary')
//       .set('Authorization', `Bearer ${token}`)
//       .send(entry)
//       .end((err, res) => {
//         if (err) {
//           throw err;
//         }
//         expect(res).to.have.status(201);
//         done();
//       });
//   });
// });

describe('GET /api/v1/diary', () => {
  it('should get all user entries', (done) => {
    chai
      .request(server)
      .get('/api/v1/diary')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        expect(res).to.have.status(200);
        done();
      });
  });
});
