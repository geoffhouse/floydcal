"use client";

import { Button } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HeaderLink = ({ href, label }) => {
    const pathname = usePathname();

    const isSelected = pathname === href;
    return (
        <Button
            href={href}
            LinkComponent={Link}
            sx={{
                color: "#000000",
                height: "2rem",
                fontWeight: isSelected ? 900 : 500,
            }}
        >
            {label}
        </Button>
    );
};

export default HeaderLink;
