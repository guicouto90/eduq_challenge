import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/index'
import { User } from '../src/model/User';
import { connect, closeDatabase, clearDatabase } from './db-handler';

chai.use(chaiHttp);
const { expect } = chai;

before(async () => await connect());

afterEach(async () => await clearDatabase())

after(async () => await closeDatabase())

describe('POST /users', () =>  {

  describe('When an user is registered successfully', () => {
    let response: any;
    before(async () => {
      response = await chai.request(server)
        .post('/users')
        .send({
          email: "teste@teste.com",
          role: "DEFAULT_USER",
          products: []
        })
    })

    it('Return status 201', () => {
      expect(response).to.have.status(201);
    });

    it('Return an object in the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('return a property "email" and "role" and "products" in the body', () => {
      expect(response.body).to.have.property('email');
      expect(response.body).to.have.property('role');
      expect(response.body).to.have.property('products')
    });
  })

  describe('When there is no property email', () => {
    let response: any;
    before(async () => {
      response = await chai.request(server)
        .post('/users')
        .send({
          role: "DEFAULT_USER",
          products: []
        })
    })

    it('Return status 400', () => {
      expect(response).to.have.status(400);
    });

    it('Return an object in the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('return a property "message" in the body', () => {
      expect(response.body).to.have.property('message');
    });

    it('Property "message" have the value: "\"email\" is required"', () => {
      expect(response.body.message).to.be.equals("\"email\" is required");
    });
  })

  describe('When there is no property role', () => {
    let response: any;
    before(async () => {
      response = await chai.request(server)
        .post('/users')
        .send({
          email: "teste@teste.com",
          products: []
        })
    })

    it('Return status 400', () => {
      expect(response).to.have.status(400);
    });

    it('Return an object in the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('return a property "message" in the body', () => {
      expect(response.body).to.have.property('message');
    });

    it('Property "message" have the value: "\"role\" is required"', () => {
      expect(response.body.message).to.be.equals("\"role\" is required");
    });
  })

  describe('When there is no property products', () => {
    let response: any;
    before(async () => {
      response = await chai.request(server)
        .post('/users')
        .send({
          email: "teste@teste.com",
          role: "DEFAULT_USER",
        })
    })

    it('Return status 400', () => {
      expect(response).to.have.status(400);
    });

    it('Return an object in the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('return a property "message" in the body', () => {
      expect(response.body).to.have.property('message');
    });

    it('Property "message" have the value: "\"products\" is required"', () => {
      expect(response.body.message).to.be.equals("\"products\" is required");
    });
  })

  describe('When property email, is not a valid string with email format', () => {
    let response: any;
    before(async () => {
      response = await chai.request(server)
        .post('/users')
        .send({
          email: "teste",
          role: "DEFAULT_USER",
          products: []
        })
    })

    it('Return status 400', () => {
      expect(response).to.have.status(400);
    });

    it('Return an object in the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('return a property "message" in the body', () => {
      expect(response.body).to.have.property('message');
    });

    it('Property "message" have the value: "\"email\" must be a valid email"', () => {
      expect(response.body.message).to.be.equals("\"email\" must be a valid email");
    });
  })

  describe('When property role, is not a valid string with role format', () => {
    let response: any;
    before(async () => {
      response = await chai.request(server)
        .post('/users')
        .send({
          email: "teste@teste.com",
          role: "DEFAULT_USERR",
          products: []
        })
    })

    it('Return status 400', () => {
      expect(response).to.have.status(400);
    });

    it('Return an object in the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('return a property "message" in the body', () => {
      expect(response.body).to.have.property('message');
    });

    it('Property "message" have the value: "\"role\" must be one of [PREMIUM_USER, DEFAULT_USER]"', () => {
      expect(response.body.message).to.be.equals("\"role\" must be one of [PREMIUM_USER, DEFAULT_USER]");
    });
  })

  describe('When property products, is not a array', () => {
    let response: any;
    before(async () => {
      response = await chai.request(server)
        .post('/users')
        .send({
          email: "teste@teste.com",
          role: "DEFAULT_USER",
          products: 1
        })
    })

    it('Return status 400', () => {
      expect(response).to.have.status(400);
    });

    it('Return an object in the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('return a property "message" in the body', () => {
      expect(response.body).to.have.property('message');
    });

    it('Property "message" have the value: "\"products\" must be an array"', () => {
      expect(response.body.message).to.be.equals("\"products\" must be an array");
    });
  })

  describe('When it tries to register the same email that is already registered', () => {
    let response: any;
    before(async () => {
      await User.create({
        email: "teste@teste.com",
        role: "DEFAULT_USER",
        products: []
      })
      response = await chai.request(server)
        .post('/users')
        .send({
          email: "teste@teste.com",
          role: "DEFAULT_USER",
          products: []
        })
    })

    it('Return status 409', () => {
      expect(response).to.have.status(409);
    });

    it('Return an object in the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('return a property "message" in the body', () => {
      expect(response.body).to.have.property('message');
    });

    it('Property "message" have the value: "Email already registered"', () => {
      expect(response.body.message).to.be.equals("Email already registered");
    });
  })

})

describe('GET /users', () =>  {

  describe('List an user by id', () => {
    let response: any;
    before(async () => {
      await User.create({
        email: "teste@teste.com",
        role: "DEFAULT_USER",
        products: []
      })
      const user: any = await User.findOne({ email: 'teste@teste.com' });
      response = await chai.request(server)
        .get(`/users/${user._id}`)
    })

    it('Return status 200', () => {
      expect(response).to.have.status(200);
    });

    it('Return an object in the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('return a property "email" and "role" and "products" in the body', () => {
      expect(response.body).to.have.property('email');
      expect(response.body).to.have.property('role');
      expect(response.body).to.have.property('products')
    });
  })

  describe('Try to list an user with not valid id', () => {
    let response: any;
    before(async () => {
      response = await chai.request(server)
        .get(`/users/62ab7d8979064a5267c7c831`)
    })

    it('Return status 404', () => {
      expect(response).to.have.status(404);
    });

    it('return a property "message" in the body', () => {
      expect(response.body).to.have.property('message');
    });

    it('Property "message" have the value: "User not found"', () => {
      expect(response.body.message).to.be.equals("User not found");
    });
  })

  describe('List all users', () => {
    let response: any;
    before(async () => {
      response = await chai.request(server)
        .get('/users')
    })

    it('Return status 200', () => {
      expect(response).to.have.status(200);
    });

    it('Return an array in the body', () => {
      expect(response.body).to.be.an('array');
    });
  })
})

describe('PUT /users', () =>  {

  describe('When an user get a new purchase', () => {
    let response: any;
    before(async () => {
      await User.create({
        email: "teste@teste.com",
        role: "DEFAULT_USER",
        products: []
      })
      const user: any = await User.findOne({ email: 'teste@teste.com' });
      response = await chai.request(server)
        .put(`/users/purchase/${user._id}`)
        .send({
          productId: "123456"
        })
    })

    it('Return status 202', () => {
      expect(response).to.have.status(202);
    });

    it('Return an object in the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('return a property "message" in the body', () => {
      expect(response.body).to.have.property('message');
    });
  })

  describe('When an user cancel a purchase', () => {
    let response: any;
    before(async () => {
      await User.create({
        email: "teste@teste.com",
        role: "DEFAULT_USER",
        products: [
          {
            productId: "123456"
          }
        ]
      })
      const user: any = await User.findOne({ email: 'teste@teste.com' });
      response = await chai.request(server)
        .put(`/users/cancel/${user._id}`)
        .send({
          productId: "123456"
        })
    })

    it('Return status 202', () => {
      expect(response).to.have.status(202);
    });

    it('Return an object in the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('return a property "message" in the body', () => {
      expect(response.body).to.have.property('message');
    });
  })

  describe('When productId is not 123456 or 987654', () => {
    let response: any;
    before(async () => {
      response = await chai.request(server)
        .put(`/users/purchase/62ab7d8979064a5267c7c831`)
        .send({
          productId: "1234567"
        })
    })

    it('Return status 400', () => {
      expect(response).to.have.status(400);
    });

    it('Return an object in the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('return a property "message" in the body', () => {
      expect(response.body).to.have.property('message');
    });

    it('Property "message" have the value: productId" must be one of [123456, 987654]', () => {
      expect(response.body.message).to.be.equals("\"productId\" must be one of [123456, 987654]");
    });
  })

  describe('When there is no property products', () => {
    let response: any;
    before(async () => {
      await User.create({
        email: "teste@teste.com",
        role: "DEFAULT_USER",
        products: [
          {
            productId: "123456"
          }
        ]
      })
      const user: any = await User.findOne({ email: 'teste@teste.com' });
      response = await chai.request(server)
        .put(`/users/cancel/${user._id}`)
        .send({
        productId: "987654"
      })
    })

    it('Return status 400', () => {
      expect(response).to.have.status(400);
    });

    it('Return an object in the body', () => {
      expect(response.body).to.be.an('object');
    });

    it('return a property "message" in the body', () => {
      expect(response.body).to.have.property('message');
    });

    it('Property "message" have the value: User doesnt have this product', () => {
      expect(response.body.message).to.be.equals("User doesnt have this product");
    });
  })
})
