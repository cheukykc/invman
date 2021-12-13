const {MongoClient} = require('mongodb');
const url = require("./mongourl")

const dbName = 'inventory_management'
const collection = 'inventory'
/*
let mongoPromise = () => {
    new Promise((resolve, reject) => {

    }).then(function(result){

    })
}
*/

let main = async function (){
    let client = new MongoClient(url)
    try {
        await client.connect()
        //await listDatabases(client)
        await queryDatabase(client).then(result => result).catch(console.error)
    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }
}

/*
async function listDatabases(client){
    let databasesList = await client.db().admin().listDatabases()
    console.log("Databases:")
    databasesList.databases.forEach(db => console.log(` - ${db.name}`))
}
*/

async function queryDatabase(client) {
    const db = client.db(dbName).collection(collection)
    await db.find().toArray().then(json => json)
    //console.log(query)
}



module.exports.main = main
