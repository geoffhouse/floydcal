import type { Metadata } from "next";
import ThemeRegistry from "./ThemeRegistry";
import Header from "./Header";
import { Box, Container, Stack } from "@mui/material";

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
                </ThemeRegistry>
            </body>
        </html>
    );
}
