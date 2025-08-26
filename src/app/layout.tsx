import type { Metadata } from "next";
import ThemeRegistry from "./ThemeRegistry";
import Header from "./Header";
import { Box, Container, Stack } from "@mui/material";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
    title: "floydcal",
    description: "floydcal - your personal calendar",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
            </head>
            <body
                style={{
                    backgroundColor: "#eeeeee",
                }}
            >
                <ThemeRegistry>
                    <Header />
                    <Container maxWidth="md" fixed sx={{ padding: "2rem" }}>
                        <Stack>
                            <Box sx={{ textAlign: "center" }}>
                                <div>{children}</div>
                            </Box>
                        </Stack>
                    </Container>
                    <Analytics />
                </ThemeRegistry>
            </body>
        </html>
    );
}
