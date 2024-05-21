import { MongoClient, ServerApiVersion } from "mongodb"

if (!process.env.MONGODB_URL) throw new Error("Invalid/Missing environment variable: 'MONGODB_URL'");
if (!process.env.MONGODB_DB) throw new Error("Invalid/Missing environment variable: 'MONGODB_DB'");

const URI = process.env.MONGODB_URL!;
const options = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
};

let client;
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    let globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise?: Promise<MongoClient>;
    };
  
    if (!globalWithMongo._mongoClientPromise) {
      client = new MongoClient(URI, options);
      globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
  } else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(URI, {...options, monitorCommands: true});
    clientPromise = client.connect();
  }
  
  // Export a module-scoped MongoClient promise. By doing this in a
  // separate module, the client can be shared across functions.
  export default clientPromise;