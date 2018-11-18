//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Pets', () => {
    beforeEach((done) => {
        //Before each test we empty the database in your case
        done();
    });
    /*
     * Test the /GET route
     */
    describe('/GET pets', () => {
        it('The number of pets should be 9', (done) => {
            chai.request(server)
                .get('/pets')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(9);
                    done();
                });
        });
    });

    /*
     * Test the /POST route
     */
    describe('/POST pets', () => {
        it('it should POST a pet', (done) => {
            let pet = {
                name: "Bug",
                status: "detected"
            };
            chai.request(server)
                .post('/pets')
                .send(pet)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Pet successfully added!');
                    res.body.pet.should.have.property('id');
                    res.body.pet.should.have.property('name').eql(pet.name);
                    res.body.pet.should.have.property('status').eql(pet.status);
                    done();
                });
        });
        it('it should not POST a pet without status field', (done) => {
            let pet = {
                name: "Bug"
            };
            chai.request(server)
                .post('/pets')
                .send(pet)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql("Pet is invalid!");
                    done();
                });
        });
    });

    /*
     * Test the /GET/:id route
     */
    describe('/GET/:id pets', () => {
        it('it should GET the pet with id = 1', (done) => {
            let id = 1;
            chai.request(server)
                .get('/pets/' + id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('pet');
                    res.body.pet.should.have.property('id').eql(id);
                    res.body.pet.should.have.property('name');
                    res.body.pet.should.have.property('status');
                    done();
                });
        });
    });

    /*
     * Test the /PUT/:id route
     */
    describe('/PUT/:id pets', () => {
        it('it should UPDATE the pet with id = 2', (done) => {
            let id = 2;
            chai.request(server)
                .put('/pets/' + id)
                .send({
                    name: "Bug",
                    status: "fixed"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('pet');
                    res.body.pet.should.have.property('name').eql("Bug");
                    res.body.pet.should.have.property('status').eql("fixed");
                    done();
                });
        });
    });

    /*
     * Test the /DELETE/:id route
     */
    describe('/DELETE/:id pets', () => {
        it('it should DELETE the pet with id = 3', (done) => {
            let id = 3;
            chai.request(server)
                .delete('/pets/' + id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Pet successfully deleted!');
                    res.body.should.have.property('result');
                    res.body.result.should.have.property('roweffected').eql(1);
                    done();
                });
        });
    });
});
