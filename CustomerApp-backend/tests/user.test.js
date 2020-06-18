const request=require('supertest')
const app=require('../src/app')
const user=require('../src/models/user')
const jwt=require('jsonwebtoken')
const mongoose=require('mongoose')
const { response } = require('express')

const id=mongoose.Types.ObjectId()
const user1={
    _id:id,
    name:'mohit',
    contact:'9937274675',
    email:'mohit@gmail.com',
    password:'hhhhhh55555@@@##',
    tokens:[{
        token:jwt.sign({_id:id},process.env.jwt_secret)
    }]
}

beforeEach(async()=>{
    await user.deleteMany() 
    await new user(user1).save()  
})

test('Should signup a new user',async()=>{
    const response=await request(app).post('/register/user').send({
        name:'Andrew',
        contact:'9987652231',
        email:'andrew@gmail.com',
        password:'ashuetgf4499'
    }).expect(201)

    const users=user.findById(response.body.user._id)
    expect(users).not.toBeNull()

    // expect(response.body.user.name).toBe('Andrew')
    expect(response.body.user).toMatchObject({
        name:'Andrew',
        contact:'9987652231',
        email:'andrew@gmail.com',
    }
    )
})

test('Should not signup a user with invalid contact number',async()=>{
    const response=await request(app).post('/register/user').send({
        name:'Andrew',
        contact:'99876522',
        email:'andrew@gmail.com',
        password:'ashuetgf4499'
    }).expect(400)
})


test('login existing user',async()=>[
    await request(app).post('/user/login').send({
        email:'mohit@gmail.com',
        password:'hhhhhh55555@@@##',
    }).expect(200)
])


test('login failure',async()=>[
    await request(app).post('/user/login').send({
        email:'mohit@gmail.com',
        password:'hhhhh55555@@@##',
    }).expect(400)
])


test('get user profile',async()=>{
   await request(app)
            .get('/user/me')
            .set('Authorization',`Bearer ${user1.tokens[0].token}`)
            .send()
            .expect(200)

})

test('not get user profile',async()=>{
    await request(app)
            .get('/user/me')
            .send()
            .expect(401)
})

test('should delete user account',async()=>{
    await request(app)
            .delete('/user/me')
            .set('Authorization',`Bearer ${user1.tokens[0].token}`)
            .send()
            .expect(200)
})

test('should not delete user account',async()=>{
    await request(app)
            .delete('/user/me')
            .send()
            .expect(401)
})

test('should update valid user field',async()=>{
    await request(app)
            .patch('/user/me')
            .set('Authorization',`Bearer ${user1.tokens[0].token}`)
            .send({
                name:'Jess'
            })
            .expect(200)
})

test('should not update invalid user field',async()=>{
    await request(app)
            .patch('/user/me')
            .set('Authorization',`Bearer ${user1.tokens[0].token}`)
            .send({
                name:'Jess',
                location:'kkkk'
            })
            .expect(400)
})
