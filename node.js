const { MongoClient, ServerApiVersion, Admin} = require('mongodb');
const uri = "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.jx2e8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const { faker } = require('@faker-js/faker'); // faker for fake data
const { faker_zh_CN } = require ('@faker-js/faker/locale/zh_CN');
const bcrypt = require("bcryptjs"); //for encryption of password 

const fullName = `${faker.name.firstName()} ${faker.name.lastName()}`;
const avatarUrl = faker.image.avatar();
const address = faker.address.city();

const password = "mypass123"
const saltRounds = 10

bcrypt.genSalt(saltRounds,function(saltError,salt){ //encryption on password
    if(saltError){
        throw saltError
    }else {
     bcrypt.hash(password,salt,function(hashError,hash){
         if(saltError){
           throw hashError
        } else{
            console.log(hash)
            //$2a$10$FEBywZh8u9M0Cec/0mWep.1kXrwKeiWDba6tdKvDfEBjyePJNDT7K    
        }
       })
    }  
})

client.connect(async err => {   //connection to mongoDB 
    if (err) {
        console.log(err.message)
        return
    }

    console.log('Connected to MongoDB');
    console.log('\Generating fake account into mongoDB\n');

    client.db('fake_account').collection('userFake').insertOne({ //insert data into mongoDB
        name: fullName,
        //name_zh_CN: userNew.zh_CN_fullName,
        avartar_URL: avatarUrl,
        fake_address: address,
        encryptedpassword: password 
    }).then(result=>{
        console.log(result)
    })
});
  