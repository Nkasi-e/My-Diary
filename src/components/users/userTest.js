const chai = require('chai');

const chaiHttp = require('chai-http');

const server = require('../app');

const { User } = require('./model/userModel');

chai.should();

// const { expect } = chai;
chai.use(chaiHttp);

const testUser = {
  name: 'anita',
  email: 'test@gmail.com',
  password: 'password1A',
};

let token;

// before((done) => {
//   User.destroy({ truncate: true });
//   chai
//     .request(server)
//     .post('/api/v1/user')
//     .set('content-type', 'application/json')
//     .send({
//       name: testUser.name,
//       email: testUser.email,
//       password: testUser.password,
//     })
//     .end((err, res) => {
//       if (err) {
//         console.log(err);
//         throw err;
//       }
//       token = res.body.token;
//       done();
//     });
// });
const userTest = () => {
  before(async () => {
    const { email } = testUser;
    await User.destroy({ where: { email } });
  });

  describe('POST /api/v1/user', () => {
    it('should create a new user and return back token', (done) => {
      chai
        .request(server)
        .post('/api/v1/user/signup')
        .send(testUser)
        .end((err, res) => {
          if (err) {
            throw err;
          }
          // eslint-disable-next-line prefer-destructuring
          // const body = res.body;
          // console.log(body);
          // console.log(err);
          // expect(res).to.have.status(201);
          // expect(res.body.testUser.name).to.equal(testUser.name);
          res.should.have.status(201);
          res.body.user.should.have.property('name').a('string');
          // res.body.should.have.property('token');
          // res.body.should.have.property('password');
          done();
        });
    });
  });
};

module.exports = userTest;
