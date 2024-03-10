"use client";
import { useState } from "react";
import { Button, Stack, Paper, Typography, Box } from "@mui/material";
import { FormDisplay } from "@/app/components/FormDisplay";
import { HumanTaskTemplate } from "@io-orkes/conductor-javascript";

interface CheckoutFormProps {
  onNext: (state: Record<string, Record<string, any>>) => void;
  onBack: () => void;
  template: HumanTaskTemplate;
}

export const CheckoutForm = ({
  onNext,
  onBack,
  template,
}: CheckoutFormProps) => {
  const [formState, setFormState] = useState<
    Record<string, Record<string, any>>
  >({});

  return (
    <Stack spacing={4}>
      <Paper
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        variant="outlined"
      >
        <FormDisplay
          displayErrors
          onFormChange={setFormState}
          formState={formState}
          template={template}
        />
      </Paper>
      <Stack direction="row" spacing={2} justifyContent={"flex-end"}>
        <Button variant="outlined" onClick={() => onBack()}>
          Back
        </Button>
        <Button variant="contained" onClick={() => onNext(formState)}>
          Next
        </Button>
      </Stack>
    </Stack>
  );
};
