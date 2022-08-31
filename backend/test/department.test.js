const chai = require('chai');
const expect = chai.expect();
const should = chai.should();
const chaiHttp = require("chai-http");
const server = require('../server');
// pass this instead of server to avoid error
const API = 'http://localhost:8080';
chai.use(chaiHttp);

const _token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYxOTIyODk1LCJleHAiOjE2NjIwMDkyOTV9.dQOtiP3b84tivAgIjriTeAYGeFIo6mqg6Q_xc44CRbk"

/*
  * Test the /GET route
  */
describe('/GET departments', () => {
    it('it should GET all the departments', (done) => {
        chai.request(API)
            .get('/api/departments')
            .set('x-access-token', `${_token}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
});

/*
* Test the /POST route
*/
describe('/POST department', () => {
    it('it should add a department to the database', (done) => {
        let department = {
            "className": "Physics",
            "sessionId": 1,
            "userId": 1
        }
        chai.request(API)
            .post('/api/department/add')
            .set('x-access-token', `${_token}`)
            .send(department)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql("Department was added successfully!");
                done();
            });
    });

});

/*
  * Test the /GET department route
  */
describe('/GET department', () => {
    it('it should GET a department', (done) => {
        chai.request(API)
            .get('/api/department/1')
            .set('x-access-token', `${_token}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
});