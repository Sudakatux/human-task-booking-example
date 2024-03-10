"use client";
import { useReducer } from "react";
import { Button, Grid, TextField, Paper } from "@mui/material";
import type { Organization } from "@/app/models/organization";

const initialState = {
  name: "",
};

type FormAction =
  | { type: "UPDATE_FIELD"; field: keyof Organization; value: string }
  | { type: "RESET_FORM" };

const formReducer = (state: Organization, action: FormAction) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
};

interface OrganizationFormProps {
  onSubmit: (organization: Organization) => void;
  organization: Organization;
  submitText?: string;
}

export const OrganizationForm = ({
  organization,
  onSubmit,
  submitText = "Create",
}: OrganizationFormProps) => {
  const [formState, dispatch] = useReducer(formReducer, organization);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "UPDATE_FIELD",
      field: e.target.name as keyof Organization,
      value: e.target.value,
    });
  };

  const handleCreateOrganization = () => {
    onSubmit(formState);
  };

  const handleReset = () => {
    dispatch({ type: "RESET_FORM" });
  };

  return (
    <Paper
      variant="outlined"
      sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            onChange={handleChange}
            value={formState.name}
          />
        </Grid>

        <Grid item xs={2}>
          <Button onClick={handleCreateOrganization} variant="outlined">
            {submitText}
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button onClick={handleReset} variant="outlined">
            Reset
          </Button>
        </Grid>
        <Grid item xs={8}></Grid>
      </Grid>
    </Paper>
  );
};
