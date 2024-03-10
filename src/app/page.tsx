import { Grid, Stack, Box } from "@mui/material";
import SearchBar from "./components/SearchBar";
import {
  orkesConductorClient,
  WorkflowExecutor,
} from "@io-orkes/conductor-javascript";
import getConfig from "next/config";
import { BookItem, SearchParams } from "./models";
import { redirect } from "next/navigation";

import { faker } from "@faker-js/faker";
import TrendingDestinations from "@/app/components/TrendingDestinations";

const genBookItem = (): BookItem => ({
  id: faker.string.uuid(),
  image: faker.image.urlLoremFlickr({ category: "travel" }),
  title: faker.lorem.words(),
  description: faker.lorem.sentence(),
  destination: faker.helpers.arrayElement([
    "Argentina",
    "Brazil",
    "Chile",
    "Colombia",
    "Ecuador",
    "Guyana",
    "Paraguay",
    "Peru",
    "Suriname",
    "Uruguay",
    "Venezuela",
  ]),
  available: {
    from: faker.date.recent().toISOString(),
    to: faker.date.future().toISOString(),
  },
});

const trendingLocations = Array(5)
  .fill(0)
  .map(() => genBookItem());

const doSearch = async ({ destination, available }: SearchParams) => {
  "use server";
  const { publicRuntimeConfig } = getConfig();
  const clientPromise = orkesConductorClient(publicRuntimeConfig.conductor);
  const client = await clientPromise;

  const executionId = await new WorkflowExecutor(client).startWorkflow({
    name: "BookingSearch",
    version: 1,
    input: {
      destination,
      available,
    },
    correlationId: "checkoutSearch",
  });

  redirect(`/search/${executionId}`);
};

export default function Home() {
  const handleSearch = doSearch;

  const handleBooking = async (book: BookItem) => {
    "use server";
    const { publicRuntimeConfig } = getConfig();
    const client = await orkesConductorClient(publicRuntimeConfig.conductor);
    const executionId = await new WorkflowExecutor(client).startWorkflow({
      name: publicRuntimeConfig.workflows.requestForLoan,
      version: 1,
      input: {
        userId: "James",
        bookItem: book,
      },
      correlationId: "checkoutId",
    });

    redirect(`/checkout/${executionId}`);
  };
  return (
    <Grid
      container
      spacing={4}
      justifyContent={"center"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      <Grid item xs={12}>
        <SearchBar onSearch={handleSearch} />
      </Grid>
      <Grid item xs={12}>
        <TrendingDestinations
          bookItems={trendingLocations}
          onSearch={handleSearch}
        />
      </Grid>
    </Grid>
  );
}
