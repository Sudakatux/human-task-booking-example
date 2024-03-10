import { Breakpoint } from "@mui/material";
import { Container } from "@mui/material";
import React from "react";

export const Layout = ({
  children,
  title,
  maxWidth = "md",
}: {
  children: React.ReactNode;
  title: string;
  maxWidth?: Breakpoint;
}) => {
  return (
    <Container component="main" maxWidth={maxWidth} sx={{ mb: 4 }}>
      <h1>{title}</h1>

      {children}
    </Container>
  );
};
