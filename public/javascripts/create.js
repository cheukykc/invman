const {MongoClient} = require('mongodb');
const url = require("./mongourl")

const dbName = 'inventory_management'
const collection = 'inventory'

async function main(json) {
    const client = new MongoClient(url)
    try {
        await client.connect()
        //await listDatabases(client)
        await insertDatabase(client, json)
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

async function insertDatabase(client, json) {
    const db = client.db(dbName).collection(collection)
    await db.insertOne(json).catch()
    //console.log(query)
}

module.exports = main().catch()
