"use client";

import { Typography, Paper, Stack } from "@mui/material";
import TechStack from "../TechStack";
import Image from "next/image";
import Obfuscate from "react-obfuscate";

const page = () => {
    return (
        <Stack spacing={2}>
            <Paper sx={{ padding: "1rem" }}>
                <Typography variant="h5">About floydcal</Typography>
                <Stack sx={{ textAlign: "left" }}>
                    <p>
                        I created Floydcal for my own use, as I was tired of manually adding each lesson to my
                        family&rsquo;s Google Calendar every term. If you find it useful, that&rsquo;s great!
                    </p>
                    <p>
                        This application was built using React.js and Next.js, and is deployed on Vercel. All the source
                        code is available on <a href="https://github.com/geoffhouse/floydcal">GitHub</a>.
                    </p>
                    <TechStack />
                </Stack>
            </Paper>

            <Paper sx={{ padding: "1rem" }}>
                <Typography variant="h5">About Me</Typography>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Image src="/geoff.png" alt="Geoff House" width={200} height={200} />
                    <Stack sx={{ textAlign: "left" }}>
                        <p>
                            Hi, I&rsquo;m Geoff House! My son is a student at Sir Henry Floyd Grammar School, and I
                            spent a few days working on this project.
                        </p>
                        <p>
                            You can contact me by email&nbsp;
                            <Obfuscate
                                email="geoff@housesathome.co.uk"
                                headers={{
                                    subject: "floydcal",
                                }}
                            />
                            &nbsp; or via <a href="https://www.facebook.com/geoffhouse">Facebook</a>
                        </p>
                        <p>
                            If you&rsquo;d like to support my work, you can buy me a coffee. It might just convince my
                            wife to let me do this sort of thing again in the future!
                        </p>
                        <a href="https://www.buymeacoffee.com/geoffhouse" target="_blank" rel="noopener noreferrer">
                            <Image
                                src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                                alt="Buy Me a Coffee"
                                style={{ height: "60px !important", width: "217px !important" }}
                            />
                        </a>
                    </Stack>
                </Stack>
            </Paper>

            <Paper sx={{ padding: "1rem" }}>
                <Typography variant="h5">Privacy</Typography>
                <Stack sx={{ textAlign: "left" }}>
                    <p>I have absolutely no interest in (and no access to) your data.</p>
                    <p>
                        Feel free to review the code on GitHub to verify that I&rsquo;m not doing anything crazy! (
                        <a href="https://github.com/geoffhouse/floydcal">https://github.com/geoffhouse/floydcal</a>)
                    </p>
                    <p>
                        I've enabled analytics in Vercel - just so I can see if this page is being used. I'm not going
                        to do anything else with this information.
                    </p>
                    <p>
                        All data is stored exclusively in your browser; nothing is ever uploaded to the server. When you
                        close the webpage, your data is gone.
                    </p>
                </Stack>
            </Paper>

            <Paper sx={{ padding: "1rem" }}>
                <Typography variant="h5">Disclaimer</Typography>
                <Stack sx={{ textAlign: "left" }}>
                    <p>This site is not affiliated with or endorsed by Sir Henry Floyd Grammar School.</p>
                    <p>
                        I have done my best to ensure the timetable is accurate, but I am not perfect. Please
                        double-check the results before relying on them.
                    </p>
                    <p>
                        I cannot be responsible for your child taking the wrong books to school or their PE kit on the
                        wrong day!
                    </p>
                    <p>With that said, if you do find any issues, please let me know.</p>
                </Stack>
            </Paper>
        </Stack>
    );
};

export default page;
