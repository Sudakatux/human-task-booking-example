"use client";
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import SingleResult from "./SingleResult";
import { BookItem } from "../models";
import { faker } from "@faker-js/faker";

const genBookItem = (): BookItem => ({
  id: faker.string.uuid(),
  image: faker.image.url(),
  title: faker.lorem.words(),
  description: faker.lorem.sentence(),
});

const bookItems = Array(10).fill(0).map(genBookItem);

interface SearchResultsProps {
  onBook: (bookItem: BookItem) => void;
}

const SearchResults = ({ onBook }: SearchResultsProps) => {
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
