"use client";
import * as React from "react";
import { Grid, Stack, Typography } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import { BookItem, SearchParams } from "../models";
import InfoIcon from "@mui/icons-material/Info";
import StarBorderIcon from "@mui/icons-material/StarBorder";

interface TrendingDestinationsProps {
  bookItems: BookItem[];
  onSearch: (bookItem: SearchParams) => void;
}

const TrendingItem = ({
  bookItem,
  onClick,
}: {
  bookItem: BookItem;
  onClick: (bookItem: SearchParams) => void;
}) => {
  return (
    <ImageListItem>
      <img src={bookItem.image} alt={bookItem.title} loading="lazy" />
      <ImageListItemBar
        title={bookItem.title}
        subtitle={bookItem.destination}
        actionIcon={
          <IconButton
            sx={{ color: "rgba(255, 255, 255, 0.54)" }}
            aria-label={`info about ${bookItem.title}`}
            onClick={() => onClick(bookItem)}
          >
            <InfoIcon />
          </IconButton>
        }
      />
    </ImageListItem>
  );
};

export default function TrendingDestinations({
  bookItems,
  onSearch,
}: TrendingDestinationsProps) {
  const [bookItem1, bookItem2, bookItem3, bookItem4] = bookItems;
  return (
    <Stack maxWidth={900}>
      <Typography variant="h5" gutterBottom component="div">
        Trending Destinations
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TrendingItem bookItem={bookItem2} onClick={onSearch} />
        </Grid>
        <Grid item xs={6}>
          <TrendingItem bookItem={bookItem3} onClick={onSearch} />
        </Grid>
        <Grid item xs={12}>
          <TrendingItem bookItem={bookItem1} onClick={onSearch} />
          </Grid>
      </Grid>
    </Stack>
  );
}
