const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

// Describe the test suite
describe("API Tests", () => {
  describe("GET /subscribers/:id", () => {
    it("should return error status 400 with and 'error' property when provided an invalid ID", (done) => {
      chai
        .request("http://localhost:3000")
        .get("/subscribers/66518069c7bd437f978d45fab")
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("error");
          done();
        });
    });
  });

  describe("GET /subscribers/:id", () => {
    it("should return details of a  valid subscriber with valid ID", (done) => {
      chai
        .request("http://localhost:3000")
        .get("/subscribers/66518069c7bd437f978d4fa9")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("_id");
          res.body.should.have.property("name");
          res.body.should.have.property("subscribedChannel");
          res.body.should.have.property("subscribedDate");
          done();
        });
    });
  });

  describe("GET /subscribers/names", () => {
    it("should return an array of all the subscriber names and subscribedChannel", (done) => {
      chai
        .request("http://localhost:3000")
        .get("/subscribers/names")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(3);
          done();
        });
    });
  });

  describe("GET /subscribers", () => {
    it("should return an array of all the subscribers", (done) => {
      chai
        .request("http://localhost:3000")
        .get("/subscribers")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(3);
          done();
        });
    });
  });
});
