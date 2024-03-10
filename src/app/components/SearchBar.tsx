"use client";
import { useState } from "react";
import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { SearchParams } from "@/app/models";
import moment from "moment";

const SearchBar = ({
  onSearch,
  initialSearchParams = { destination: "", available: { from: "", to: "" } },
}: {
  onSearch: (searchParams: SearchParams) => void;
  initialSearchParams?: SearchParams;
}) => {
  const [destination, setDestination] = useState(
    initialSearchParams.destination
  );
  const [available, setAvailable] = useState<{ from: string; to: string }>(
    initialSearchParams.available
  );
  return (
    <Paper sx={{ padding: 8 }}>
      <Typography variant="h5">Search for a Hotel</Typography>
      <Stack direction={"row"} spacing={1} pt={1}>
        <Stack direction={"row"}>
          <TextField label="Origin" />
          <TextField
            label="Destination"
            onChange={(ev) => setDestination(ev.target.value)}
            value={destination}
          />
        </Stack>
        <Stack direction={"row"}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              onChange={(val) =>
                setAvailable((s) => ({ ...s, from: val?.toString() as string }))
              }
              value={moment(available.from)}
            />
            <DatePicker
              onChange={(val) =>
                setAvailable((s) => ({ ...s, to: val?.toString() as string }))
              }
              value={moment(available.to)}
            />
          </LocalizationProvider>
        </Stack>
        <Button
          variant="contained"
          onClick={() => onSearch({ destination, available })}
        >
          Search
        </Button>
      </Stack>
    </Paper>
  );
};

export default SearchBar;
