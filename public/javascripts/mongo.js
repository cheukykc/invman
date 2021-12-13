let MongoClient = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectId;
const url = require("./mongourl")
let MongoURI = process.env.MONGO_URI;


let Mongo = function () {
    this.client = MongoClient;
    this.uri = url;
/*
    // get database name from uri parser
    this.database = () => {
        const uriObject = mongodbUri.parse(this.uri);
        return uriObject['database'];
    };

*/
    // base connection object
    this.connection = async url => {
        let connection = await this.client.connect(this.uri)
        return connection.db('inventory_management')
    }
    // find connection by id
    this.find = async (collection, o_id) => {
        let dbo = await this.connection();
        return dbo.collection(collection).find({'_id': ObjectId(o_id)});
    }
    // search
    this.search = async (collection, params) => {
        let dbo = await this.connection();
        return await dbo.collection(collection).find(params).toArray();
    }
    // find all
    this.findAll = async (collection) => {
        let dbo = await this.connection();
        return await dbo.collection(collection).find({}).toArray();
    }
    // Put
    this.update = async (collection, query, data) => {
        let dbo = await this.connection();
        return await dbo.collection(collection).updateOne(query, data);
    }
    // Save
    this.insert = async (collection, data) => {
        let dbo = await this.connection();
        return await dbo.collection(collection).insertOne(data);
    }

    // Delete
    this.delete = async (collection, query) => {
        let dbo = await this.connection();
        return await dbo.collection(collection).deleteOne(query);
    }
}

module.exports = new Mongo()
