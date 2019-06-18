/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

xdescribe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    beforeEach(() => {
      return User.bulkCreate([
        {
          name: 'mercedes',
          email: 'mer@email.com',
          isAdmin: true,
          password: '123'
        },
        {
          name: 'sam',
          email: 'sam@email.com',
          isAdmin: false,
          password: '123'
        },
        {
          name: 'alyona',
          email: 'aly@email.com',
          isAdmin: true,
          password: '123'
        },
        {
          name: 'alex',
          email: 'alex@email.com',
          isAdmin: false,
          password: '123'
        }
      ])
    })

    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body.length).to.be.equal(4)
      expect(res.body[0].email).to.be.equal('mer@email.com')
    })
  })

  describe('/api/users/:id', () => {
    beforeEach(() => {
      return User.bulkCreate([
        {
          name: 'mercedes',
          email: 'mer@email.com',
          isAdmin: true,
          password: '123'
        },
        {
          name: 'sam',
          email: 'sam@email.com',
          isAdmin: false,
          password: '123'
        },
        {
          name: 'alyona',
          email: 'aly@email.com',
          isAdmin: true,
          password: '123'
        },
        {
          name: 'alex',
          email: 'alex@email.com',
          isAdmin: false,
          password: '123'
        }
      ])
    })

    it('GET /api/users/:id', async () => {
      const res = await request(app)
        .get('/api/users/1')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal('mercedes')
    })

    it('PUT /api/users/:id', async () => {
      const res = await request(app)
        .put('/api/users/1')
        .send({name: 'batman'})
        .expect(200)

      let user = await User.findByPk(1)

      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal('batman')
      expect(user.name).to.be.equal('batman')
    })

    it('DELETE /api/users/:id', async () => {
      const res = await request(app)
        .delete('/api/users/1')
        .expect(200)

      let user = await User.findByPk(1)
      let users = await User.findAll()

      expect(users.length).to.be.equal(3)
      expect(user).to.be.equal(null)
    })
  })

  describe('/api/users/add', () => {
    beforeEach(() => {
      return User.bulkCreate([
        {
          name: 'mercedes',
          email: 'mer@email.com',
          isAdmin: true,
          password: '123'
        },
        {
          name: 'sam',
          email: 'sam@email.com',
          isAdmin: false,
          password: '123'
        }
      ])
    })

    it('POST /api/users/add', async () => {
      const res = await request(app)
        .post('/api/users/add')
        .send({
          name: 'alyona',
          email: 'aly@email.com',
          isAdmin: true,
          password: '123'
        })
        .expect(200)

      let users = await User.findAll()

      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal('alyona')
      expect(users.length).to.be.equal(3)
    })
  })
})
