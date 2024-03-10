import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Paper, Stack } from "@mui/material";

import { faker } from "@faker-js/faker";

const fakeFilters = Array(8).fill(0).map(faker.lorem.word);

const Filters = () => {
  return (
    <Stack>
      <Paper sx={{ minWidth: 300, padding: 2 }}>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Label"
          />
          {fakeFilters.map((filter) => (
            <FormControlLabel
              control={<Checkbox />}
              label={filter}
              key={filter}
            />
          ))}
        </FormGroup>
      </Paper>
    </Stack>
  );
};

export default Filters;
