const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

const app = express();
const port = process.env.PORT || 5000;


// middle ware
app.use(cors());
app.use(express.json()); 

// pass:FMvnabONKpTNnNpk
// username: databaseUser

const uri = "mongodb+srv://databaseUser:FMvnabONKpTNnNpk@cluster0.uvblm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
 async function run(){
    try{
        await client.connect();
         const userCollection = client.db("foodExpress").collection("users");
        //  const user = {name: 'Mohona Nodi', email: 'mohona@gmail.com'};
        //  const result = await userCollection.insertOne(user);
        //  console.log(`user inserted id: ${result.insertedId}`);

        // show data in ui
        app.get('/user', async(req, res)=>{
            const query = {};
             const cursor = userCollection.find(query);
             const users = await cursor.toArray();
             res.send(users);
        })

        //POST User: adding a new user
        app.post('/user', async (req, res) =>{
            const newUser = req.body;
            console.log("add new user",newUser);
            const result = await userCollection.insertOne(newUser);
            res.send(result)
        })

        // DELETE user

        app.delete('/user/:id', async(req, res) =>{
            const id = req.params.id;
            const query ={_id: ObjectId(id)}
            const result = await userCollection.deleteOne(query);
            res.send(result);
        })
    }
    finally{
        // await client.close();
    }
 }
run().catch(console.dir);

app.get('/', (req, res) =>{
    res.send('Node Mongo Crud server running')
})


app.listen(port, () =>{
    console.log('Listening to the port', port);
})




