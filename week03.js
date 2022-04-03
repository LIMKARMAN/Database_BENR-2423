const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.jx2e8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect(async err => {
    if (err) {
        console.log(err.message)
        return
    }
    console.log('Connected to MongoDB');

    client.db('myFirstDatabase').collection('customers').deleteMany({
        name: 'Ali',
        age:30
    }).then(result=>{
        console.log(result.deletedCount);
    })

    // await client.db('myFirstDatabase').collection('customers').updateOne({
    //    name: 'John'
    // },{
    //   $set:{
    //       name:"John Doe",
    //       age: 35
    //     }
    // },{upsert:true}). then(res=>{
    //     console.log(res)
    // })
    
    // client.db('myFirstDatabase').collection('customers').insertOne({       
    //     name:'John',                                                        
    //     age:30,
    //     location:'New York',
    //     isActive: true,
    //     tags:['tags1','tags2'],
    // }).then(result => {                                                     
    //     console.log(result);
    // });

//         client.db('myFirstDatabase').collection('customers').insertOne({       
//            name:'John Friend',                                                        
//            friend: result.insertedId,
//            age: 30,
//            location:'New York',
//            isActive: true,
//            tags:['tags1','tags2'],
//         }).then(result => {                                                     
//            console.log(result);
//         });
//     });
// });

//     console.time('insert');
//     let result = await client.db('myFirstDatabase').collection('customers').insertMany([    
//     {
//         name:'Ali',                                                        
//         age:30,
//         location:'New York',
//         isActive: true,
//         tags:['tag1','tag2'],
//     },
//     {
//         name: 'Jon',
//         age:40,
//         location:'Melaka',
//         isActive: true,
//         tags: ['tag1','tag2'],
//     }
//   ])
//      console.timeEnd('insert')

    // let result2 = await client.db('myFirstDatabase').collection('customers').insertOne({       
    //     name:'Ali Friend',     
    //     friend: result1.insertedId                                                   
    //     age:30,
    //     location:'New York',
    //     isActive: true,
    //     tags:['tags1','tags2'],
    // })
    


    //  console.log('Inserted 1 document',result);

    //client.db().admin().listDatabases().then(result => {
    //    console.log(result['databases'][6]['name']);
    //})

    //client.db('sample_training').listCollections().toArray().then(result => {
    //   console.log(result[4]);
    // })

    //client.db('sample_training').collection('inspections').find({name:'Cyworld'}).toArray().then(result => {
    //  console.log(result);
    //})

});
