const {MongoClient} = require('mongodb');
const url = require("./mongourl")

const dbName = 'inventory_management'
const collection = 'inventory'

async function main(query) {
    const client = new MongoClient(url)
    try {
        await client.connect()
        //await listDatabases(client)
        await deleteDatabase(client, query)
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

async function deleteDatabase(client, query) {
    const db = client.db(dbName).collection(collection)
    await db.findOneAndDelete(query).catch()
    //console.log(query)
}

module.exports = main().catch()
