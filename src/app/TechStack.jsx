import React from "react";
import Image from "next/image";
import { Box, Link } from "@mui/material";

const TechStack = () => {
    const technologies = [
        {
            name: "React",
            logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
            link: "https://react.dev/",
        },
        {
            name: "Next.js",
            logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original-wordmark.svg",
            link: "https://nextjs.org/",
        },
        {
            name: "MUI",
            logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg",
            link: "https://mui.com/",
        },
        { name: "Vercel", logo: "https://www.svgrepo.com/show/354512/vercel.svg", link: "https://vercel.com/" },
    ];

    return (
        <Box sx={{ display: "flex", gap: 2 }}>
            {technologies.map((tech) => (
                <Link href={tech.link} target="_blank" rel="noopener noreferrer" key={tech.name}>
                    <Image src={tech.logo} alt={tech.name} width={24} height={24} />
                </Link>
            ))}
        </Box>
    );
};

export default TechStack;
