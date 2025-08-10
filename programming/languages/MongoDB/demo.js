const { MongoClient } = require("mongodb");

/*
+ Outputs list of existing databases in cluster
1. Get list of databases from the cluster
2. Output out list of databases from the cluster
*/
async function listDatabases(client) {
	const dbList = await client.db().admin().listDatabases();

	console.log("Databases: ");
	dbList.databases.forEach((db) => {
		console.log(`- ${db.name}`);
	});
}

/*
+ Inserts new podcast into the database. Remember podcasts have title, array of platforms, and number of downloads.

NOTE: See how in our main example project, we didn't return client, rather we returned client.db 
  which allows us to not have to type 'client' everytime. We only need the 'db' object so it 
  does make sense why we do that in db.js

  2. Also note that the demo in this file, is simply just 
    us using async await rather than promise syntax when 
    comparing it to our db.js in our main example.

*/
async function createNewPodcast(client, newPodcast) {
	const result = await client
		.db("podcast_store")
		.collection("podcasts")
		.insertOne(newPodcast);

	console.log(`New Listing Created With ID: ${result.insertedId}`);
}

/*
+ Inserts multilple podcasts into the database
*/
async function createMultiplePodcasts(client, newPodcasts) {
	const result = await client
		.db("podcast_store")
		.collection("podcasts")
		.insertMany(newPodcasts);

	console.log(
		`${result.insertedCount} new listings created with the following id(s)`
	);
	console.log(result.insertedIds);
}

async function main() {
	// Create a MongoClient with our connection string to the cluster we want to connect to
	const client = new MongoClient(process.env.uri);

	try {
		// Attempt to connect to MongoDB cluster
		await client.connect();

		// await listDatabases(client);
		// await createNewPodcast(client, {
		// 	title: "BurgerCast",
		// 	platforms: ["Apple Podcasts", "Spotify"],
		// 	downloads: 25124,
		// });

		// await createMultiplePodcasts(client, [
		// 	{
		// 		title: "CoffeeCast",
		// 		platforms: ["Apple Podcasts", "Google Podcasts", "Spotify"],
		// 		downloads: 5798,
		// 	},
		// 	{
		// 		title: "BreakfastCaste",
		// 		platforms: ["Apple Podcasts", "Google Podcasts", "Spotify", "Youtube"],
		// 		downloads: 15986,
		// 	},
		// ]);
	} catch (e) {
		// Prepare to catch any errors
		console.error(e);
	} finally {
		// Close connection to cluster, regardless of whether we connected or failed
		await client.close();
	}
}
main();
