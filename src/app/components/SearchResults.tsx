"use client";
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import SingleResult from "./SingleResult";
import { BookItem } from "../models";
import { faker } from "@faker-js/faker";

interface SearchResultsProps {
  onBook: (bookItem: BookItem) => void;
  bookItems: BookItem[];
}

const SearchResults = ({ onBook,bookItems=[] }: SearchResultsProps) => {
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {bookItems.map((bookItem) => (
        <ListItem key={bookItem.id}>
          <SingleResult
            {...bookItem}
            onBook={(id) => {
              onBook(bookItem);
            }}
          />
        </ListItem>
      ))}
    </List>
  );
};
export default SearchResults;
