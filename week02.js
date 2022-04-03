const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.jx2e8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect(err => {
    if (err) {
        console.log(err.message)    //terminal will return an error message when the username or password is incorrect
        return
    }
    console.log('Connected to MongoDB');

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
