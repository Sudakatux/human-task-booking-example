import {
  ConductorWorker,
  TaskManager,
  orkesConductorClient,
} from "@io-orkes/conductor-javascript";

import { faker } from "@faker-js/faker";

interface SearchParams {
  destination: string;
  available: {
    from: string;
    to: string;
  };
}

interface BookItem extends SearchParams {
  id: string;
  image: string;
  title: string;
  description: string;
}

const genBookItem = ({ destination, available }: SearchParams): BookItem => ({
  id: faker.string.uuid(),
  image: faker.image.url(),
  title: faker.lorem.words(),
  description: faker.lorem.sentence(),
  destination,
  available,
});

export const fakerResults = (): ConductorWorker => {
  return {
    taskDefName: "fakeResults",
    execute: async ({ inputData }) => {
      return {
        outputData: {
          results: Array(10)
            .fill(0)
            .map(() => genBookItem(inputData as SearchParams)),
        },
        status: "COMPLETED",
      };
    },
  };
};

export async function createTaskManager() {
  const clientPromise = orkesConductorClient({
    serverUrl: process.env.SERVER_URL,
    keyId: process.env.KEY,
    keySecret: process.env.SECRET,
  });
  const client = await clientPromise;
  return new TaskManager(client, [fakerResults()], {
    logger: console,
    options: { concurrency: 5, pollInterval: 100 },
  });
}

(async () => {
  const taskManager = await createTaskManager();
  taskManager.startPolling();
})();
