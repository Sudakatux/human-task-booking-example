import { Grid, Stack } from "@mui/material";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import Filters from "./components/Filters";
import {
  orkesConductorClient,
  WorkflowExecutor,
} from "@io-orkes/conductor-javascript";
import getConfig from "next/config";
import { BookItem } from "./models";
import { redirect } from "next/navigation";

export default function Home() {
  const handleSearch = async () => {
    "use server";
  };
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
        <Stack spacing={8} direction={"row"} justifyContent={"space-between"}>
          <Filters />
          <SearchResults onBook={handleBooking} />
        </Stack>
      </Grid>
    </Grid>
  );
}
