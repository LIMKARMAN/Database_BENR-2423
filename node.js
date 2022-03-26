const bcrypt = require("bcryptjs")

const password = "mypass123"
const saltRounds = 10

bcrypt.genSalt(saltRounds,function(saltError,salt){
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
    // console.log(password)
})

const { MongoClient, ServerApiVersion, Admin} = require('mongodb');
const uri = "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.jx2e8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect(err => {
    if (err) {
        console.log(err.message)
        return
    }

    console.log('Connected to MongoDB');

    client.db('Accounts').collection('userFake').insertOne({
        name: 'fake_account',
        // name_zh_CN: userNew.zh_CN_fullName,
        // avartar_URL: userNew.avatar_URL,
        // address: userNew.address,
        password: password
    }).then(result=>{
        console.log(result)
    })
});