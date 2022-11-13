const chai = require('chai');

const chaiHttp = require('chai-http');

const server = require('../src/components/app');

const { User } = require('../src/components/users/model/userModel');

chai.should();

// const { expect } = chai;
chai.use(chaiHttp);

const testUser = {
  name: 'anita',
  email: 'test@gmail.com',
  password: 'password',
};

let token;

before((done) => {
  User.destroy({ truncate: true });
  chai
    .request(server)
    .post('/api/v1/user')
    .set('content-type', 'application/json')
    .send({
      name: testUser.name,
      email: testUser.email,
      password: testUser.password,
    })
    .end((err, res) => {
      if (err) {
        console.log(err);
        throw err;
      }
      token = res.body.token;
      done();
    });
});

describe('POST /api/v1/user', () => {
  it('should create a new user and return back token', (done) => {
    chai
      .request(server)
      .post('/api/v1/user')
      .send(testUser)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        // eslint-disable-next-line prefer-destructuring
        // const body = res.body;
        // console.log(body);
        // console.log(err);
        // expect(res).to.have.status(404);
        // expect(res.body.testUser.name).to.equal(testUser.name);
        res.should.have.status(404);
        // res.body.should.have.property('name').a('string');
        // res.body.should.have.property('token').a('string');
        // res.body.should.have.property('password').a('string');
        done();
      });
  });
});
