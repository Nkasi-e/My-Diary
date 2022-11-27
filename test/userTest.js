const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/components/app');
const { User } = require('../src/components/users/model/userModel');

chai.should();
chai.use(chaiHttp);

const testUser = {
  name: 'anita',
  email: 'test@gmail.com',
  password: 'password1A',
};

const resetToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5rYXNpLmRldkBnbWFpbC5jb20iLCJpZCI6MjkxLCJuYW1lIjoiTG9tZW4iLCJpYXQiOjE2Njk1MDUyMDUsImV4cCI6MTY2OTUwNTgwNX0.rWED2MEepRsnsNx8iRsgW_YhInGaxSogvFbQA2mELYQ';

const jwtToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjM1LCJlbWFpbCI6Im5rYXNpam5yQGdtYWlsLmNvbSIsImlhdCI6MTY2ODEwODU3MywiZXhwIjoxNjcwNzAwNTczfQ.58xA_PFAHlw5Z0Y6sCTHvczquyv90IbMIMOaoNQUxDA';

let token;

before(async () => {
  const { email } = testUser;
  await User.destroy({ where: { email } });
});

// testing register route
describe('POST /api/v1/user/signup', () => {
  it('should create a new user and return back token', (done) => {
    chai
      .request(server)
      .post('/api/v1/user/signup')
      .send(testUser)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        res.should.have.status(201);
        res.body.user.should.have.property('name').a('string');
        res.body.user.should.have.property('email').a('string');
        res.body.should.have.property('token');
        token = res.body.token;
        done();
      });
  });

  it('should return 409 if email already exist', (done) => {
    chai
      .request(server)
      .post('/api/v1/user/signup')
      .send(testUser)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        res.should.have.status(409);
        res.body.error.message.should.equal('The email already exists.');
        res.body.error.field.should.equal('email');
        res.body.error.status.should.equal(409);
        done();
      });
  });

  it('should fail if email is wrong', (done) => {
    chai
      .request(server)
      .post('/api/v1/user/signup')
      .send({ name: testUser.name, email: 'testgmail' })
      .end((err, res) => {
        if (err) {
          throw err;
        }
        res.should.have.status(400);
        res.body.should.have.property('error').to.be.a('object');
        res.body.error.message.should.equal(
          'email must be a valid email address'
        );
        res.body.error.field.should.equal('email');
        done();
      });
  });

  it('should fail if password does not meet conditions', (done) => {
    chai
      .request(server)
      .post('/api/v1/user/signup')
      .send({
        name: testUser.name,
        email: 'test@gmail.com',
        password: 'ueuwoeuow',
      })
      .end((err, res) => {
        if (err) {
          throw err;
        }
        res.should.have.status(400);
        res.body.should.have.property('error').to.be.a('object');
        res.body.error.message.should.equal(
          'The password must contain at least 8 characters including at least one uppercase, one lowercase, one number'
        );
        res.body.error.field.should.equal('password');
        done();
      });
  });
});

// testing login route
describe('POST /api/v1/user/login', () => {
  it('should successfully login a user', (done) => {
    const payload = { email: testUser.email, password: testUser.password };
    chai
      .request(server)
      .post('/api/v1/user/login')
      .send(payload)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        res.should.have.status(200);
        res.body.user.should.be.a('object');
        res.body.user.should.have.property('name').a('string');
        res.body.user.should.have.property('email').a('string');
        res.body.should.have.property('token').a('string');
        res.body.message.should.equal('Login successful');
        token = res.body.token;
        done();
      });
  });

  it('should fail to login if email is wrong', (done) => {
    const wrongEmail = { email: 'wny@gmail.com', password: testUser.password };
    chai
      .request(server)
      .post('/api/v1/user/login')
      .send(wrongEmail)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        res.should.have.status(400);
        res.body.error.message.should.equal(`The email doesn't exist`);
        res.body.error.field.should.equal('email');
        done();
      });
  });

  it('should fail to login if password is wrong', (done) => {
    const wrongPassword = { email: testUser.email, password: '347Qihdei' };
    chai
      .request(server)
      .post('/api/v1/user/login')
      .send(wrongPassword)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        res.should.have.status(400);
        res.body.error.message.should.equal('The email or password is Invalid');
        res.body.error.field.should.equal('Invalid');
        done();
      });
  });
});

describe('GET /api/v1/user/myprofile', () => {
  it('should return back the user profile details', (done) => {
    chai
      .request(server)
      .get('/api/v1/user/myprofile')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        res.should.have.status(200);
        res.body.user.should.have.property('name').a('string');
        res.body.user.should.have.property('email').a('string');
        res.body.user.should.have.property('password').a('string');
        res.body.message.should.equal('My Profile');
        done();
      });
  });
});

describe('POST /api/v1/user/deleteaccount', () => {
  it('should delete the user account', (done) => {
    chai
      .request(server)
      .post('/api/v1/user/deleteaccount')
      .set('Authorization', `Bearer ${token}`)
      .send(testUser)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        res.should.have.status(204);
        done();
      });
  });

  it('should return account deleted for deleted account', (done) => {
    chai
      .request(server)
      .post('/api/v1/user/deleteaccount')
      .set('Authorization', `Bearer ${token}`)
      .send(testUser)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        res.should.have.status(404);
        res.body.error.message.should.equal(`The account doesn't exist`);
        res.body.error.field.should.equal('Invalid account');
        done();
      });
  });
});

describe('GET /api/v1/user/userinfo/:token', () => {
  it('should get user info with token', (done) => {
    chai
      .request(server)
      .get(`/api/v1/user/userinfo/${jwtToken}`)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        res.should.have.status(200);
        res.body.success.should.equal(true);
        res.body.payLoad.should.have.property('userid');
        res.body.payLoad.should.have.property('email');
        res.body.payLoad.should.have.property('iat');
        res.body.payLoad.should.have.property('exp');
        done();
      });
  });
});

describe('GET /api/v1/user/myprofile', () => {
  it('should fail to return user details', (done) => {
    chai
      .request(server)
      .get('/api/v1/user/myprofile')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        res.should.have.status(404);
        res.body.should.have.property('error').a('object');
        res.body.error.message.should
          .equal('This account does not exist')
          .a('string');
        res.body.error.field.should.equal('Invalid account').a('string');
        done();
      });
  });
});

/**
 * @descriptions - test for forgot password and reset password route
 */

describe('Post /api/v1/user/reset-password/:id/:token', () => {
  it('should fail because user id is wrong', (done) => {
    chai
      .request(server)
      .post(`/api/v1/user/reset-password/67/${jwtToken}`)
      .send({
        password: 'Worldcup2022',
      })
      .end((err, res) => {
        if (err) throw err;
        res.should.have.status(400);
        res.body.should.have.property('error');
        res.body.error.message.should.equal('Invalid ID...').a('string');
        res.body.error.field.should.equal('id').a('string');
        done();
      });
  });

  it('should fail because user password does not meet conditions set', (done) => {
    chai
      .request(server)
      .post(`/api/v1/user/reset-password/67/${jwtToken}`)
      .send({
        password: 'Worl',
      })
      .end((err, res) => {
        if (err) throw err;
        res.should.have.status(400);
        res.body.should.have.property('error');
        res.body.error.message.should
          .equal('Password must be at least 8 character long')
          .a('string');
        res.body.error.field.should.equal('password').a('string');
        done();
      });
  });

  it('should update password', (done) => {
    chai
      .request(server)
      .post(`/api/v1/user/reset-password/291/${resetToken}`)
      .send({
        password: 'Worldcup2022',
      })
      .end((err, res) => {
        if (err) throw err;
        res.should.have.status(200);
        res.body.success.should.equal(true);
        res.body.message.should.equal(
          `You have successfully reset your password`
        );
        done();
      });
  });

  it('should fail when token is wrong', (done) => {
    chai
      .request(server)
      .post(`/api/v1/user/reset-password/291/${jwtToken}`)
      .send({
        password: 'Worldcup2022',
      })
      .end((err, res) => {
        if (err) throw err;
        res.should.have.status(500);
        res.body.error.should.equal(`Internal Server error`).a('string');
        done();
      });
  });

  it('send password link to user', (done) => {
    chai
      .request(server)
      .get(`/api/v1/user/reset-password/291/${resetToken}`)
      .end((err, res) => {
        if (err) throw err;
        res.should.have.status(200);
        res.body.message.should.equal(
          `Use the link below to reset your password`
        );
        res.body.link.should.equal(`291/${resetToken}`);
        done();
      });
  });
});

describe('POST /api/v1/user/forgotpassword', () => {
  it('it should send password for reseting', (done) => {
    chai
      .request(server)
      .post('/api/v1/user/forgotpassword')
      .send({ email: 'nkasi.dev@gmail.com' })
      .end((err, res) => {
        if (err) throw err;
        res.should.have.status(200);
        res.body.should.have.property('message');
        res.body.message.should
          .equal(
            `Password reset link has been sent to your email nkasi.dev@gmail.com`
          )
          .to.be.a('string');
        done();
      });
  });

  it("should return 404 if email doesn't exist for password reset", (done) => {
    chai
      .request(server)
      .post('/api/v1/user/forgotpassword')
      .send({
        email: 'yuysds@gmail.com',
      })
      .end((err, res) => {
        if (err) throw err;
        res.should.have.status(404);
        res.body.error.message.should
          .equal(`The email doesn't exist`)
          .to.be.a('string');
        res.body.error.field.should.equal(`email`).to.be.a('string');
        done();
      });
  });

  it('should return 400 if email is not a valid email address', (done) => {
    chai
      .request(server)
      .post('/api/v1/user/forgotpassword')
      .send({
        email: 'gimicksgmail.com',
      })
      .end((err, res) => {
        if (err) throw err;
        res.should.have.status(400);
        res.body.error.message.should
          .equal(`email must be a valid email address`)
          .to.be.a('string');
        res.body.error.field.should.equal(`email`).to.be.a('string');
        done();
      });
  });
});
