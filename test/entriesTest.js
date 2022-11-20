const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/components/app');

chai.use(chaiHttp);

const testUser = {
  password: 'Bethwyry1',
  email: 'testing@gmail.com',
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
//       .set({ Authorization: `Bearer ${token}` })
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

// describe('GET /api/v1/diary', () => {
//   it('should return no content when entries is empty', (done) => {
//     chai
//       .request(server)
//       .get('/api/v1/diary')
//       .set({ Authorization: `Bearer ${token}` })
//       .end((err, res) => {
//         if (err) {
//           throw err;
//         }
//         expect(res).to.have.status(204);
//         done();
//       });
//   });
// });

describe('GET /api/v1/diary', () => {
  it('should get all user entries', (done) => {
    chai
      .request(server)
      .get('/api/v1/diary')
      .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        if (err) {
          throw err;
        }
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('All Entries');
        expect(res.body).to.have.property('total');
        expect(res.body).to.have.property('Entries');
        expect(res.body.Entries).to.be.a('array');
        done();
      });
  });
});

describe('GET /api/v1/diary/:id', () => {
  it('should get a single entry by id', (done) => {
    chai
      .request(server)
      .get('/api/v1/diary/17')
      .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        if (err) {
          throw err;
        }
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Entry found');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('entry').to.be.a('object');
        expect(res.body.entry).to.have.property('title');
        expect(res.body.entry).to.have.property('body');
        expect(res.body.entry).to.have.property('userid');
        done();
      });
  });

  it('should fail to get bad entry if id doest not exist', (done) => {
    chai
      .request(server)
      .get('/api/v1/diary/40')
      .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        if (err) throw err;
        expect(res).to.have.status(404);
        expect(res.body.error).to.have.property('message');
        expect(res.body.error).to.be.a('object');
        expect(res.body.error).to.have.property('field').to.equal('id');
        done();
      });
  });
});
