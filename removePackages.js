/* eslint-disable */
var mongoClient = require('mongodb').MongoClient;

if (process.env.HEROKU_APP_NAME) {
  const url = process.env.MONGODB_URI || "";

  /**
   * connect to the db
   * clear the packages collection in the db
   */
  mongoClient.connect(url, (err, db) => {
    console.log("Mongo client connected!");
    if (err) throw err;
    const packages = db.collection("Packages");
    packages.remove((error, result) => {
      if (error) throw error;
      console.log("Packages Collection wiped!");
      db.close();
    });
  });
}

