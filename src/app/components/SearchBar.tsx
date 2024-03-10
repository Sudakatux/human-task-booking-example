"use client";
import { Button, Paper, Stack, TextField,Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

const SearchBar = ({ onSearch }: { onSearch: () => void }) => {
  return (
    <Paper sx={{padding:8}}>
      
      <Typography variant="h5">Search for a Hotel</Typography>
      <Stack direction={"row"} spacing={1} pt={1}>
        <Stack direction={"row"}>
          <TextField label="Origin" />
          <TextField label="Destination" />
        </Stack>
        <Stack direction={"row"}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker />
            <DatePicker />
          </LocalizationProvider>
        </Stack>
        <Button variant="contained" onClick={onSearch}>
          Search
        </Button>
      </Stack>
    </Paper>
  );
};

export default SearchBar;
