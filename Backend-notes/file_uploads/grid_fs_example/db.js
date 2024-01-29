const { MongoClient, GridFSBucket } = require("mongodb");

let myDb;
let myBucket;

async function connectToDB() {
	try {
		const client = await MongoClient.connect("mongodb://localhost:27017");
		myDb = client.db("gridfs_tutorial");
		myBucket = new GridFSBucket(myDb, { bucketName: "myCustomBucket" });
	} catch (e) {
		console.log(e);
	}
}

module.exports = {
	connectToDB,
	getDb: () => myDb,
	getBucket: () => myBucket,
};
