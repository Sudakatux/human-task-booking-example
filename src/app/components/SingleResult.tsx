import * as React from "react";
import { Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { BookItem } from "../models";


export interface SingleResultProps extends BookItem {
  onBook: (id: string) => void;
}

export default function SingleResult(props: SingleResultProps) {
  return (
    <Card sx={{ width: 945, display: "flex" }}>
      <CardMedia
        component={"img"}
        sx={{ maxWidth: 140 }}
        image={props.image}
        title="green iguana"
      />
      <Stack direction={"column"} spacing={1}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.destination}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => props.onBook(props.id)}>
            Book
          </Button>
        </CardActions>
      </Stack>
    </Card>
  );
}
