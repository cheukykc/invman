const {MongoClient} = require('mongodb');
const url = require("./mongourl")

const dbName = 'inventory_management'
const collection = 'inventory'
let info = ""

async function main() {
    const client = new MongoClient(url)
    try {
        await client.connect()
        //await listDatabases(client)
        await queryDatabase(client)
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

async function queryDatabase(client, query) {
    const db = client.db(dbName).collection(collection)
    const info = await db.findOne(query).toArray().then(query => query)
    //console.log(query)
}
main().catch(console.error)
module.exports = info
