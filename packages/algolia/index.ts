// Install the API client: https://www.algolia.com/doc/api-client/getting-started/install/javascript/?client=javascript

import algoliasearch from "algoliasearch";
import dotenv from "dotenv";
import { routes } from "../documentation/route-configs";

async function run() {
  dotenv.config();

  // Get your Algolia Application ID and (admin) API key from the dashboard: https://www.algolia.com/account/api-keys
  // and choose a name for your index. Add these environment variables to a `.env` file:
  const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID as string;
  const ALGOLIA_API_KEY = process.env.ALGOLIA_API_KEY as string;
  const ALGOLIA_INDEX_NAME = process.env.ALGOLIA_INDEX_NAME as string;

  try {
    // Start the API client
    const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);

    // Create an index (or connect to it, if an index with the name `ALGOLIA_INDEX_NAME` already exists)
    const index = await client.initIndex(ALGOLIA_INDEX_NAME);

    await index.clearObjects();


    // Add new objects to the index
    // https://www.algolia.com/doc/api-reference/api-methods/add-objects/
    const data = routes.map(({ key, path }) => ({
      key,
      path,
    }));

    const result = await index.saveObjects(data, {
      autoGenerateObjectIDIfNotExist: true,
    });

    // Wait for the indexing task to complete
    // https://www.algolia.com/doc/api-reference/api-methods/wait-task/
  } catch (error) {
    console.warn(error);
  }
}

run();
