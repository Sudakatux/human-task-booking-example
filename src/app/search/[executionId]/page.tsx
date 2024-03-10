import { Grid, Stack } from "@mui/material";
import SearchBar from "@/app/components/SearchBar";
import SearchResults from "@/app/components/SearchResults";
import Filters from "@/app/components/Filters";
import {
  orkesConductorClient,
  Workflow,
  WorkflowExecutor,
} from "@io-orkes/conductor-javascript";
import getConfig from "next/config";
import { BookItem, SearchParams } from "@/app/models";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
type SearchResultsProps = {
  params: {
    executionId: string;
  };
};

const getCurrentSearchResults = async (
  executionId: string
): Promise<{ results: BookItem[]; searchParam: SearchParams }> => {
  "use server";
  try {
    const { publicRuntimeConfig } = getConfig();
    const clientPromise = orkesConductorClient(publicRuntimeConfig.conductor);
    const client = await clientPromise;
    const workflowStatus = await client.workflowResource.getExecutionStatus(
      executionId
    );
    const results = Object.entries(workflowStatus?.variables || {}).reduce(
      (acc, [_key, val]) => {
        if (Array.isArray(val)) {
          return acc.concat(val);
        }
        return acc;
      },
      [] as BookItem[]
    );

    return {
      results,
      searchParam: workflowStatus?.input as SearchParams,
    };
  } catch (e) {
    console.log(e);
    throw e;
  }
};

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

  revalidatePath(`/search/${executionId}`); //Not redirect here
};

export default async function SearchPage(
  searchResultsProps: SearchResultsProps
) {
  const { results, searchParam } = await getCurrentSearchResults(
    searchResultsProps.params.executionId
  );
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
        <SearchBar onSearch={doSearch} initialSearchParams={searchParam} />
      </Grid>
      <Grid item xs={12}>
        <SearchResults onBook={handleBooking} bookItems={results} />
      </Grid>
    </Grid>
  );
}
