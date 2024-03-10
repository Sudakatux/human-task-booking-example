import { CheckoutForm } from "@/app/checkout/components/CheckoutForm";
import { revalidatePath } from "next/cache";
import getConfig from "next/config";
import {
  orkesConductorClient,
  HumanExecutor,
  HumanTaskEntry,
  WorkflowExecutor,
} from "@io-orkes/conductor-javascript";
import { findTaskAndClaim } from "./helpers";
import { HumanTaskTemplate, Workflow } from "@io-orkes/conductor-javascript";
import { Paper, Grid, Typography, Box } from "@mui/material";

type CheckoutPageProps = {
  params: {
    executionId: string;
  };
};

interface GetCurrentCheckoutProps {
  template?: HumanTaskTemplate;
  workflowStatus: Workflow;
  task?: HumanTaskEntry;
}
const getCurrentCheckout = async (
  executionId: string
): Promise<GetCurrentCheckoutProps> => {
  "use server";
  try {
    const { publicRuntimeConfig } = getConfig();
    const clientPromise = orkesConductorClient(publicRuntimeConfig.conductor);
    const client = await clientPromise;
    const workflowStatus = await client.workflowResource.getExecutionStatus(
      executionId
    );
    const humanExecutor = new HumanExecutor(client);
    const task = await findTaskAndClaim(
      humanExecutor,
      workflowStatus?.input?.userId,
      executionId
    );
    if (task != null) {
      const template = await client.humanTask.getTemplateByNameAndVersion(
        task?.humanTaskDef?.userFormTemplate?.name!,
        task?.humanTaskDef?.userFormTemplate?.version!
      );
      return {
        workflowStatus,
        task,
        template,
      };
    }
    return {
      workflowStatus,
      task: undefined,
      template: undefined,
      // conductor: {
      //   serverUrl: publicRuntimeConfig.conductor.serverUrl,
      //   TOKEN: client.token,
      // },
    };
  } catch (e) {
    console.log(e);
    throw e;
  }
};
const completeStep = async (
  executionId: string,
  formState: Record<string, Record<string, any>>,
  task?: HumanTaskEntry
) => {
  if (task?.taskId != undefined) {
    const { publicRuntimeConfig } = getConfig();
    const clientPromise = orkesConductorClient(publicRuntimeConfig.conductor);
    const client = await clientPromise;
    try {
      const executor = new HumanExecutor(client);
      await executor.completeTask(task?.taskId, formState);

      revalidatePath(`/checkout/${executionId}`);
    } catch (e) {
      console.log("Cant complete because of error ", e);
    }
  }
};

const goBack = async (executionId: string, task?: HumanTaskEntry) => {
  if (task?.workflowId != undefined) {
    const { workflowId } = task;
    const { publicRuntimeConfig } = getConfig();
    const clientPromise = orkesConductorClient(publicRuntimeConfig.conductor);
    const client = await clientPromise;
    try {
      const wfExecutor = new WorkflowExecutor(client);
      await wfExecutor.goBackToFirstTaskMatchingType(workflowId, "HUMAN");
    } catch (e) {
      console.log(e);
    }

    revalidatePath(`/checkout/${executionId}`);
  }
};

const CheckoutPage = async ({ params }: CheckoutPageProps) => {
  const executionData = await getCurrentCheckout(params.executionId);
  const handleOnNext = async (
    formState: Record<string, Record<string, any>>
  ) => {
    "use server";
    await completeStep(params.executionId, formState, executionData.task);
  };

  const handleGoBack = async () => {
    "use server";
    await goBack(params.executionId, executionData?.task);
  };
  console.log("executionData.workflowStatus", executionData.workflowStatus);
  return executionData.workflowStatus.status != "COMPLETED" &&
    executionData?.template != null ? (
    <Grid
      container
      justifyContent="space-around"
      spacing={2}
      sx={{ height: "100%" }}
      pl={28}
      pr={28}
    >
      <Grid item xs={4}>
        <Paper variant="outlined">
          <Grid container justifyContent="center" p={2}>
            <Grid item xs={12}>
              <Typography variant="caption">Hotel name</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={8}>
        <CheckoutForm
          template={executionData.template}
          onNext={handleOnNext}
          onBack={handleGoBack}
        />
      </Grid>
    </Grid>
  ) : (
    <Box
      alignItems={"center"}
      display={"flex"}
      width="100%"
      justifyContent={"center"}
    >
      <Paper>
        <Grid container justifyContent={"center"} direction={"row"} p={4}>
          <Grid item xs={12}>
            <Typography variant="h4">Checkout Completed</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">{`Thank you ${executionData.workflowStatus.output?.personalInfo?.firstName} for your purchase`}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Paper variant="outlined">
              <Grid container justifyContent="flex-start" p={2}>
                <Grid item xs={4}>
                  <Typography variant="caption">Check In</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="caption">SomeDate</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="caption">Check Out</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="caption">SomeDate</Typography>
                </Grid>

                <Grid item xs={4}>
                  <Typography variant="caption">Location</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="caption">SomeLocation</Typography>
                </Grid>
                
                <Grid item xs={4}>
                  <Typography variant="caption">Contact</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="caption">email</Typography>
                </Grid>
                
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">{`You will be sent a confirmation email to ${executionData.workflowStatus.output?.personalInfo?.email} upon approval`}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default CheckoutPage;
