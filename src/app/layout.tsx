import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { Stack, Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

import "./globals.css";
export const metadata: Metadata = {
  title: "Staynest",
  description: "Fake Hotel Search Engine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Stack spacing={4} sx={{}}>
              <Box
                sx={{ backgroundColor: "#334E69" }}
                width={"100%"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Box>
                  <Link href="/">
                    <Image
                      src="/fakeLogo.webp"
                      width={100}
                      height={100}
                      alt="Staynest"
                    />
                  </Link>
                </Box>
              </Box>
              {children}
            </Stack>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
