const chai = require('chai');
const expect = chai.expect();
const should = chai.should();
const chaiHttp = require("chai-http");
const server = require('../server');

// pass this instead of server to avoid error
const API = 'http://localhost:8080';

chai.use(chaiHttp);

describe('/First Test Collection', () => {
    it('test default API welcome route', (done) => {
        chai.request(API)
            .get('/')
            .end((req, res) => {
                res.should.have.status(200);
                done();
            });
    });
});