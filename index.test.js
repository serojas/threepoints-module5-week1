const request = require("supertest");
const should = require('should');
const app = require("./index");

let elementName;

describe("Get Employees", () => {
  test("GET /api/employees", (done) => {
    request(app)
      .get("/api/employees")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => {
        should.equal(res.body.length, 6);
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  test("GET /api/employees?page=1", (done) => {
    request(app)
      .get("/api/employees?page=1")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => {
        should.equal(res.body[0].name, "Sue");
        should.equal(res.body[1].name, "Bob");
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  test("GET /api/employees?page=2", (done) => {
    request(app)
      .get("/api/employees?page=2")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => {
        should.equal(res.body[0].name, "Willy");
        should.equal(res.body[1].name, "John");
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  test("GET /api/employees/oldest", (done) => {
    request(app)
      .get("/api/employees/oldest")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => {
        should.equal(res.body.age, 45);
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  test("GET /api/employees?user=true", (done) => {
    request(app)
      .get("/api/employees?page=2")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => {
        should.equal(res.body.length, 2);
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  test("GET /api/employees?badges=black", (done) => {
    request(app)
      .get("/api/employees?badges=black")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => {
        should.equal(res.body[0].name, 'Sue');
        should.equal(res.body[1].name,'Martin');
        should.equal(res.body[2].name,'John');

      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });

  test("GET /api/employees/:NAME", (done) => {
    elementName = 'Sue';
    request(app)
      .get(`/api/employees/${elementName}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => {
        should.equal(res.body.length, 1);
        should.equal(res.body[0].name, elementName);
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });


  test("POST /api/employees", (done) => {
    request(app)
      .post('/api/employees')
      .expect("Content-Type", /json/)
      .send({
        "name": "Sonia",
        "age": 33,
        "phone": {
          "personal": "777-123-123",
          "work": "777-456-456",
          "ext": "1808"
        },
        "privileges": "user",
        "favorites": {
          "artist": "Paganini",
          "food": "pizza"
        },
        "finished": [
          17,
          3
        ],
        "badges": [
          "yellow",
          "green"
        ],
        "points": [
          {
            "points": 85,
            "bonus": 20
          },
          {
            "points": 85,
            "bonus": 10
          }
        ]
      })
      .expect(201)
      .expect((res) => {
        should.equal(res.body.length, 7);
        should.equal(res.body[6].name,'Sonia');
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});